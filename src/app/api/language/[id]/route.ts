import { PrismaClient } from "@prisma/client";
import { ObjectId } from "mongodb";
import { NextResponse, NextRequest } from "next/server";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  //   const { searchParams } = new URL(request.query);
  //   const id = searchParams.get("id");
  const { id } = await params;
  console.log("1 :>> ", id);
  //   console.log("id :>> ", id);
  const items = await prisma.language.findUnique({ where: { id } });

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

export async function DELETE(request: Request) {
  const items = await prisma.language.findMany();

  return NextResponse.json(items);
}

// export default async function handler(req, res) {
//   return Response.json({ message: "Hello from Next.js!" });
//   console.log("bruh");
//   if (req.method === "POST") {
//     const { name } = req.body;
//     const newItem = await prisma.language.create({
//       data: {
//         code: "en",
//         name: "English",
//         desc: "English",
//         flag: "https://th.bing.com/th/id/OIP.PEu9HEP4_RHTSOOJLelLfwHaEA?w=328&h=180&c=7&r=0&o=5&pid=1.7",
//       },
//     });
//     res.status(201).json(newItem);
//   } else if (req.method === "GET") {
//     console.log("Mai da hu");
//     const items = await prisma.language.findMany();
//     res.status(200).json(items);
//   } else {
//     res.setHeader("Allow", ["GET", "POST"]);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }
