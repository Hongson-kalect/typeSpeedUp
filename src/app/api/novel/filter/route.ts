import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { EJSON } from "bson";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  //get request body
  const requestBody = await request.json();

  console.log("requestBody :>> ", requestBody);

  {
  }
  if (requestBody.userId) {
    console.log("search novel by userId");
  }
  if (requestBody.rencent) {
    console.log("search novel by history table");
  }
  if (requestBody.favorite) {
    console.log("search novel favorite");
  }

  const novelWithLikes = await prisma.$runCommandRaw({
    aggregate: "Novel",
    pipeline: [
      {
        $match: {
          $or: [
            { name: { $regex: requestBody.keyword, $options: "i" } }, // Case-insensitive match for name
            { description: { $regex: requestBody.keyword, $options: "i" } }, // Case-insensitive match for description
          ],
          isDeleted: false,
        },
      },
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
        $addFields: {
          like: { $size: "$likeCount" },
          favorite: { $size: "$favoriteCount" },
        },
      },
      {
        $sort: {
          [requestBody.sort || "createdAt"]:
            requestBody.order === "asc" ? 1 : -1,
        }, // Sort by likeCount in the specified order
      },
      {
        $project: {
          likeCount: 0, // Exclude the likes array from the final result
          favoriteCount: 0, // Exclude the likes array from the final result
          // likeCount: 1, // Include the likeCount field in the final result
        },
      },
    ],
    cursor: {},
  });
  const matchedItems = novelWithLikes?.cursor?.firstBatch;

  const novels = matchedItems.map((item) =>
    EJSON.deserialize({ ...item, id: item._id })
  );

  console.log("matchedItems, novels :>> ", matchedItems, novels);

  return NextResponse.json(novels);
}
