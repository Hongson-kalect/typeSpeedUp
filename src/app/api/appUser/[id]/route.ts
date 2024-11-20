import { PrismaClient } from "@prisma/client";
import { NextResponse, NextRequest } from "next/server";
import { getRequestId, IdParamType } from "../../_service";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: IdParamType }
) {
  const id = await getRequestId(params);

  const items = await prisma.appUser.findUnique({
    where: { id },
  });
  return NextResponse.json(items);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: IdParamType }
) {
  const reqId = await getRequestId(params);
  const requestBody = await request.json();

  const { id, _id, ...editContent } = requestBody;
  // const editedItem = await prisma.novel.update({
  //   where: { id: reqId },
  //   data: editContent,
  // });
  console.log("editContent :>> ", editContent);

  const editedItem = await prisma.appUser.update({
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

  const deletedItem = await prisma.appUser.findUnique({ where: { id } });
  if (!deletedItem) {
    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  }

  const items = await prisma.appUser.update({
    where: { id },
    data: { isDeleted: true },
  });
  return NextResponse.json(items);
}
