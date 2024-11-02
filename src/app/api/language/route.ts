import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.language.findMany({
    where: { isDeleted: false },
    // include: { word: true },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const requestBody = await request.json();
  const { code, name, desc, flag } = requestBody;
  console.log("request :>> ", requestBody);

  const newItem = await prisma.language.create({
    data: {
      code,
      name,
      desc,
      flag,
    },
  });
  return NextResponse.json(newItem);
}

export async function PUT(request: NextRequest) {
  const id = request.nextUrl.searchParams.get("id");
  console.log("id :>> ", id);
  const requestBody = await request.json();
  const { ...updateInfo } = requestBody;
  console.log("request :>> ", requestBody);

  if (!id || !ObjectId.isValid(id))
    return NextResponse.json(
      { error: "Id invalid or not provided" },
      { status: 404 }
    );

  const editedItem = await prisma.language.update({
    where: { id },
    data: updateInfo,
  });
  return NextResponse.json(editedItem);
}
