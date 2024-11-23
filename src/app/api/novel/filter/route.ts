import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { EJSON } from "bson";

const prisma = new PrismaClient();


export async function POST(request: Request) {
  // Get request body
  const requestBody = await request.json();

  console.log("requestBody :>> ", requestBody);

  if (requestBody.userId) {
    console.log("search novel by userId");
  }
  if (requestBody.recent) {
    console.log("search novel by history table");
  }
  if (requestBody.favorite) {
    console.log("search novel favorite");
  }

  // Build the query
  const whereClause = {
    OR: [
      { name: { contains: requestBody.keyword, mode: "insensitive" } },
      { desc: { contains: requestBody.keyword, mode: "insensitive" } },
    ],
    isDeleted: false,
  };

  // Fetch novels with like and favorite counts
  const novels = await prisma.novel.findMany({
    where: whereClause,
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
    },
    orderBy: {
      [requestBody.sort || "createdAt"]:
        requestBody.order === "asc" ? "asc" : "desc",
    },
  });

  // Map the results to include like and favorite counts
  const novelsWithCounts = novels.map((novel) => ({
    ...novel,
    like: novel._count.like,
    favorite: novel._count.favorite,
  }));

  console.log("novelsWithCounts :>> ", novelsWithCounts);

  return NextResponse.json(novelsWithCounts);
}