import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  //get request body
  const requestBody = await request.json();

  const where: any = {};

  // Tìm kiếm theo từ khóa
  if (requestBody.search) {
    where.OR = [
      {
        header: {
          contains: requestBody.search,
          mode: "insensitive",
        },
      },
      {
        content: {
          contains: requestBody.search,
          mode: "insensitive",
        },
      },
      {
        novel: {
          name: {
            contains: requestBody.search,
            mode: "insensitive",
          },
        },
      },
    ];
  }

  // Lọc theo yêu thích
  if (requestBody.favorite) {
    where.favorite = {
      some: {
        userId: requestBody.userId,
      },
    };
  }

  // Lọc theo lịch sử
  if (requestBody.history) {
    where.historys = {
      some: {
        userId: requestBody.userId,
      },
    };
  }

  // Lọc theo nội dung của người dùng
  if (requestBody.yourContent) {
    where.userId = requestBody.userId;
  }

  const paragraphs = await prisma.paragraph.findMany({
    where,
    orderBy: {
      createdAt: "desc",
    },
    take: 20,
    include: {
      novel: true,
      language: true,
    },
  });

  return NextResponse.json(paragraphs);

  const matchedItems = await prisma.paragraph.findMany({
    where: requestBody,
  });

  return NextResponse.json(matchedItems);
}
