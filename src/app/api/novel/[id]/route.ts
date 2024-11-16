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

  const novelWithLikes = await prisma.$runCommandRaw({
    aggregate: "Novel",
    pipeline: [
      {
        $match: {
          _id: new ObjectId(id),
        },
      },
    ],
    cursor: {},
  });

  const matchedItems = novelWithLikes?.cursor?.firstBatch[0];
  console.log("matchItems :>> ", id, novelWithLikes);
  console.log("ID:", id);
  console.log("Is valid ObjectId:", ObjectId.isValid(id));
  // const novels = EJSON.deserialize({ ...matchedItems, id: matchedItems._id });

  return NextResponse.json(matchedItems);

  const items = await prisma.novel.findUnique({
    where: { id },
    // include: { user: true },
  });
  const lastChapter = await prisma.paragraph.findFirst({
    take: 1,
    where: {
      novelId: id,
    },
    orderBy: {
      chapter: "desc",
    },
  });

  items.lastChapter = lastChapter?.chapter;
  return NextResponse.json(items);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: IdParamType }
) {
  const id = await getRequestId(params);

  const requestBody = await request.json();
  const editedItem = await prisma.novel.update({
    where: { id },
    data: requestBody,
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
