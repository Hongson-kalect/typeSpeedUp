import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  //get request body
  const requestBody = await request.json();

  const matchedItems = await prisma.appUser.findMany({
    where: requestBody,
  });

  return NextResponse.json(matchedItems);
}
