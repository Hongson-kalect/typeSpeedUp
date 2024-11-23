import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

import { v4 as uui } from "uuid";

const prisma = new PrismaClient();
export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request
  console.log("requestBody :>> ", requestBody);
  const { token, session } = requestBody;
  if (!token || !session)
    return NextResponse.json(
      { message: "token or session not found" },
      { status: 400 }
    );

  const user = await prisma.user.findUnique({
    where: { id: token.id },
  });

  //   user: {
  //     name: 'hong son',
  //     email: 'hongson197201@gmail.com',
  //     image: 'https://lh3.googleusercontent.com/a/ACg8ocJiGCnQrugbFcy2_VrvrzUibgc5lwiitOdPqgqV6H2J0OEFLA=s96-c'
  //   },
  //   expires: '2024-12-22T08:37:43.534Z'

  prisma.session.create({
    data: {
      expires: session.expires,
      sessionToken: session.sessionToken || uui(),
      userId: token.id,
    },
  });

  if (user) {
    const appUser = await prisma.appUser.findUnique({
      where: { userId: token.id },
    });
    if (appUser) {
      return NextResponse.json(user);
    } else {
      const appUser = await prisma.appUser.create({
        data: {
          id: token.id,
          userId: token.id,
          //   name: token.name,
          //   email: token.email,
          //   image: token.picture,
        },
      });
      if (appUser) {
        return NextResponse.json(appUser);
      }
    }
  } else {
    console.log("bruh");
    await prisma.user.create({
      data: {
        id: token.id,
        name: token.name,
        email: token.email,
        image: token.picture,
      },
    });
    const appUser = await prisma.appUser.create({
      data: {
        id: token.id,
        userId: token.id,
        //   name: token.name,
        //   email: token.email,
        //   image: token.picture,
      },
    });
    if (appUser) {
      return NextResponse.json(appUser);
    }
    // if (user) {
    //   return NextResponse.json(user);
    // }
  }

  //   const newItem = await prisma.user.create({
  //     data: requestBody,
  //   });
  //   return NextResponse.json(newItem);
}
