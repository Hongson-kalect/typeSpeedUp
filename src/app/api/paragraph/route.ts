import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.paragraph.findMany({
    where: { isDeleted: false },
    include: { novel: true },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request

  const newItem = await prisma.paragraph.create({
    data: requestBody,
  });
  return NextResponse.json(newItem);
}
