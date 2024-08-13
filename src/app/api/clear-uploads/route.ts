import { UTApi } from "uploadthing/server";

import prisma from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const authHeader = req.headers.get("Authorization");

    if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
      return Response.json(
        {
          message: "Invalid Autorization Header",
        },
        { status: 401 },
      );
    }

    const unUsedMedia = await prisma.media.findMany({
      where: {
        postId: null,
        ...(process.env.NODE_ENV === "production"
          ? {
              createdAt: {
                lte: new Date(Date.now() - 1000 * 60 * 60 * 24), // 24 hours in milliseconds
              },
            }
          : {}),
      },
      select: {
        id: true,
        url: true,
      },
    });

    // Retreive the key
    new UTApi().deleteFiles(
      unUsedMedia.map(
        (media) =>
          media.url.split(
            `/a/${process.env.NEXT_PUBLIC_UPLOADTHING_APP_ID}/`,
          )[1],
      ),
    );

    await prisma.media.deleteMany({
      where: {
        id: {
          in: unUsedMedia.map((media) => media.id),
        },
      },
    });

    return new Response();
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
