"use client";

import { scrollTo } from "@/app/libs/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { ResetIcon } from "@radix-ui/react-icons";
import { fail } from "assert";
import * as React from "react";
import { CiEdit } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { RiTimerLine } from "react-icons/ri";
import { ResultType } from "../../_utils/interface";
import { Textarea } from "@/components/ui/textarea";

export interface ITypingAreaProps {
  setResult: React.Dispatch<React.SetStateAction<ResultType>>;
  isShowResult: boolean;
  setIsShowResult: React.Dispatch<React.SetStateAction<boolean>>;
  setUserTyped: React.Dispatch<React.SetStateAction<string>>;
}

let timeInterval: NodeJS.Timeout;

export default function TypingArea({
  setResult,
  isShowResult,
  setIsShowResult,
  setUserTyped,
}: ITypingAreaProps) {
  const [para, setPara] = React.useState(
    "This is temp para is temp para is temp para is temp para is temp para is temp para is temp para is temp para is temp para is temp para is temp para"
  );
  const paraArr = React.useMemo(() => {
    return para.split(" ");
  }, [para]);

  const [userInput, setUserInput] = React.useState("");
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);
  const userInputArr = React.useMemo(() => userInput.split(" "), [userInput]);

  const [wordIndex, setWordIndex] = React.useState(0);
  const typingWord = React.useMemo(() => {
    return paraArr[wordIndex];
  }, [wordIndex]);

  const [time, setTime] = React.useState(0);

  const [typingVal, setTypingVal] = React.useState("");
  const wordDebounce = useDebounce(typingVal, 0);
  const [prevDebounce, setPrevDebounce] = React.useState("");
  const [isGoingNextChar, setIsGoingNextChar] = React.useState(false);

  const [isTyping, setIsTyping] = React.useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTyping) setIsTyping(true);
    const value = e.target.value;
    console.log("typingVal, value :>> ", typingVal, value);

    if (value.slice(-1) === " " || value.slice(-1) === "\n") {
      setIsGoingNextChar(true);
      setUserInput((prev) => prev + value.slice(0, value.length - 1) + " ");
      setWordIndex(wordIndex + 1);
      setTypingVal("");
    } else {
      setTypingVal(value);
    }

    // setUserInput(e.target.value);
  };

  React.useEffect(() => {
    if (isGoingNextChar) return setIsGoingNextChar(false);
    if (prevDebounce.length > wordDebounce.length) {
      setResult((prev) => ({
        ...prev,
        failChar:
          (prev?.failChar || 0) + (prevDebounce.length - wordDebounce.length),
      }));
      setPrevDebounce(wordDebounce);
    }
  }, [wordDebounce]);

  const reset = () => {
    setWordIndex(0);
    setIsTyping(false);
    setTime(0);
    if (timeInterval) clearInterval(timeInterval);
    setTypingVal("");
    setIsShowResult(false);
    setResult({
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
    inputRef.current?.removeAttribute("disabled");
    inputRef.current?.focus();
  };

  const calculateResult = () => {
    let failWord = 0,
      correctWord = 0,
      failChar = 0,
      correctChar = 0;

    paraArr.map((word, index) => {
      if (word !== userInputArr[index]) {
        failWord += 1;
        failChar += word.length;
      } else {
        correctWord += 1;
        correctChar += word.length;
      }
    });

    const wordCount = paraArr.length;
    const charCount = para.replaceAll(" ", "").length;

    const wpm = Math.floor((wordCount / (time / 60)) * 10) / 10;
    const cpm = Math.floor((charCount / (time / 60)) * 10) / 10;
    const wAccuracy = Math.floor((correctWord / wordCount) * 1000) / 10;
    const cAccuracy = Math.floor((correctChar / charCount) * 1000) / 10;
    const score =
      Math.floor(
        Math.sqrt((wordCount * charCount * wAccuracy * cAccuracy) / (time || 1))
      ) / 10;

    setResult((prev) => {
      return {
        wpm,
        time,
        cpm,
        wAccuracy,
        cAccuracy,
        score,
        failChar: prev.failChar + failChar,
        failWord,
        correctChar,
        correctWord,
      };
    });
    setUserTyped(userInput);
  };

  React.useEffect(() => {
    if (isTyping) {
      timeInterval = setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
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

  React.useEffect(() => {
    setTypingVal("");
    scrollTo("#char-" + wordIndex, ".words-wrapper");

    if (wordIndex === paraArr.length) {
      setIsShowResult(true);
      clearInterval(timeInterval);
      //disable Input / hide para / show user input
    }
  }, [wordIndex]);

  React.useEffect(() => {
    if (isShowResult) {
      calculateResult();
      setIsShowResult(true);
    }
  }, [isShowResult]);

  React.useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="typing mt-1 bg-red rounded-lg w-full flex-1 p-4 flex flex-col h-full">
      <div className="flex items-end justify-between">
        <div className="flex gap-2 items-center">
          <p className="text-gray-600">Tiếng Việt</p>
          <CiEdit size={18} />
          <Button onClick={() => setIsShowResult(!isShowResult)}>
            Toogle Result
          </Button>
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
      <div
        className={`pt-3 bg-blue-50 overflow-hidden duration-500 relative ${
          isShowResult ? "h-0 min-h-0" : "h-[200px]"
        }`}
      >
        <div
          className={`min-h-[200px] h-full overflow-y-hidden words-wrapper px-6 py-2 shadow shadow-blue-100 duration-200 `}
        >
          <div
            className=" items-start justify-start text-2xl flex flex-wrap overflow-auto pb-10 px-2"
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
                  <div className="relative inline">
                    {item.split("").map((char, charIndex) => (
                      <span
                        className={` ${
                          typingVal?.[charIndex] === undefined
                            ? "text-black"
                            : typingVal?.[charIndex] !== char
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
                        <p className="h-8">
                          {typingVal}
                          <span className="text-gray-400">_</span>
                        </p>
                        {/* <p className="mt-2 text-center text-gray-500 text-xs">
                        <span>combo</span>
                        <span className="text-gray-300">x2</span>
                      </p> */}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  item
                )}
              </div>
            ))}
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
}

export const Timer = ({ time }: { time: number }) => {
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
