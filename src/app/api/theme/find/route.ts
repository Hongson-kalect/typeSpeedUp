import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const requestBody = await request.json(); //query params trong body của request

  const matchedItem = await prisma.theme.findUnique({
    where: requestBody,
  });

  return NextResponse.json(matchedItem);
}
