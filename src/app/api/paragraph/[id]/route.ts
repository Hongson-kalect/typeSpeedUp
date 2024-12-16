import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getRequestId, IdParamType } from "../../_service";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: IdParamType }
) {
  const urlObject = new URL(request.url);
  const paragraphId = await getRequestId(params);
  const userId = urlObject.searchParams.get("userId");

  if (userId) {
    const result = await prisma.$transaction(async (tx) => {
      const stats = await tx.paragraph.findUnique({
        where: {
          id: Number(paragraphId),
        },
        select: {
          id: true,
          novelId: true,
          languageId: true,
          header: true,
          content: true,
          desc: true,
          chapter: true,
          isDeleted: true,
          _count: {
            select: {
              like: {
                where: { isDeleted: false },
              },
              favorite: {
                where: { isDeleted: false },
              },
            },
          },
          like: {
            where: {
              userId: Number(userId),
              isDeleted: false,
            },
          },
          favorite: {
            where: {
              userId: Number(userId),
              isDeleted: false,
            },
          },
        },
      });

      const { _count, like, favorite, ...rest } = stats;

      return {
        ...rest,
        isLiked: !!like?.length,
        isFavorited: !!favorite?.length,
        likeCount: _count.like ?? 0,
        favoriteCount: _count.favorite ?? 0,
      };
    });

    return NextResponse.json(result);
  }

  const result = await prisma.$transaction(async (tx) => {
    const stats = await tx.paragraph.findUnique({
      where: {
        id: Number(paragraphId),
      },
      select: {
        id: true,
        novelId: true,
        languageId: true,
        header: true,
        content: true,
        desc: true,
        chapter: true,
        isDeleted: true,
        _count: {
          select: {
            like: {
              where: { isDeleted: false },
            },
            favorite: {
              where: { isDeleted: false },
            },
          },
        },
      },
    });
    const { _count, ...rest } = stats;

    return {
      ...rest,
      isLiked: false,
      isFavorited: false,
      likeCount: _count.like ?? 0,
      favoriteCount: _count.favorite ?? 0,
    };
  });

  return NextResponse.json(result);

  // const items = await prisma.like.findMany({
  //   where: { isDeleted: false },
  //   include: {
  //     user: true,
  //     novel: true,
  //     paragraph: true,
  //     theme: true,
  //   },
  // });

  // return NextResponse.json(items);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: IdParamType }
) {
  const id = await getRequestId(params);

  const requestBody = await request.json();
  const editedItem = await prisma.paragraph.update({
    where: { id: Number(id) },
    data: requestBody,
  });
  return NextResponse.json(editedItem);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: IdParamType }
) {
  const id = await getRequestId(params);

  const deletedItem = await prisma.paragraph.findUnique({
    where: { id: Number(id) },
  });
  if (!deletedItem) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const items = await prisma.paragraph.update({
    where: { id: Number(id) },
    data: { isDeleted: true },
  });
  return NextResponse.json(items);
}
