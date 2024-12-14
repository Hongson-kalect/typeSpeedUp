"use client";
import * as React from "react";
import { Rank } from "./components/Ranking";
import { Result } from "./components/Result";
import TypeArea from "./components/TypeArea";
import { IRank, IResult } from "./types";
import { useQuery } from "@tanstack/react-query";
import { getSpeedTestRank } from "./components/Ranking/_utils";

const SpeedTest = () => {
  const [isShowScore, setIsShowScore] = React.useState(false);
  const [resetType, setResetType] = React.useState(false);
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
    score: null,
  });

  const rankQuery = useQuery<IRank[]>({
    queryKey: ["rank"],
    queryFn: () => getSpeedTestRank(),
  });

  return (
    <div className=" p-4 flex-1 px-6 overflow-auto" id="speed-test-page">
      <TypeArea
        timeType="countDown"
        rankQuery={rankQuery}
        isReset={resetType}
        setIsReset={setResetType}
        setResult={setResult}
        isFinish={isShowScore}
        setIsFinish={setIsShowScore}
      />

      <div className="duration-200 pt-8" id="type-result">
        {result.score !== null ? (
          <div
            className={` rounded-lg ${
              !isShowScore
                ? "opacity-30"
                : "shadow-xl border-blue-400 border-solid border-2 shadow-blue-500"
            }`}
          >
            <Result result={result} reset={() => setResetType(true)} />
          </div>
        ) : null}
      </div>

      <div className="" id="type-rank">
        <Rank result={result} ranks={rankQuery.data || []} />
      </div>
    </div>
  );
};

export default SpeedTest;
