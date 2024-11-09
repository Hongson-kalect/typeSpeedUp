"use client";

import { useDebounce } from "@/hooks/useDebounce";
import { fail } from "assert";
import * as React from "react";
import { CiEdit } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { RiTimerLine } from "react-icons/ri";

export interface ITypingAreaProps {}

export default function TypingArea(props: ITypingAreaProps) {
  const [para, setPara] = React.useState(
    "This is temp para just using for test purpose, please use real para in the real game"
  );
  const paraArr = React.useMemo(() => {
    return para.split(" ");
  }, [para]);

  const [userInput, setUserInput] = React.useState("");
  const userInputArr = React.useMemo(() => userInput.split(" "), [userInput]);

  const [wordIndex, setWordIndex] = React.useState(0);
  const typingWord = React.useMemo(() => {
    return paraArr[wordIndex];
  }, [wordIndex]);

  const [time, setTime] = React.useState(0);

  const [typingVal, setTypeVal] = React.useState("");
  const wordDebounce = useDebounce(typingVal, 0);
  const [prevDebounce, setPrevDebounce] = React.useState("");

  const [isTyping, setIsTyping] = React.useState(false);
  const [isShowResult, setIsShowResult] = React.useState(false);

  const [result, setResult] = React.useState({
    wpm: 0,
    cpm: 0,
    accuracy: 0,
    score: 0,
    failChar: 0,
    failWord: 0,
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isTyping) setIsTyping(true);
    const value = e.target.value;

    if (value.slice(-1) === " " || value.slice(-1) === "\n") {
      setUserInput((prev) => prev + value.slice(0, value.length - 1) + " ");
      setWordIndex(wordIndex + 1);
      setTypeVal("");
    } else {
      if (typingVal.length > value.length) {
        setResult({
          ...result,
          failChar: result.failChar + (typingVal.length - value.length),
        });
      }
      setTypeVal(value);
    }

    setUserInput(e.target.value);
  };

  React.useEffect(() => {
    if (isTyping) {
    } else {
    }
  }, [isTyping]);

  React.useEffect(() => {
    setPrevDebounce(wordDebounce);

    // if (isTyping) {
    //   if (isNextWord) return setIsNextWord(false);
    //   if (prevDebounce.length > wordDebounce.length) {
    //     setFailCount(failCount + (prevDebounce.length - wordDebounce.length));
    //   } else if (prevDebounce.length < wordDebounce.length) {
    //     setTypedCharCount(typedCharCount + 1);
    //   }
    // }
  }, [wordDebounce]);

  return (
    <div className="typing mt-1 bg-red rounded-lg w-full min-h-[400px] flex-1 p-4">
      <div className="flex items-end justify-between">
        <div className="flex gap-2 items-center">
          <p className="text-gray-600">Tiếng Việt</p>
          <CiEdit size={18} />
        </div>
        <div className="setting flex items-end gap-1">
          <IoSettingsOutline size={20} className="text-gray-500 mb-1" />
          <p className="h-7 rounded-lg bg-green-500 text-white px-3 mb-1 flex items-center justify-center">
            Dễ
          </p>
          <RiTimerLine size={20} className="text-gray-500 ml-2 mb-1" />
          <Timer time={time} />
        </div>
      </div>
      <div className="h-[120px] overflow-y-hidden words-wrapper px-6 py-2 bg-blue-50 shadow shadow-blue-100">
        <div
          className="text-2xl flex flex-wrap overflow-auto "
          style={{ wordSpacing: "8px" }}
        >
          <div id="first-word"></div>
          {paraArr.map((item, index) => (
            <div
              id={"char-" + index}
              className={`px-1.5 text-2xl h-9 pb-1 inline rounded-lg ${
                wordIndex === index ? "bg-yellow-200 text-white" : ""
              } ${
                userInputArr[index] !== undefined
                  ? userInputArr[index] !== item
                    ? "text-red-400"
                    : "text-green-700"
                  : ""
              }`}
              // style={{ lineHeight: "40px" }}
              key={index}
            >
              {index === wordIndex ? (
                <p className="relative inline">
                  {item.split("").map((char, charIndex) => (
                    <span
                      className={` ${
                        typingWord?.[charIndex] === undefined
                          ? "text-black"
                          : typingWord?.[charIndex] !== char
                          ? "text-red-500"
                          : "text-green-600"
                      }`}
                      key={charIndex}
                    >
                      {char}
                    </span>
                  ))}
                  {isTyping ? (
                    <div className=" px-4 mx-auto rounded-xl absolute z-10 text-2xl  top-8 -left-4 bg-black box-content  min-w-full box text-white">
                      <p className="h-6">
                        {typingWord}
                        <span className="text-gray-400">_</span>
                      </p>
                      <p className="mt-2 text-center text-gray-500 text-xs">
                        <span>combo</span>
                        <span className="text-gray-300">x2</span>
                      </p>
                    </div>
                  ) : null}
                </p>
              ) : (
                item
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const Timer = ({ time }: { time: number }) => {
  const formatTime = (t: number) =>
    `${
      Math.floor(t / 3600)
        ? Math.floor(t / 3600)
            .toString()
            .padStart(2, "0") + ":"
        : ""
    }${Math.floor((t % 3600) / 60)
      .toString()
      .padStart(2, "0")}:${(t % 60).toString().padStart(2, "0")}`;
  return (
    <div className="flex items-center gap-2">
      <p id="time">{formatTime(time)}</p>
    </div>
  );
};
