import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const urlObject = new URL(request.url);
  const userId = urlObject.searchParams.get("userId");
  if (userId) {
    const favorite = await prisma.favorite.findMany({
      where: {
        userId: Number(userId),
        type: "novel",
      },
      select: {
        id: true,
        targetId: true,
      },
    });

    return NextResponse.json(favorite.map((item) => item.targetId));
  }

  const items = await prisma.like.findMany({
    where: { isDeleted: false },
  });
  return NextResponse.json(items);
}
