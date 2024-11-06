import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { use } from "react";

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

  const initPara = {
    languageId: requestBody?.language || null,
    header: "",
    content: "",
    desc: "",
    chapter: "0",
    rate: 0,
    rateTime: 0,
    userId: "6729d611fbf2f5f41beddcd0", //useri Id phake
    novelId: "test novel",
  };

  const { header, title, content } = requestBody;

  const newItem = await prisma.novel.create({
    data: { ...initNovel, name: header },
  });

  initPara.novelId = newItem.id;
  const newParagraphs = await prisma.paragraph.create({
    data: { ...initPara, header: title, content },
  });
  return NextResponse.json({ ...newItem, paragraphs: newParagraphs });
}
