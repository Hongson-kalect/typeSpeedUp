"use client";
import * as React from "react";
import { scrollTo } from "../libs/utils";
import { Rank } from "./components/Ranking";
import { Result } from "./components/Result";
import TypeArea from "./components/TypeArea";
import { IRank, IResult } from "./types";
import { useQuery } from "@tanstack/react-query";
import { getSpeedTestRank } from "./components/Ranking/_utils";

const SpeedTest = (props: ISpeedTestProps) => {
  const [paragraphs, setParagraphs] = React.useState("");
  const [userInput, setUserInput] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(false);
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
    wa: 0,
    ca: 0,
    score: null,
  });
  // const inputRef = React.useRef<HTMLElement | null>(
  //   document.getElementById("input-text")
  // );

  const resetType = () => {
    const inputRef = document.getElementById("input-text");
    inputRef?.removeAttribute("disabled");
    setParagraphs("");
    setUserInput("");
    setWordIndex(0);
    setIsTyping(false);
    setIsShowScore(false);
    inputRef?.focus();
    console.log("inputRef :>> ", inputRef);

    window.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the h to top of window
    });

    document.getElementById("speed-test-page")?.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the scroll top of page
    });
  };

  const rankQuery = useQuery<IRank[]>({
    queryKey: ["rank"],
    queryFn: () => getSpeedTestRank(),
  });

  React.useEffect(() => {
    scrollTo("#char-" + wordIndex, ".words-wrapper");
  }, [wordIndex]);

  return (
    <div className=" p-4 flex-1 px-6 overflow-auto" id="speed-test-page">
      <TypeArea
        rankQuery={rankQuery}
        paragraphs={paragraphs}
        userInput={userInput}
        wordIndex={wordIndex}
        setParagraphs={setParagraphs}
        setUserInput={setUserInput}
        setWordIndex={setWordIndex}
        isTyping={isTyping}
        setIsTyping={setIsTyping}
        resetType={resetType}
        setResult={setResult}
        isFinish={isShowScore}
        setIsFinish={setIsShowScore}
      />

      {/* <div className="h-20 flex items-center justify-center mt-8">
        <div className="h-full w-40 bg-red-300"></div>
      </div> */}

      <div className="duration-200 pt-8" id="type-result">
        {result.score !== null ? (
          <div
            className={` rounded-lg ${
              isTyping
                ? "opacity-30"
                : "shadow-xl border-blue-400 border-solid border-2 shadow-blue-500"
            }`}
          >
            <Result result={result} reset={resetType} />
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
