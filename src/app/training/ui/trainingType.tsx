"use client";

import Keyboard from "@/components/custom/keyboard";
import * as React from "react";
import { ResultType } from "@/app/paragraphs/_utils/interface";
import { KeyResultType } from "./types";
import { TypeArea } from "./components/TypeArea";
import { ResultArea } from "./components/ResultArea";

export interface ITrainingTypeProps {
  content: string;
}

export default function TrainingType(props: ITrainingTypeProps) {
  const [typingChar, setTypingChar] = React.useState<string | null | undefined>(
    ""
  );
  const [result, setResult] = React.useState<ResultType>({
    wpm: 0,
    time: 0,
    cpm: 0,
    wAccuracy: 0,
    cAccuracy: 0,
    score: 0,
    failChar: 0,
    failWord: 0,
    correctChar: 0,
    correctWord: 0,
  });
  const [keyResult, setKeyResult] = React.useState<KeyResultType[]>([]);
  const [typed, setTyped] = React.useState<string>("");

  return (
    <div>
      Training type
      <div className="flex gap-2 w-full">
        <div className="bg-white flex-[2] p-2 shadow rounded-lg">
          <TypeArea
            content={props.content}
            setTypingChar={setTypingChar}
            setResult={setResult}
            setKeyResult={setKeyResult}
            setTyped={setTyped}
          />
        </div>
        <Keyboard char={typingChar} />
      </div>
      <div className="flex gap-2 mt-4 w-full">
        <ResultArea
          content={props.content}
          result={result}
          keyResult={keyResult}
          typed={typed}
        />
        <div className="bg-white flex-1 shadow rounded-lg p-2">Type detail</div>
      </div>
    </div>
  );
}