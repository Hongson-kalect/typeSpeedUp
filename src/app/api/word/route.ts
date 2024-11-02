import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import { ICreateWord } from "./interface";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.word.findMany({
    where: { isDeleted: false },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const requestBody: ICreateWord = await request.json();

  const newItem = await prisma.word.create({
    data: requestBody,
  });
  return NextResponse.json(newItem);
}
