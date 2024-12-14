"use client";

import TypeArea from "@/app/speed-test/components/TypeArea";
import { IResult } from "@/app/speed-test/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMainStore } from "@/layouts/main.store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import * as React from "react";
import { BiStar } from "react-icons/bi";
import { FaFlag } from "react-icons/fa";
import {
  NovelInfoType,
  ParaInfoType,
  ScoreInfoType,
} from "../_utils/interface";
import SendButton from "../components/send.button";
import NovelOptions from "./ui/options";
import TypedScore from "./ui/score";

export default function ParaInfoPage() {
  const params = useParams();

  const { userInfo } = useMainStore();

  const paraInfo = useQuery<ParaInfoType>({
    queryFn: async () => {
      const res = await axios.get("/api/paragraph/" + params.id);
      return res.data;
    },
    queryKey: ["paraInfo", params.id],
  });

  const novelInfo = useQuery<NovelInfoType>({
    queryFn: async () => {
      if (!paraInfo?.data?.novelId) return [];
      const res = await axios.get("/api/novel/" + paraInfo.data.novelId);
      return res.data;
    },
    queryKey: ["novelInfo"],
  });

  const [resetType, setResetType] = React.useState(false);
  const [isShowScore, setIsShowScore] = React.useState(false);
  const [result, setResult] = React.useState<IResult>({
    wordTyped: 0,
    charTyped: 0,
    wordCorrect: 0,
    charCorrect: 0,
    wordError: 0,
    charError: 0,
    wpm: 0,
    cpm: 0,
    wAccuracy: 0,
    cAccuracy: 0,
    score: 0,
  });

  const ranking = useQuery<{
    best: ScoreInfoType;
    average: ScoreInfoType;
  }>({
    queryFn: async () => {
      if (!params.id) return { best: {}, average: {} };

      const { wpm, cpm, wAccuracy, cAccuracy, score, time } = result;
      const res = await axios.post("/api/score/", {
        wpm,
        cpm,
        wAccuracy: wAccuracy,
        cAccuracy: cAccuracy,
        score,
        time,
        userId: userInfo?.id,

        type: "Paragraph",
        targetId: Number(params.id),
      });
      return res.data;
    },
    queryKey: ["ranking"],
  });

  return (
    <div className="flex flex-1 overflow-auto w-full">
      <div className="flex-1 px-6 py-4 overflow-auto hide-scroll">
        <h2 className="text-xl font-semibold text-gray-600">
          Chapter {paraInfo.data?.chapter}: {paraInfo.data?.header}
        </h2>
        {/* <div className="typing pt-1 bg-white rounded-lg w-full"> */}
        <TypeArea
          timeType="countDown"
          rankQuery={ranking}
          isReset={resetType}
          setIsReset={setResetType}
          setResult={setResult}
          isFinish={isShowScore}
          setIsFinish={setIsShowScore}
        />
        {/* </div> */}
        <TypedScore
          isShowResult={isShowScore}
          result={result}
          rank={ranking.data || { best: {}, average: {} }}
          reset={() => setResetType(true)}
        />
        <div className="flex gap-4 mt-8">
          <div className="bg-white flex-1 px-4 py-3 rounded-lg">
            <div className="flex justify-between">
              <h2 className=" text-blue-600 font-bold text-lg">COMMENT</h2>
              <div className="flex gap-2 items-center">
                <div className="flex gap-1 items-center cursor-pointer hover:scale-105 duration-200">
                  <BiStar className="mb-0.5" />
                  <p>Đánh giá</p>
                </div>
                <Button
                  size={"sm"}
                  className="bg-red-500 text-white hover:bg-red-700"
                >
                  <FaFlag size={16} />
                  <p className="text-sm">Báo cáo</p>
                </Button>
              </div>
            </div>

            <div>
              <div className="empty-comment text-center flex flex-col justify-center items-center">
                <div className="h-12 w-16 bg-red-400"></div>
                <p className="text-center mt-3">
                  Hãy là người đầu tiên nói gì đó về đoạn văn này
                </p>
              </div>
            </div>

            <div className="px-4 flex items-center gap-4 mt-3">
              <Input />
              <SendButton className="h-10 rounded" />
            </div>
          </div>
          <div
            className={`bg-white overflow-hidden w-1/2 px-4 rounded-lg duration-500 ${
              !isShowScore ? "h-0" : "h-full"
            }`}
          >
            {/* <div className="py-3">
              <div>
                <h2 className=" text-orange-500 font-bold text-lg">
                  YOUR PARAGRAPHS
                </h2>
              </div>
              <div
                className={`py-2 px-2 rounded bg-blue-50 overflow-hidden duration-500 relative `}
              >
                {userInput}
              </div>
            </div> */}
          </div>
        </div>
      </div>
      <div className="w-[400px] h-full px-2 py-4 flex-col flex">
        <NovelOptions novel={novelInfo.data} />
        <div className="ranking mt-4 px-4 py-3 bg-white rounded-lg w-full flex-1">
          <div>
            <h2 className=" text-gray-800 font-bold">
              ĐỀ XUẤT{" "}
              <span className="text-gray-400 text-sm font-light">
                --cùng bộ--
              </span>
            </h2>
            <div className="pl-2 flex flex-col pb-2">
              <div className="flex justify-between cursor-pointer hover:bg-slate-100 duration-200 px-2 py-2">
                <p className="text-sm font-medium line-clamp-2">
                  Chapter 2: Căn nguyên thảm họa
                </p>
                <p className="text-sm text-gray-700">240 chữ</p>
              </div>
              <div className="flex justify-between cursor-pointer hover:bg-slate-100 duration-200 px-2 py-2">
                <p className="text-sm font-medium line-clamp-2">
                  Chapter 2: Căn nguyên thảm họa
                </p>
                <p className="text-sm text-gray-700">240 chữ</p>
              </div>
              <div className="flex justify-between cursor-pointer hover:bg-slate-100 duration-200 px-2 py-2">
                <p className="text-sm font-medium line-clamp-2">
                  Chapter 2: Căn nguyên thảm họa
                </p>
                <p className="text-sm text-gray-700">240 chữ</p>
              </div>
            </div>
          </div>

          <div>
            <h2 className=" text-gray-800 font-bold">THỊNH HÀNH</h2>
          </div>
        </div>
      </div>
    </div>
  );
}
