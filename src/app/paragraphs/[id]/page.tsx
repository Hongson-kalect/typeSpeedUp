import * as React from "react";
import TypingArea from "./ui/typing";

export interface IParaInfoPageProps {}

export default function ParaInfoPage(props: IParaInfoPageProps) {
  return (
    <div className="flex h-full w-full">
      <div className="flex-1 px-6 py-4 flex-col flex">
        <h2 className="text-xl font-semibold text-gray-600">
          Chapter 1: Thế giới này thật thú vị
        </h2>
        <div className="typing mt-1 bg-white rounded-lg w-full min-h-[400px] flex-1">
          <TypingArea />
        </div>
        <div className="result mt-4 bg-white rounded-lg w-full h-[400px]"></div>
      </div>
      <div className="w-[400px] h-full px-2 py-4 flex-col flex">
        <div className="options bg-white rounded-lg w-full h-[400px]"></div>
        <div className="ranking mt-4 bg-white rounded-lg w-full flex-1"></div>
      </div>
    </div>
  );
}
