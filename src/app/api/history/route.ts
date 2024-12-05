import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.history.findMany({
    where: { isDeleted: false },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request

  const item = await prisma.history.findFirst({
    where: requestBody,
  });

  if (item) {
    const updatedItem = await prisma.history.update({
      where: { id: item.id },
      data: { time: [...item.time, new Date()] },
    });

    return NextResponse.json(updatedItem);
  } else {
    const newItem = await prisma.history.create({
      data: {
        ...requestBody,
        time: [new Date()],
        // user: {
        //   connect: {
        //     id: requestBody.userId,
        //   },
        // },
      },
    });

    return NextResponse.json(newItem);
  }

  // const newItem = await prisma.history.create({
  //   data: requestBody,
  // });
  // return NextResponse.json(newItem);
}
