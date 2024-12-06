"use client";

import { scrollTo } from "@/app/libs/utils";
import { ResultType } from "@/app/paragraphs/_utils/interface";
import Keyboard from "@/components/custom/keyboard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/useDebounce";
import { useMainStore } from "@/layouts/main.store";
import { formatString } from "@/lib/utils";
import { ResetIcon } from "@radix-ui/react-icons";
import axios from "axios";
import * as React from "react";
import { useTrainingStore } from "../_utils/store";
import { calculateKeyResults, calculateScore } from "../_utils/util";

export interface ITrainingTypeProps {
  content: string;
}

export type KeyResultType = {
  char: string;
  total: number;
  accuracy: number;
};

let timeInterval: NodeJS.Timeout;

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
      <p>{props.content}</p>
      <div className="flex gap-2 w-full">
        <div className="bg-white flex-[2] p-2 shadow rounded-lg">
          <TypeArea
            setTypingChar={setTypingChar}
            setResult={setResult}
            setKeyResult={setKeyResult}
            setTyped={setTyped}
          />
        </div>
        <Keyboard char={typingChar} />
        {/* <KeyboardGuide typingChar={typingChar} /> */}
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

type TypeAreaProps = {
  setTypingChar: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  setResult: React.Dispatch<React.SetStateAction<ResultType>>;
  setKeyResult: React.Dispatch<React.SetStateAction<KeyResultType[]>>;
  setTyped: React.Dispatch<React.SetStateAction<string>>;
};

