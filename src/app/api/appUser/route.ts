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
  const requestBody = await request.json();
  const { id: userId } = requestBody; //body từ request

  const appUser = await prisma.appUser.findUnique({
    where: { userId },
    include: {
      devices: true,
      asset: true,
      favorite: true,
      novels: true,
      paragraph: true,
      profile: true,
      rank: true,
      rate: true,
      report: true,
      score: true,
      setting: true,
      user: true,
    },
  });

  console.log("appUser", appUser);
  if (appUser) {
    return NextResponse.json(appUser);
    // prisma.appUser.update({ where: { id: appUser.id }, data: { userId } });
  } else {
    console.log("Zo đây :");
    const newAppUser = await prisma.appUser.create({ data: { userId } });
    console.log("newAppUser :>> ", newAppUser);
    return NextResponse.json(newAppUser);
  }

  // const newItem = await prisma.appUser.create({
  //   data: requestBody,
  // });
  // return NextResponse.json(requestBody);
}
