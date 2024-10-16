"use client";

import * as React from "react";
import { scrollToId } from "../libs/utils";
import { useDebounce } from "@/hooks/useDebounce";

export interface IHomePageProps {}

export default function HomePage(props: IHomePageProps) {
  const [paragraphs, setParagraphs] = React.useState(
    "Em la bup măng non, em lơn lên trong làng cách mạng"
  );
  const paragraphsArray = React.useMemo(() => {
    return paragraphs.split(/[ \n]+/);
  }, [paragraphs]);

  const [userInput, setUserInput] = React.useState("");
  const userInputArray = React.useMemo(() => {
    return userInput.split(" ");
  }, [userInput]);
  const [wordIndex, setWordIndex] = React.useState(0);
  const [typingWord, setTypingWord] = React.useState("");
  const wordDebounce = useDebounce(typingWord, 10);
  const [prevDebounce, setPrevDebounce] = React.useState("");
  const [failCount, setFailCount] = React.useState(0);
  const [time, setTime] = React.useState(0);

  const [isNextWord, setIsNextWord] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  const resetType = () => {
    inputRef.current?.setAttribute("disabled", "");
    setUserInput("");
    setWordIndex(0);
    setFailCount(0);
    setIsTyping(false);
    setTypingWord("");
    inputRef.current?.focus();
  };

  const onType = (value: string) => {
    if (!isTyping) startTyping();

    setTypingWord(value);
    if (value.slice(-1) === " " || value.slice(-1) === "\n") {
      setUserInput((prev) => prev + value);
      setWordIndex(wordIndex + 1);
      setIsNextWord(true);
    }
  };

  const startTyping = () => {
    setTime(0);
    setIsTyping(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        console.log(time);
        return prev + 1;
      });
    }, 1000);
  };

  const finishTyping = () => {
    console.log("end type, get score");
    console.log("interval :>> ", intervalRef.current);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    inputRef.current?.setAttribute("disabled", "disabled");
  };

  const typingEnd = () => {
    console.log("endtyping");
  };

  React.useEffect(() => {
    setPrevDebounce(wordDebounce);
    if (isTyping) {
      if (isNextWord) return setIsNextWord(false);
      console.log(
        "prevDebounce, wordDebounce :>> ",
        prevDebounce,
        wordDebounce
      );

      if (prevDebounce.length > wordDebounce.length) {
        setFailCount(failCount + (prevDebounce.length - wordDebounce.length));
      }
    }
  }, [wordDebounce]);

  React.useEffect(() => {
    if (wordIndex > paragraphsArray.length - 1) finishTyping();
    setTypingWord("");
    scrollToId("char-" + wordIndex);
    // if(wordIndex>paragraphs.length)
  }, [wordIndex]);

  React.useEffect(() => {
    resetType();
  }, [paragraphs]);

  React.useEffect(() => {
    resetType();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // console.log("interval :>> ", intervalRef.current);

  return (
    <div className="shadow shadow-gray-700 p-4 flex-1 ">
      <p id="time">{`${
        Math.floor(time / 3600)
          ? Math.floor(time / 3600)
              .toString()
              .padStart(2, "0") + ":"
          : ""
      }${Math.floor((time % 3600) / 60)
        .toString()
        .padStart(2, "0")}:${(time % 60)
        .toString()
        .padStart(2, "0")} ${time}`}</p>
      <div className="paragraphs px-2 flex flex-wrap line-clamp-3 mb-4 w-5/6 bg-blue-200 py-2 h-24 overflow-auto">
        {paragraphsArray.map((item, index) => {
          return (
            <p
              id={"char-" + index}
              className={`px-1.5 text-2xl h-10  rounded-lg ${
                wordIndex === index ? "bg-yellow-500 text-white" : ""
              } ${
                userInputArray[index] !== undefined
                  ? userInputArray[index] !== item
                    ? "text-red-400"
                    : "text-green-600"
                  : ""
              }`}
              style={{ lineHeight: "40px" }}
              key={index}
            >
              {index === wordIndex
                ? item.split("").map((char, charIndex) => {
                    return (
                      <span
                        // id={'char-'+index+'-'+charIndex}
                        className={`${
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
                    );
                  })
                : item}
            </p>
          );
        })}
      </div>
      <div></div>
      <div className="w-5/6">
        <input
          ref={inputRef}
          className="bg-gray-200 rounded-2xl w-full text-2xl px-3 py-1"
          style={{ wordSpacing: "6px" }}
          value={typingWord}
          onChange={(e) => onType(e.target.value)}
        />
      </div>
      <button
        className="px-4 py-1 rounded bg-blue-600 text-white text-lg mt-4"
        onClick={resetType}
      >
        reset
      </button>
      <div className="score-place">
        <div>Sai so: {failCount}</div>
        <div>Ori: {paragraphs}</div>
        <div>Cop: {userInput}</div>
      </div>
    </div>
  );
}