const TypeArea = (props: TypeAreaProps) => {
  const [content] = React.useState(
    "aSdA sddd aasa sdsa sdasd lkjl kjj jjkj lklk jhh klkjl"
  );
  const { userInfo } = useMainStore();
  const paraArr = React.useMemo(() => {
    return formatString(content).split(" ");
  }, []);
  const { selectedTraining } = useTrainingStore();

  const [isShowResult, setIsShowResult] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isNextWord, setIsNextWord] = React.useState(false);

  const [wordIndex, setWordIndex] = React.useState(0);
  const [time, setTime] = React.useState(0);

  const [userInput, setUserInput] = React.useState("");
  const [userInputArr, setUserInputArr] = React.useState<string[]>([]);
  const [typingVal, setTypingVal] = React.useState("");
  const wordDebounce = useDebounce(typingVal, 0);
  const [prevWordDebounce, setPrevWordDebounce] = React.useState("");

  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTyping) setIsTyping(true);

    const value = e.target.value;
    if (value.slice(-1) === " " || value.slice(-1) === "\n") {
      setIsNextWord(true);
      setWordIndex(wordIndex + 1);
      setTypingVal("");
    } else {
      setTypingVal(value);
    }
  };

  const reset = () => {
    setWordIndex(0);
    setIsTyping(false);
    setTypingVal("");
    setIsShowResult(false);
    setTime(0);
    if (timeInterval) clearInterval(timeInterval);
    props.setResult({
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
    setUserInput("");
    setUserInputArr([]);
    inputRef.current?.removeAttribute("disabled");
    inputRef.current?.focus();
  };

  const caculScore = async () => {
    await calculateScore({
      content,
      paraArr,
      userInputArr,
      time,
      setResult: props.setResult,
      setTyped: props.setTyped,
      userId: userInfo?.id,
      selectedTrainingId: selectedTraining?.id,
    });

    calculateKeyResults({
      paraArr,
      userInputArr,
      setKeyResult: props.setKeyResult,
    });
  };

  React.useEffect(() => {
    if (isNextWord) {
      setIsNextWord(false);
      // setTypingVal("");
      setPrevWordDebounce("");
      return;
    }
    if (prevWordDebounce.length > wordDebounce.length) {
      props.setResult((prev) => ({
        ...prev,
        failChar:
          (prev?.failChar || 0) +
          (prevWordDebounce.length - wordDebounce.length),
      }));
    }
    setPrevWordDebounce(wordDebounce);

    userInputArr[wordIndex] = wordDebounce;
    setUserInputArr([...userInputArr]);
  }, [wordDebounce]);

  React.useEffect(() => {
    scrollTo("#char-" + wordIndex, ".words-wrapper");
    if (wordIndex >= paraArr.length) {
      caculScore();
      setIsTyping(false);
      setIsShowResult(true);
      clearInterval(timeInterval);
      inputRef.current?.setAttribute("disabled", "disabled");
    }
  }, [wordIndex]);

  React.useEffect(() => {
    if (typingVal === paraArr[wordIndex]?.slice(0, typingVal.length)) {
      const nextChar = paraArr[wordIndex][typingVal.length];
      if (nextChar) props.setTypingChar(nextChar);
      else props.setTypingChar(undefined);
    } else {
      props.setTypingChar(null);
    }
  }, [typingVal, wordIndex]);

  React.useEffect(() => {
    if (isTyping) {
      timeInterval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }
  }, [isTyping]);

  return (
    <div className="typing mt-1 bg-white rounded-lg w-full flex-1 p-4 flex flex-col h-full">
      <div
        className={`pt-3 bg-blue-50 overflow-hidden duration-500 relative ${
          isShowResult ? "h-0 min-h-0" : "h-[200px]"
        }`}
      >
        <div
          className={`min-h-[200px] h-full overflow-y-hidden words-wrapper px-6 py-2 shadow duration-200 `}
        >
          <div
            className=" items-start justify-start text-2xl flex flex-wrap overflow-auto pb-10 px-2"
            style={{ wordSpacing: "8px" }}
          >
            <div id="first-word"></div>
            {paraArr.map((item, index) => {
              const origin = paraArr[index];
              const userInput = userInputArr[index];
              return (
                <div
                  id={"char-" + index}
                  className={`px-1.5 text-2xl h-9 pb-1 inline rounded-lg ${
                    wordIndex === index ? "bg-yellow-200" : ""
                  } ${
                    !userInputArr[index]
                      ? userInputArr[index] !== item
                        ? "text-red-400"
                        : "text-green-700"
                      : ""
                  }`}
                  // style={{ lineHeight: "40px" }}
                  key={index}
                >
                  {index === wordIndex ? (
                    <div className="relative inline">
                      {item.split("").map((char, charIndex) => {
                        return (
                          <span
                            className={` ${
                              !userInput?.[charIndex]
                                ? "text-black"
                                : userInput?.[charIndex] !== char
                                ? "text-red-500"
                                : "text-green-600"
                            }`}
                            key={charIndex}
                          >
                            {char}
                          </span>
                        );
                      })}
                      {isTyping ? (
                        <div className=" px-4 mx-auto rounded-xl absolute z-10 text-2xl  top-8 -left-4 bg-black box-content  min-w-full box text-white">
                          <p className="h-8">
                            {typingVal}
                            <span className="text-gray-400">_</span>
                          </p>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <div className="inline">
                      {item.split("").map((char, charIndex) => {
                        return (
                          <span
                            className={` ${
                              userInputArr?.[index] === undefined
                                ? "text-black"
                                : userInput?.[charIndex] !== char
                                ? "text-purple-500"
                                : "text-green-600"
                            }`}
                            key={charIndex}
                          >
                            {char}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          <div className="h-full"></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ffffff88] to-[#ffffffff] "></div>
      </div>

      <div className="input mt-4 flex items-center justify-center gap-8 p-2">
        <Textarea
          disabled={isShowResult}
          rows={1}
          ref={inputRef}
          value={typingVal}
          onChange={handleInput}
          spellCheck={false}
          className=" flex items-center justify-center pt-3 shadow-inner resize-none bg-gray-100 focus:bg-white shadow-gray-500 h-12 w-[320px] text-2xl font-medium focus:shadow-blue-950 focus:shadow-md focus:-translate-y-1 duration-200 focus:border disabled:cursor-not-allowed disabled:bg-gray-300 disabled:opacity-70  text-center"
        />
        <div className="flex flex-col items-center justify-center relative">
          <Button
            onClick={reset}
            size={"lg"}
            className="bg-green-500 hover:bg-green-700  text-white"
          >
            <ResetIcon />
            Reset
          </Button>
          <p className="text-gray-500 text-sm font-light absolute -bottom-5">
            {"Or just F5"}
          </p>
        </div>
      </div>
    </div>
  );
};

const ResultArea = ({
  content,
  typed,
  result,
  keyResult,
}: {
  content: string;
  typed: string;
  result: ResultType;
  keyResult: KeyResultType[];
}) => {
  const contentArr = React.useMemo(() => {
    return content.split(" ");
  }, [content]);
  const userInputArr = React.useMemo(() => {
    return typed.split(" ");
  }, [typed]);

  const correctChar = React.useMemo(() => {
    return keyResult.reduce((acc, curr) => acc + curr.accuracy, 0);
  }, [keyResult]);
  const totalChar = React.useMemo(() => {
    return keyResult.reduce((acc, curr) => acc + curr.total, 0);
  }, [keyResult]);
  const charRate = React.useMemo(() => {
    return (correctChar / totalChar) * 100;
  }, [correctChar, result]);

  const totalWord = React.useMemo(() => {
    return result.correctWord + result.failWord;
  }, [result]);
  const wordRate = React.useMemo(() => {
    return (result.correctWord / totalWord) * 100;
  }, [result, totalWord]);

  const renderAccuracyBar = (accuracy: number, total: number) => {
    const percentage = (accuracy / total) * 100;

    return (
      <div className="flex items-center gap-2 flex-1">
        <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-600 w-16 text-right">
          {percentage.toFixed(1)}%
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white flex-1 shadow rounded-lg p-2">
      <h2 className="font-bold text-lg">Result</h2>

      <div className="flex items-center justify-between gap-4">
        <div className="relative shadow-sm shadow-gray-600 rounded-lg flex-1 p-2 pb-4 mt-3 text-center">
          <div className="flex justify-between items-center">
            <p className="text-sm p-2 text-gray-600 bg-white">WORD</p>
            <p className={`text-right text-sm opacity-70 font-semibold`}>
              <span
                className={`text-normal py-3 ${
                  wordRate >= 50 ? "text-green-600" : "text-red-500"
                }`}
              >
                {result.correctWord}
              </span>{" "}
              / {totalWord}
            </p>
          </div>

          <p
            className={`text-xl font-medium ${
              wordRate >= 50 ? "text-green-600" : "text-red-500"
            }`}
          >
            {wordRate.toFixed(2)}%
          </p>
          {/* <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#ffffff88] to-[#ffffffff] "></div> */}
        </div>
        <div className="relative shadow-sm shadow-gray-600 rounded-lg flex-1 p-2 pb-4 mt-3 text-center">
          <div className="flex justify-between items-center">
            <p className="text-sm p-2 text-gray-600 bg-white">CHAR</p>
            <p className={`text-right text-sm opacity-70 font-semibold`}>
              <span
                className={`text-normal py-3 ${
                  charRate >= 50 ? "text-green-600" : "text-red-500"
                }`}
              >
                {correctChar}
              </span>{" "}
              / {totalChar}
            </p>
          </div>

          <p
            className={`text-xl font-medium ${
              charRate >= 50 ? "text-green-600" : "text-red-500"
            }`}
          >
            {charRate.toFixed(2)}%
          </p>
        </div>
        <div className="relative shadow-sm shadow-gray-600 rounded-lg flex-1 p-2 pb-4 mt-3 text-center">
          <div className="flex justify-between items-center">
            <p className="text-sm p-2 text-gray-600 bg-white">TIME</p>
          </div>

          <p className={`text-xl font-medium text-gray-600`}>{result.time}</p>
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Các từ đã gõ:</h3>
        <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg">
          {userInputArr.map((word, index) => {
            let wordLeft = "";
            const originWord = contentArr[index];

            if (originWord?.length > word?.length)
              wordLeft = originWord.slice(word.length);

            return (
              <div
                key={index}
                className={`${
                  word === originWord ? "bg-green-100" : "bg-red-100"
                }`}
              >
                {word.split("").map((char, charIndex) => {
                  const originChar = originWord?.[charIndex];

                  return (
                    <span
                      key={charIndex}
                      className={`px-2 py-1 rounded ${
                        char === originChar
                          ? "bg-green-100 text-green-700" // Từ đúng
                          : "bg-red-100 text-red-700" // Từ sai
                      }`}
                    >
                      {char}
                    </span>
                  );
                })}
                <span className="text-gray-300 italic">{wordLeft}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-4">
        <h3 className="font-semibold mb-2">Thống kê phím:</h3>
        <div className="grid grid-cols-1 gap-1">
          {keyResult.map((key, index) => (
            <div
              key={index}
              className="px-1 bg-gray-50 rounded-lg flex items-center gap-3"
            >
              <span className="font-bold w-6 text-center">{key.char}</span>
              {renderAccuracyBar(key.accuracy, key.total)}
              <span className="text-xs text-gray-500">
                ({key.accuracy}/{key.total})
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};