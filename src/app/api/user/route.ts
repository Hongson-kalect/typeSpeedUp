import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.user.findMany({
    where: { isDeleted: false },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request

  const user = await prisma.user.findUnique({
    where: { email: requestBody.email },
  });

  console.log("brủ");
  if (user) {
    return NextResponse.json(user);
  } else {
    const user = await prisma.user.create({
      data: requestBody,
    });
    if (user) {
      return NextResponse.json(user);
    }
  }

  const newItem = await prisma.user.create({
    data: requestBody,
  });
  return NextResponse.json(newItem);
}
