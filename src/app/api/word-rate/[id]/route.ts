import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getRequestId, IdParamType } from "../../_service";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: IdParamType }
) {
  const id = await getRequestId(params);

  const items = (await prisma.word) - rate.findUnique({ where: { id } });
  return NextResponse.json(items);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: IdParamType }
) {
  const id = await getRequestId(params);

  const requestBody = await request.json();
  const editedItem =
    (await prisma.word) -
    rate.update({
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

  const deletedItem = (await prisma.word) - rate.findUnique({ where: { id } });
  if (!deletedItem) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const items =
    (await prisma.word) -
    rate.update({
      where: { id },
      data: { isDeleted: true },
    });
  return NextResponse.json(items);
}
