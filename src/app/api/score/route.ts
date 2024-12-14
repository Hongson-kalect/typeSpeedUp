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
  // add speed-test rank and return
  if (requestBody.type === "speed-test") {
    const rank = await prisma.score.create({
      data: {
        ...requestBody,
      },
    });

    return NextResponse.json(rank);
  }

  //add paragraph rank and return best and average score
  const para = await prisma.paragraph.findFirst({
    where: { id: Number(requestBody.targetId) },
  });
  
    if (!para) {
      return NextResponse.json(
        { message: "Paragraph not found" },
        { status: 404 }
      );
    }

    const best = await prisma.score.findFirst({
      where: { targetId: Number(para.id), isDeleted: false, rank: "best" },
    });
    const average = await prisma.score.findFirst({
      where: { targetId: Number(para.id), isDeleted: false, rank: "average" },
    });

    if (!requestBody.score) {
      return NextResponse.json({ best, average });
    }

    if (!best) {
      const best = await prisma.score.create({
        data: {
          ...requestBody,
          rank: "best",
        },
      });

      const average = await prisma.score.create({
        data: {
          ...requestBody,
          rank: "average",
        },
      });

      return NextResponse.json({
        best,
        average,
      });
    }
    if (requestBody.score > best.score) {
      const { id, ...rest } = requestBody;
      await prisma.score.update({
        where: { id: best.id },
        data: {
          ...rest,
          rank: "best",
        },
      });
    }

    if (average) {
      const completedTime = para.completed;
      average.cpm =
        Math.floor(
          ((average?.cpm * completedTime + requestBody.cpm) /
            (completedTime + 1)) *
            10
        ) / 10;
      average.wpm =
        Math.floor(
          ((average?.wpm * completedTime + requestBody.wpm) /
            (completedTime + 1)) *
            10
        ) / 10;
      average.score =
        Math.floor(
          ((average?.score * completedTime + requestBody.score) /
            (completedTime + 1)) *
            10
        ) / 10;
      average.wAccuracy =
        Math.floor(
          ((average?.wAccuracy * completedTime + requestBody.wAccuracy) /
            (completedTime + 1)) *
            10
        ) / 10;
      average.cAccuracy =
        Math.floor(
          ((average?.cAccuracy * completedTime + requestBody.cAccuracy) /
            (completedTime + 1)) *
            10
        ) / 10;
      average.time =
        Math.floor(
          ((average?.time * completedTime + requestBody.time) /
            (completedTime + 1)) *
            10
        ) / 10;

      const reAverageScore = await prisma.score.update({
        where: { id: average.id },
        data: {
          cpm: average.cpm,
          wpm: average.wpm,
          score: average.score,
          wAccuracy: average.wAccuracy,
          cAccuracy: average.cAccuracy,
          time: average.time,
        },
      });

      await prisma.paragraph.update({
        where: { id: para.id },
        data: {
          completed: completedTime + 1,
        },
      });

      return NextResponse.json({
        best: best,
        average: reAverageScore,
      });
    }
}
