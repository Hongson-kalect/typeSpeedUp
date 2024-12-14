import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const urlObject = new URL(request.url);
  const targetId = urlObject.searchParams.get("targetId");
  const userId = urlObject.searchParams.get("userId");
  if (targetId && userId) {
    const like = await prisma.like.findFirst({
      where: {
        targetId: Number(targetId),
        userId: Number(userId),
      },
    });

    const likeCount = await prisma.like.count({
      where: { targetId: Number(targetId), isDeleted: false },
    });

    return NextResponse.json({ like, likeCount });
  }

  const items = await prisma.like.findMany({
    where: { isDeleted: false },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request

  const newItem = await prisma.like.create({
    data: requestBody,
  });
  return NextResponse.json(newItem);
}
