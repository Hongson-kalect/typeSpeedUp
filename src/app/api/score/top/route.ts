import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const requestBody = await request.json();
  let { take, date, ...rest } = requestBody;

  take = take || 10;
  date = date || new Date();

  const today = new Date(date);
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const matchedItems = await prisma.score.findMany({
    where: {
      ...rest,
      createdAt: {
        gte: today,
        lt: tomorrow,
      },
    },
    include: {
      user: true,
    },
    orderBy: {
      score: "desc",
    },
    take,
  });

  return NextResponse.json(matchedItems);
}
