"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { GrPowerReset } from "react-icons/gr";
import { ResultType, ScoreInfoType } from "../../_utils/interface";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Timer } from "./typing";

export interface ITypedScoreProps {
  result: ResultType;
  isShowResult: boolean;
  reset: () => void;
  rank: {
    best?: ScoreInfoType;
    average?: ScoreInfoType;
  };
}

// const result = {
//   wordTyped: 210,
//   wordError: 63,
//   wpm: 60.8,
//   wa: 60.8,
//   charTyped: 60.8,
//   charError: 60.8,
//   cpm: 60.8,
//   ca: 60.8,
//   score: 60.8,
// };

export default function TypedScore({
  result,
  isShowResult,
  rank,
  reset,
}: ITypedScoreProps) {
  const ranks = React.useMemo(() => {
    if (rank.best && rank.average)
      return [rank.best, rank.average, result].sort(
        (a, b) => b.score - a.score
      );
    else return [result];
  }, [rank, result]);

  function calculatePercentage(value: number) {
    let returnValue = 50;
    if (!rank.average || !rank.best) return 50;
    const average = rank.average.score;
    const best = rank.best.score;

    const range = best - average;

    if (value === average) {
      return returnValue;
    } else {
      // Tính toán phần trăm tăng với tỷ lệ cao hơn cho các giá trị gần trung bình
      const diff = value - average;
      if (diff > 0) {
        returnValue = 50 + 50 * Math.pow(diff / range, 1 / 3);
      } else {
        returnValue = 50 - 80 * Math.pow(Math.abs(diff) / average, 1 / 3);
      }

      if (returnValue === 100) return 99.99;
      if (returnValue < 0) return 0.1;

      return Math.floor(returnValue * 10) / 10;
    }
  }

  React.useEffect(() => {
    console.log(reset);
  }, [reset]);

  return (
    <div
      className={`${
        isShowResult ? "" : "[&>*]:opacity-40"
      } bg-white rounded-lg px-4 py-3 flex gap-4 mt-4`}
      id="type-score"
      style={{ border: "1px solid #ddd" }}
    >
      <div className="flex-1 flex">
        <div className="flex-[2]">
          <h2 className=" text-orange-500 font-bold text-lg">KẾT QUẢ</h2>
          <div className="detail grid grid-cols-3 flex-wrap gap-8 mt-4 pr-2 max-w-[560px]">
            <div className="">
              <p className="text-sm text-gray-600 mt-3">Số chữ</p>
              <p className="font-semibold text-xl mt-2 text-center">
                <span>{result.correctWord || 0}</span>
                <span className="text-sm text-red-400">
                  ({result.failWord || 0})
                </span>
              </p>
            </div>
            <div className="">
              <p className="text-sm text-gray-600 mt-3">WPM</p>
              <p className="font-semibold text-xl mt-2 text-center">
                {result.wpm || 0}
              </p>
            </div>
            <div className="">
              <p className="text-sm text-gray-600 mt-3">Tỉ lệ</p>
              <p className=" mt-2 text-center text-xl text-green-600 italic">
                {result.wAccuracy || 0}%{" "}
                {/* <span className="text-xs text-red-400">
                  {100 - result.wa || 0}%
                </span> */}
              </p>
            </div>
            <div className="">
              <p className="text-sm text-gray-600 mt-3">Số ký tự</p>
              <p className="font-semibold text-xl mt-2 text-center">
                <span>{result.correctChar || 0}</span>
                <span className="text-sm text-red-400">
                  ({result.failChar || 0})
                </span>
              </p>
            </div>
            <div className="">
              <p className="text-sm text-gray-600 mt-3">CPM</p>
              <p className="font-semibold text-xl mt-2 text-center">
                {result.cpm || 0}
              </p>
            </div>
            <div className="">
              <p className="text-sm text-gray-600 mt-3">Tỉ lệ</p>
              <p className=" mt-2 text-center text-xl text-green-600 italic">
                {result.cAccuracy || 0}%{" "}
                {/* <span className="text-xs text-red-400">
                  {100 - result.wa || 0}%
                </span> */}
              </p>
            </div>
          </div>
        </div>
        <div
          className="flex flex-col flex-1 pl-4"
          style={{ borderLeft: "1px solid #ddd" }}
        >
          <h2 className=" text-blue-500 font-bold text-lg">ĐIỂM</h2>
          <div className="flex flex-col items-center justify-center">
            <p className="point text-5xl font-bold mt-8">{result.score}</p>
            <p className="point text-xl text-cyan-500 italic font-bold mt-4">
              Excelent
            </p>
          </div>
          <Button
            className="h-14 bg-green-500 hover:bg-green-700 text-lg w-52"
            onClick={reset}
          >
            <GrPowerReset size={20} /> Thử lại
          </Button>
        </div>
      </div>
      <div className="flex-1">
        <h2 className=" text-orange-500 font-bold text-lg">RANKING</h2>

        <div className="px-3">
          <Table>
            <TableCaption>
              {!rank.best?.score || result.score > rank.best?.score ? (
                <p>Congratulation, you just create a new record</p>
              ) : (
                <p>
                  You better than{" "}
                  <span className="text-lg font-medium text-blue-800">
                    {calculatePercentage(result.score)}%
                  </span>{" "}
                  of people.
                </p>
              )}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Index</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Word Acuracy</TableHead>
                <TableHead className="text-right">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {ranks.map((rank, index) => (
                <TableRow key={index}>
                  <TableCell>{rank?.rank || "Your"}</TableCell>
                  <TableCell>
                    <Timer time={rank.time || 0} />
                  </TableCell>
                  <TableCell>{rank.wAccuracy}%</TableCell>
                  <TableCell className="text-right">{rank.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
