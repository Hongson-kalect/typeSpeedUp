"use client";

import * as React from "react";
import { clearInterval } from "timers";
import { scrollToId } from "../libs/utils";

export interface IHomePageProps {}

let interval: number;

export default function HomePage(props: IHomePageProps) {
  const [paragraphs, setParagraphs] = React.useState(
    "Em la bup măng non, em lơn lên trong làng cách mạng, Em la bup măng non, em lơn lên trong làng cách mạng, Em la bup măng non, em lơn lên trong làng cách mạng, Em la bup măng non, em lơn lên trong làng cách mạng, Em la bup măng non, em lơn lên trong làng cách mạng"
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

  const [failCount, setFailCount] = React.useState(0);

  const resetInput = () => {
    setUserInput("");
    setWordIndex(0);
    setFailCount(0);
  };

  const [time, setTime] = React.useState(0);

  const startTyping = () => {
    interval = setInterval(() => {
      setTime(time + 1);
    }, 1000);
  };
  const onType = (value: string) => {
    setTypingWord(value);
    if (value.slice(-1) === " " || value.slice(-1) === "\n") {
      setUserInput((prev) => prev + value);
      setWordIndex(wordIndex + 1);
    }
    if (typingWord.length > value.length) {
      setFailCount(failCount + (typingWord.length - value.length));
    }
  };

  const finishTyping = () => {
    clearInterval(interval);
    setTime(0);
  };

  const typingEnd = () => {
    console.log("endtyping");
  };

  React.useEffect(() => {
    setTypingWord("");
    scrollToId("char-" + wordIndex);
    // if(wordIndex>paragraphs.length)
  }, [wordIndex]);

  React.useEffect(() => {
    resetInput();
  }, [paragraphs]);

  console.log(
    "userInputArray, paragraphsArray",
    userInputArray,
    paragraphsArray
  );

  return (
    <div className="shadow shadow-gray-700 p-4 flex-1 ">
      <textarea
        placeholder="Nhap doan van"
        value={paragraphs}
        onChange={(e) => setParagraphs(e.target.value)}
      />
      <div className="paragraphs px-2 flex flex-wrap line-clamp-3 mb-4 w-5/6 bg-blue-200 py-2 h-24 overflow-auto">
        {paragraphsArray.map((item, index) => {
          return (
            <p
              id={"char-" + index}
              className={`px-1.5 text-2xl h-10  rounded-lg ${
                wordIndex === index ? "bg-yellow-500 text-white" : ""
              } ${
                userInputArray[index]
                  ? userInputArray[index] !== item
                    ? "text-red-"
                    : ""
                  : ""
              }`}
              style={{ lineHeight: "40px" }}
              key={index}
            >
              {item.split("").map((char, charIndex) => {
                return (
                  <span
                    // id={'char-'+index+'-'+charIndex}
                    className={`${
                      userInputArray?.[index]?.[charIndex] &&
                      userInputArray?.[index]?.[charIndex] !== char
                        ? "text-red-500"
                        : ""
                    }`}
                    key={charIndex}
                  >
                    {char}
                  </span>
                );
              })}
            </p>
          );
        })}
      </div>
      <div></div>
      <div className="w-5/6">
        <textarea
          className="bg-gray-200 rounded-2xl w-full text-2xl px-3 py-1"
          style={{ wordSpacing: "6px" }}
          value={typingWord}
          onChange={(e) => onType(e.target.value)}
        />
      </div>
      <button className="px-4 py-1 rounded bg-blue-600 text-white text-lg mt-4">
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
