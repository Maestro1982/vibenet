import Link from "next/link";
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { unstable_cache } from "next/cache";

import { validationRequest } from "@/auth";
import prisma from "@/lib/prisma";
import { formatNumber } from "@/lib/utils";
import { getUserDataSelect } from "@/lib/types";

import UserAvatar from "@/components/UserAvatar";
import FollowButton from "@/components/FollowButton";

const TrendsSidebar = () => {
  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      {/* The right sidebar will only be shown when the two components are loaded (data is fetched) NOT 1 by 1 */}
      <Suspense fallback={<Loader2 className="mx-auto animate-spin" />}>
        <WhoToFollow />
        <TrendingTopics />
      </Suspense>
    </div>
  );
};

async function WhoToFollow() {
  const { user } = await validationRequest();

  if (!user) return null;

  const usersToFollow = await prisma.user.findMany({
    where: {
      NOT: {
        id: user.id,
      },
      followers: {
        none: {
          followerId: user.id,
        },
      },
    },
    select: getUserDataSelect(user.id),
    take: 5,
  });

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-lg font-bold">Who to follow</div>
      {usersToFollow.map((user) => (
        <div key={user.id} className="flex items-center justify-between gap-3">
          <Link
            href={`/users/${user.username}`}
            className="flex items-center gap-3"
          >
            <UserAvatar avatarUrl={user.avatarUrl} className="flex-none" />
            <div>
              <p className="line-clamp-1 break-all font-semibold hover:underline">
                {user.displayName}
              </p>
              <p className="line-clamp-1 break-all text-muted-foreground">
                @{user.username}
              </p>
            </div>
          </Link>
          <FollowButton
            userId={user.id}
            initialState={{
              followers: user._count.followers,
              isFollowedByUser: user.followers.some(
                ({ followerId }) => followerId === user.id,
              ),
            }}
          />
        </div>
      ))}
    </div>
  );
}

/* This unstable_cache api (on this moment it is a test feature) from nextjs allows us to cach an operation between multiple requests and between different users. This will only work in PRODUCTION and refreshes the data every 3hr. */
const getTrendingTopics = unstable_cache(
  async () => {
    // Count the hashtags with a raw SQL query because prisma has it limitations.
    const result = await prisma.$queryRaw<
      { hashtag: string; count: bigint }[]
    >`SELECT LOWER(unnest(regexp_matches(content, '#[[:alnum:]_]+', 'g'))) AS hashtag, COUNT(*) AS count FROM posts GROUP BY (hashtag) ORDER BY count DESC, hashtag ASC LIMIT 5`;

    return result.map((row) => ({
      hashtag: row.hashtag,
      count: Number(row.count),
    }));
  },
  ["trending-topics"], // Key
  {
    revalidate: 3 * 60 * 60, // 3hrs
  },
);

async function TrendingTopics() {
  const trendingTopics = await getTrendingTopics();

  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm">
      <div className="text-lg font-bold">Trending topics</div>
      {trendingTopics.map(({ hashtag, count }) => {
        const title = hashtag.split("#")[1];

        return (
          <Link key={title} href={`/hashtag/${title}`} className="block">
            <p
              className="line-clamp-1 break-all font-semibold hover:underline"
              title={hashtag}
            >
              {hashtag}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatNumber(count)} {count === 1 ? "post" : "posts"}
            </p>
          </Link>
        );
      })}
    </div>
  );
}

export default TrendsSidebar;
