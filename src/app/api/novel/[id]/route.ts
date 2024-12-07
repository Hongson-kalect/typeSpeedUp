import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getRequestId, IdParamType } from "../../_service";
import { EJSON } from "bson";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: IdParamType }
) {
  const id = await getRequestId(params);

  const novel = await prisma.novel.findUnique({
    where: { id },
    include: {
      _count: {
        select: {
          like: {
            where: { type: "novel", isDeleted: false },
          },
          favorite: {
            where: { type: "novel", isDeleted: false },
          },
        },
      },
      // like: {
      //   where: { type: "novel", isDeleted: false },
      // },
      // favorite: {
      //   where: { type: "novel", isDeleted: false },
      // },
      paragraphs: {
        where: { isDeleted: false },
        orderBy: { chapter: "asc" },
      },
    },
  });

  if (!novel)
    return NextResponse.json({ message: "novel not found" }, { status: 404 });

  novel.likes = novel._count.like;
  novel.favorites = novel._count.favorite;


  // const matchedItems = novelRaw?.cursor?.firstBatch[0];
  // const novel = EJSON.deserialize({
  //   ...matchedItems,
  //   id: matchedItems._id,
  //   firstChapter: matchedItems.firstChapter[0],
  // });

  return NextResponse.json(novel);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: IdParamType }
) {
  const reqId = await getRequestId(params);

  const requestBody = await request.json();

  const { id, _id, ...editContent } = requestBody;
  const editedItem = await prisma.novel.update({
    where: { id: reqId },
    data: editContent,
  });
  return NextResponse.json(editedItem);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: IdParamType }
) {
  const id = await getRequestId(params);

  const deletedItem = await prisma.novel.findUnique({ where: { id } });
  if (!deletedItem) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const items = await prisma.novel.update({
    where: { id },
    data: { isDeleted: true },
  });
  return NextResponse.json(items);
}
