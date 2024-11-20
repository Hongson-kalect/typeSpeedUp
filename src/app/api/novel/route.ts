import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.novel.findMany({
    where: { isDeleted: false },
    include: { paragraphs: true },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request
  const initNovel = {
    defaultLanguageId: requestBody?.language || null, // sau thay thanh tieng anh
    level: "easy", //calculation level later
    name: "",
    userId: "6729d611fbf2f5f41beddcd0",
    rate: 0,
    rateTime: 0,
    price: "12 cheo",
    unit: "",
    desc: "",
  };
  const { name, desc, userId, languageId } = requestBody;

  const newNovel = await prisma.novel.create({
    data: {
      ...initNovel,
      name,
      desc,
      userId,
      defaultLanguageId: languageId,
    },
  });
  return NextResponse.json(newNovel);
}
