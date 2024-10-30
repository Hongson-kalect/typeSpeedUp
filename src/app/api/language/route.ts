import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  const { code, name, desc, flag } = await request.json();
  console.log("request :>> ", request.json());

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

export async function GET(request: Request) {
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
