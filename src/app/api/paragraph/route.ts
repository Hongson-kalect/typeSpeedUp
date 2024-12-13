import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.paragraph.findMany({
    where: { isDeleted: false },
    include: { novel: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(items);
}

// export async function POST(request: Request) {
//   const requestBody = await request.json(); //body từ request

//   const newItem = await prisma.paragraph.create({
//     data: requestBody,
//   });
//   return NextResponse.json(newItem);
// }



export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request

  const initPara = {
    languageId: requestBody?.language || null,
    content: "",
    desc: "",
    chapter: "0",
    userId: "6729d611fbf2f5f41beddcd0", //useri Id phake
    // novelId: "test novel",
  };

  // const { title, content } = requestBody;

  // const newItem = await prisma.novel.create({
  //   data: { ...initNovel, name: header },
  // });

  // initPara.novelId = newItem.id;
  const newParagraphs = await prisma.paragraph.create({
    data: { ...initPara, ...requestBody },
  });
  return NextResponse.json(newParagraphs);
}

