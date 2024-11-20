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

  const novelRaw = await prisma.$runCommandRaw({
    aggregate: "Novel",
    pipeline: [
      { $match: { $expr: { $eq: ["$_id", { $toObjectId: id }] } } },
      {
        $lookup: {
          from: "Like",
          localField: "_id",
          foreignField: "targetId",
          as: "likeCount",
          pipeline: [{ $match: { type: "novel", isDeleted: false } }],
        },
      },
      {
        $lookup: {
          from: "Favorite",
          localField: "_id",
          foreignField: "targetId",
          as: "favoriteCount",
          pipeline: [{ $match: { type: "novel", isDeleted: false } }],
        },
      },
      {
        $lookup: {
          from: "Paragraph",
          localField: "_id",
          foreignField: "novelId",
          as: "paragraphss",
          pipeline: [
            { $match: { isDeleted: false } },
            { $sort: { chapter: 1 } }, // Sort scores in descending order
            // { $limit: 10 },
            // {
            //   $facet: {
            //     lastChapterss: [
            //       { $sort: { chapter: -1 } },
            //       { $limit: 10 },
            //     ],
            //     firstChapters: [
            //       { $sort: { chapter: 1 } },
            //       { $limit: 1 }
            //     ]
            //   }

            // }
          ],
        },
      },
      // {
      //   $lookup: {
      //     from: "Paragraph",
      //     localField: "_id",
      //     foreignField: "novelId",
      //     as: "lastChapters",
      //     pipeline: [
      //       { $match: { isDeleted: false } },
      //       { $sort: { chapter: -1 } }, // Sort scores in descending order
      //       { $limit: 1 },
      //     ],
      //   },
      // },
      {
        $lookup: {
          from: "Paragraph",
          localField: "_id",
          foreignField: "novelId",
          as: "firstChapters",
          pipeline: [
            { $match: { isDeleted: false } },
            { $sort: { chapter: 1 } }, // Sort scores in descending order
            { $limit: 1 },
          ],
        },
      },
      {
        $addFields: {
          like: { $size: "$likeCount" },
          favorite: { $size: "$favoriteCount" },
          paragraphs: "$paragraphss",
          // lastChapter: "$lastChapters",
          firstChapter: "$firstChapters",
        },
      },
      {
        $project: {
          likeCount: 0, // Exclude the likes array from the final result
          favoriteCount: 0, // Exclude the likes array from the final result
          paragraphss: 0, // Exclude the likes array from the final result
          // lastChapters: 0, // Exclude the likes array from the final result
          firstChapters: 0, // Exclude the likes array from the final result
          // likeCount: 1, // Include the likeCount field in the final result
        },
      },
    ],
    cursor: {},
  });

  console.log(
    "novelRaw?.cursor?.firstBatch[0] :>> ",
    novelRaw?.cursor?.firstBatch[0]
  );

  const matchedItems = novelRaw?.cursor?.firstBatch[0];
  const novel = EJSON.deserialize({
    ...matchedItems,
    id: matchedItems._id,
    // lastChapter: matchedItems.lastChapter[0],
    firstChapter: matchedItems.firstChapter[0],
  });

  console.log("novel :>> ", novel);

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
