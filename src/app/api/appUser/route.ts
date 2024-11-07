import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.appUser.findMany({
    where: { isDeleted: false },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const { name, email, image, id: userId } = await request.json(); //body từ request

  const appUser = await prisma.appUser.findUnique({
    where: { crossPlatform: "google", userId },
  });

  console.log("appUser", appUser);
  if (appUser) {
    prisma.appUser.update({ where: { id: appUser.id }, data: { userId } });
  } else prisma.appUser.create({ data: requestBody });

  // const newItem = await prisma.appUser.create({
  //   data: requestBody,
  // });
  return NextResponse.json(requestBody);
}
