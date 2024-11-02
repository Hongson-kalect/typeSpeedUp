import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const items =
    (await prisma.special) -
    rule.findMany({
      where: { isDeleted: false },
    });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request

  const newItem =
    (await prisma.special) -
    rule.create({
      data: requestBody,
    });
  return NextResponse.json(newItem);
}
