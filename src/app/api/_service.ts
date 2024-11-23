import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function getRequestId(params: IdParamType) {
  const { id } = await params;
  if (!id || !ObjectId.isValid(id))
    NextResponse.json({ error: "Id invalid or not provided" }, { status: 404 });

  return Number(id) || id;
}

export type IdParamType = Promise<{ id: string | number }>;
