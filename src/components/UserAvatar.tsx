import Image from "next/image";

import avatarPlaceholderImage from "@/assets/avatar-placeholder.png";

import { cn } from "@/lib/utils";

interface UserAvatarProps {
  avatarUrl: string | null | undefined;
  size?: number;
  className?: string;
}

const UserAvatar = ({ avatarUrl, size, className }: UserAvatarProps) => {
  return (
    <Image
      src={avatarUrl || avatarPlaceholderImage}
      alt="user avatar"
      width={size ?? 48}
      height={size ?? 48}
      className={cn(
        "aspect-square h-fit flex-none rounded-full border border-gray-200 bg-secondary object-cover",
        className,
      )}
    />
  );
};
export default UserAvatar;
