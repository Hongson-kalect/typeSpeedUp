import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const requestBody = await request.json();
  console.log("request :>> ", requestBody);

  const matchedItem = await prisma.language.findUnique({
    where: requestBody,
  });

  return NextResponse.json(matchedItem);
}
