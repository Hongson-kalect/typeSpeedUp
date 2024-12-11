"use client";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { GrPowerReset } from "react-icons/gr";
import { scrollTo } from "../libs/utils";
import TypeArea from "./components/TypeArea";
import { IResult } from "./types";

const Result = ({ result, reset }) => (
  <div
    className=" bg-white rounded-lg px-6 py-4 flex gap-4"
    id="type-score"
    style={{ border: "1px solid #ddd" }}
  >
    <div className="flex-2">
      <h2 className=" text-orange-500 font-bold text-2xl">KẾT QUẢ</h2>
      <div className="detail grid grid-cols-3 flex-wrap gap-8 mt-4 pl-4 max-w-[560px]">
        <div className="">
          <p className="text-sm text-gray-600 mt-3">Số từ đã gõ</p>
          <p className="font-semibold text-3xl mt-2 text-center">
            <span>{result.wordTyped || 0}</span>
            <span className="text-sm text-red-400">
              ({result.wordError || 0})
            </span>
          </p>
        </div>
        <div className="">
          <p className="text-sm text-gray-600 mt-3">Số chữ / phút</p>
          <p className="font-semibold text-3xl mt-2 text-center">
            {result.wpm || 0}
          </p>
        </div>
        <div className="">
          <p className="text-sm text-gray-600 mt-3">Tỉ lệ đúng</p>
          <p className=" mt-3.5 text-center text-xl italic">
            {result.wa || 0}%
          </p>
        </div>
        <div className="">
          <p className="text-sm text-gray-600 mt-3">Số ký tự đã gõ</p>
          <p className="font-semibold text-3xl mt-2 text-center">
            <span>{result.charTyped || 0}</span>
            <span className="text-sm text-red-400">
              ({result.charError || 0})
            </span>
          </p>
        </div>
        <div className="">
          <p className="text-sm text-gray-600 mt-3">Số ký tự / phút</p>
          <p className="font-semibold text-3xl mt-2 text-center">
            {result.cpm || 0}
          </p>
        </div>
        <div className="">
          <p className="text-sm text-gray-600 mt-3">Tỉ lệ đúng</p>
          <p className=" mt-3.5 text-center text-xl italic">
            {result.ca || 0}%
          </p>
        </div>
      </div>
    </div>
    <div
      className="flex-1 flex flex-col pl-4"
      style={{ borderLeft: "1px solid #ddd" }}
    >
      <h2 className=" text-blue-500 font-bold text-2xl">ĐIỂM</h2>
      <div className="flex flex-col items-center justify-center flex-1">
        <p className="point text-5xl font-bold">{result.score}</p>
        <p className="point text-xl text-cyan-500 italic font-bold mt-6">
          Excelent
        </p>
      </div>
      <Button
        className="h-14 bg-green-500 hover:bg-green-700 text-lg"
        onClick={() => reset()}
      >
        <GrPowerReset size={20} /> Thử lại
      </Button>
    </div>
    <div className="flex-1">
      {/* <h2 className=" text-blue-500 font-bold text-2xl">ĐIỂM</h2> */}
    </div>
  </div>
);

const rankList = [
  {
    rank: 1,
    name: "Guest 1",
    wpm: 120,
    cpm: 386,
    wa: 88.16,
    ca: 82.14,
    score: 243,
    attemp: 3,
  },
  {
    rank: 2,
    name: "Guest 2",
    wpm: 110,
    cpm: 356,
    wa: 85.12,
    ca: 80.14,
    score: 223,
    attemp: 2,
  },
  {
    rank: 3,
    name: "Guest 3",
    wpm: 100,
    cpm: 326,
    wa: 82.08,
    ca: 78.16,
    score: 203,
    attemp: 5,
  },
  {
    rank: 4,
    name: "Guest 4",
    wpm: 90,
    cpm: 296,
    wa: 79.04,
    ca: 76.18,
    score: 183,
    attemp: 4,
  },
  {
    rank: 5,
    name: "Guest 5",
    wpm: 80,
    cpm: 266,
    wa: 76.0,
    ca: 74.2,
    score: 163,
    attemp: 1,
  },
];

const Rank = () => {
  return (
    <div
      className="mt-8 bg-white rounded-lg px-6 py-4 flex gap-4"
      style={{ border: "1px solid #d5d5d5" }}
    >
      <div className="w-full">
        <h2 className=" text-gray-700 font-bold text-">XẾP HẠNG</h2>
        <table className="mt-6 min-w-[700px] w-5/6 text-center">
          <tbody>
            <tr className="text-gray-700 [&_th]:py-3 bg-gray-200">
              <th>Rank</th>
              <th>User Name</th>
              <th>WPM</th>
              <th>CPM</th>
              <th>WA</th>
              <th>CR</th>
              <th>Score</th>
              <th>Attemp</th>
              {/* <th>total</th> */}
            </tr>

            {rankList.map((item, index) => (
              <RankItem
                id={item.rank}
                key={index}
                rank={item.rank}
                userName={item.name}
                wpm={item.wpm}
                cpm={item.cpm}
                wa={item.wa}
                ca={item.ca}
                score={item.score}
                attempt={item.attemp}
              />
            ))}
            <tr
              className="text-gray-700 [&_td]:py-4 shadow-inner shadow-blue-400"
              style={{ border: "1px solid #eee" }}
            >
              <td colSpan={2} className="font-medium text-sm">
                TRUNG BINH
              </td>
              <td className="text-green-500 font-medium">42</td>
              <td>102</td>
              <td className="text-sm">75%</td>
              <td className="text-sm">63%</td>
              <td>124</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

type IRankItemProps = {
  id: number;
  userName: string;
  rank: number;
  wpm: number;
  cpm: number;
  wa: number;
  ca: number;
  score: number;
  attempt: number;
};
const RankItem = (props: IRankItemProps) => {
  return (
    <tr
      className="text-gray-700 [&_td]:py-4"
      style={{ border: "1px solid #eee" }}
    >
      <td className="text-sm">{props.rank}</td>
      <td
        className={`font-medium ${
          props.rank === 1 ? "font-medium text-lg" : "text-sm"
        } `}
      >
        {props.userName}
      </td>
      <td className="text-green-500 font-medium">{props.wpm}</td>
      <td>{props.cpm}</td>
      <td className="text-sm">{props.wa}</td>
      <td className="text-sm">{props.ca}</td>
      <td>{props.score}</td>
      <td>{props.attempt}</td>
    </tr>
  );
};

const SpeedTest = (props: ISpeedTestProps) => {
  const [paragraphs, setParagraphs] = React.useState("");
  const [userInput, setUserInput] = React.useState("");
  const [wordIndex, setWordIndex] = React.useState(0);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isShowScore, setIsShowScore] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
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
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  const resetType = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    inputRef.current?.removeAttribute("disabled");
    setParagraphs("");
    setUserInput("");
    setWordIndex(0);
    setIsTyping(false);
    inputRef.current?.focus();

    window.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the h to top of window
    });

    document.getElementById("speed-test-page")?.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the scroll top of page
    });
  };

  React.useEffect(() => {
    scrollTo("#char-" + wordIndex, ".words-wrapper");
  }, [wordIndex]);

  React.useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className=" p-4 flex-1 px-6 overflow-auto" id="speed-test-page">
      <TypeArea
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

      <div className="h-20 flex items-center justify-center mt-8">
        <div className="h-full w-40 bg-red-300"></div>
      </div>

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
        <Rank />
      </div>
    </div>
  );
};

export default SpeedTest;
