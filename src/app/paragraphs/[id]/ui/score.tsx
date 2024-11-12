"use client";

import { Button } from "@/components/ui/button";
import * as React from "react";
import { GrPowerReset } from "react-icons/gr";

export interface ITypedScoreProps {
  result: {
    wordTyped: number;
    wordError: number;
    wpm: number;
    wa: number;
    charTyped: number;
    charError: number;
    cpm: number;
    ca: number;
    score: number;
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

export default function TypedScore({ result }: ITypedScoreProps) {
  const reset = () => {
    alert("reset score");
  };

  return (
    <div
      className=" bg-white rounded-lg px-4 py-3 flex gap-4 mt-4 h-[400px]"
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
                <span>{result.wordTyped || 0}</span>
                <span className="text-sm text-red-400">
                  ({result.wordError || 0})
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
                {result.wa || 0}%{" "}
                {/* <span className="text-xs text-red-400">
                  {100 - result.wa || 0}%
                </span> */}
              </p>
            </div>
            <div className="">
              <p className="text-sm text-gray-600 mt-3">Số ký tự</p>
              <p className="font-semibold text-xl mt-2 text-center">
                <span>{result.charTyped || 0}</span>
                <span className="text-sm text-red-400">
                  ({result.charError || 0})
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
                {result.wa || 0}%{" "}
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
            onClick={() => reset()}
          >
            <GrPowerReset size={20} /> Thử lại
          </Button>
        </div>
      </div>
      <div className="flex-1"></div>
    </div>
  );
}
