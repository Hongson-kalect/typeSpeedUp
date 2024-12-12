import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const requestBody = await request.json();

  const matchedItems = await prisma.score.findMany({
    where: requestBody,
  });

  return NextResponse.json(matchedItems);
}
