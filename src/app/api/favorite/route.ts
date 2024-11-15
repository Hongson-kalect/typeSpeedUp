import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const urlObject = new URL(request.url);
  const targetId = urlObject.searchParams.get("targetId");
  const userId = urlObject.searchParams.get("userId");
  if (targetId && userId) {
    const favorite = await prisma.favorite.findFirst({
      where: {
        targetId,
        userId,
      },
    });

    const favoriteCount = await prisma.favorite.count({
      where: { targetId, isDeleted: false },
    });

    return NextResponse.json({ favorite, favoriteCount });
  }

  const items = await prisma.like.findMany({
    where: { isDeleted: false },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request

  const newItem = await prisma.favorite.create({
    data: requestBody,
  });
  return NextResponse.json(newItem);
}
