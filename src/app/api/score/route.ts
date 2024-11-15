import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function GET() {
  const items = await prisma.score.findMany({
    where: { isDeleted: false },
  });
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const requestBody = await request.json(); //body từ request

  // const newItem = await prisma.score.create({
  //   data: requestBody,
  // });
  const para = await prisma.paragraph.findFirst({
    where: { id: requestBody.targetId },
  });

  console.log("para :>> ", para);

  if (!para) {
    return NextResponse.json(
      { message: "Paragraph not found" },
      { status: 404 }
    );
  }

  const bestScore = await prisma.score.findFirst({
    where: { targetId: para.id, isDeleted: false, rank: "best" },
  });

  if (!bestScore) {
    await prisma.score.create({
      data: {
        ...requestBody,
        rank: "best",
      },
    });

    await prisma.score.create({
      data: {
        ...requestBody,
        rank: "average",
      },
    });

    return NextResponse.json({
      best: null,
      average: null,
    });
  } else {
    if (requestBody.score > bestScore.score) {
      const { id, ...plug } = requestBody;
      await prisma.score.update({
        where: { id: bestScore.id },
        data: {
          ...plug,
          rank: "best",
        },
      });
    }

    const averageScore = await prisma.score.findFirst({
      where: { targetId: para.id, isDeleted: false, rank: "average" },
    });

    console.log("averageScore :>> ", averageScore);
    if (averageScore) {
      const completedTime = para.completed;
      averageScore.cpm =
        Math.floor(
          ((averageScore?.cpm * completedTime + requestBody.cpm) /
            (completedTime + 1)) *
            10
        ) / 10;
      averageScore.wpm =
        Math.floor(
          ((averageScore?.wpm * completedTime + requestBody.wpm) /
            (completedTime + 1)) *
            10
        ) / 10;
      averageScore.score =
        Math.floor(
          ((averageScore?.score * completedTime + requestBody.score) /
            (completedTime + 1)) *
            10
        ) / 10;
      averageScore.wAccuracy =
        Math.floor(
          ((averageScore?.wAccuracy * completedTime + requestBody.wAccuracy) /
            (completedTime + 1)) *
            10
        ) / 10;
      averageScore.cAccuracy =
        Math.floor(
          ((averageScore?.cAccuracy * completedTime + requestBody.cAccuracy) /
            (completedTime + 1)) *
            10
        ) / 10;
      averageScore.time =
        Math.floor(
          ((averageScore?.time * completedTime + requestBody.time) /
            (completedTime + 1)) *
            10
        ) / 10;

      const {} = averageScore;
      const reAverageScore = await prisma.score.update({
        where: { id: averageScore.id },
        data: {
          cpm: averageScore.cpm,
          wpm: averageScore.wpm,
          score: averageScore.score,
          wAccuracy: averageScore.wAccuracy,
          cAccuracy: averageScore.cAccuracy,
          time: averageScore.time,
        },
      });

      console.log("completedTime :>> ", completedTime);
      await prisma.paragraph.update({
        where: { id: para.id },
        data: {
          completed: completedTime + 1,
        },
      });

      return NextResponse.json({
        best: bestScore,
        average: reAverageScore,
      });
    }
  }
}
