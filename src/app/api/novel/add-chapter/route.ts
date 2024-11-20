import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const requestBody = await request.json();

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

  const { header, content, novelId, chapter, desc } = requestBody;
  const newParagraphs = await prisma.paragraph.create({
    data: {
      ...initPara,
      header,
      content,
      novelId: novelId,
      chapter,
      desc,
    },
  });
  return NextResponse.json({ paragraphs: newParagraphs });
}
