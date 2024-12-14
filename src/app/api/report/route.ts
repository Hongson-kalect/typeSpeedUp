import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET(request: Request) {
  const urlObject = new URL(request.url);
  const targetId = urlObject.searchParams.get("targetId");
  const userId = urlObject.searchParams.get("userId");
  if (targetId && userId) {
    const report = await prisma.report.findFirst({
      where: {
        targetId: Number(targetId),
        userId: Number(userId),
      },
    });

    return NextResponse.json(report);
  }

  const items = await prisma.report.findMany({
    where: { isDeleted: false },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request

  const newItem = await prisma.report.create({
    data: requestBody,
  });
  return NextResponse.json(newItem);
}
