"use client";
import * as React from "react";
import { scrollToId } from "../libs/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { wordRate, words } from "./utils/const";

export interface ISpeedTestProps {}

const Timer = ({ time }) => {
  const formatTime = (t) =>
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
      <p>Time: </p>
      <p id="time">{formatTime(time)}</p>
    </div>
  );
};

const Paragraphs = ({
  paragraphsArray,
  userInputArray,
  wordIndex,
  typingWord,
}) => (
  <div className="paragraphs px-2 flex flex-wrap rounded-xl line-clamp-3 mb-4 w-5/6 bg-blue-200 py-2 h-24 overflow-hidden">
    {paragraphsArray.map((item, index) => (
      <div
        id={"char-" + index}
        className={`px-1.5 text-2xl h-10  rounded-lg ${
          wordIndex === index ? "bg-yellow-300 text-white" : ""
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
        {index === wordIndex ? (
          <div className="relative">
            {item.split("").map((char, charIndex) => (
              <span
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
            ))}
            <p className="absolute left-0 -bottom-10 bg-black text-white">
              {typingWord}
            </p>
          </div>
        ) : (
          item
        )}
      </div>
    ))}
  </div>
);

const Score = ({ result }) => (
  <div className="mt-4" id="type-score">
    <p>Kết quả của bạn là:</p>
    <div className="flex gap-8 items-center">
      <div>
        <div className="flex gap-2 items-center">
          <div className="text-sm text-gray-600">WPM: </div>
          <p className="text-lg font-medium text-green-700">{result.wpm}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm text-gray-600">CPM: </div>
          <p className="text-lg font-medium text-green-700">{result.cpm}</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm text-gray-600">Word Accurate: </div>
          <p className="text-lg font-medium text-green-700">
            {result.wAccuracy}%
          </p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="text-sm text-gray-600">Char Accurate: </div>
          <p className="text-lg font-medium text-green-700">
            {result.cAccuracy}%
          </p>
        </div>
      </div>
      <div className="w-32 text-center">
        <div className="text-gray-600 text-left"> Điểm số:</div>
        <div className="text-5xl mt-4">{result.score}</div>
      </div>
    </div>
  </div>
);

const SpeedTest = (props: ISpeedTestProps) => {
  const [paragraphs, setParagraphs] = React.useState("");
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
  const [isShowScore, setIsShowScore] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const [result, setResult] = React.useState({
    wpm: 0,
    cpm: 0,
    wAccuracy: 0,
    cAccuracy: 0,
    score: 0,
  });
  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  const resetType = () => {
    inputRef.current?.removeAttribute("disabled");
    setParagraphs("");
    setUserInput("");
    setTime(60);
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
      setUserInput((prev) => prev + value.slice(0, value.length - 1) + " ");
      setWordIndex(wordIndex + 1);
      setIsNextWord(true);
    }
  };

  const caculScore = () => {
    let charFail = failCount;
    let wordFail = 0;
    paragraphsArray.map((word, index) => {
      if (word !== userInputArray[index]) {
        charFail += word.length;
        wordFail += 1;
      }
    });
    charFail = Math.min(charFail, paragraphs.length);
    const wpm = Math.floor(paragraphsArray.length / (time / 60));
    const cpm = Math.floor((paragraphs.length / time) * 60);
    const wAccuracy =
      Math.floor(
        ((paragraphsArray.length - wordFail) / paragraphsArray.length) * 10000
      ) / 100;
    const cAccuracy =
      Math.floor(((paragraphs.length - charFail) / paragraphs.length) * 10000) /
      100;
    const score =
      Math.floor(
        Math.sqrt(
          (paragraphs.length *
            (paragraphs.length - failCount) *
            wAccuracy *
            cAccuracy) /
            (time || 1)
        )
      ) / 10;
    setResult({ wpm, cpm, wAccuracy, cAccuracy, score });
  };

  const startTyping = () => {
    setIsShowScore(false);
    setIsTyping(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (!prev) {
          finishTyping();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const finishTyping = () => {
    caculScore();
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    inputRef.current?.setAttribute("disabled", "disabled");
    setIsShowScore(true);
  };

  const getWord = () => {
    const type = "basic";
    //type này sẽ lấy từ settings

    let addWord = "";
    console.log("ua gi do");
    while (addWord.split(" ").length < 100) {
      const gacha = Math.floor(Math.random() * 100);
      let wordType = "";
      Object.entries(wordRate[type]).map(([key, value]) => {
        if (value >= gacha) wordType = key;
      });

      const wordLib = words.vi?.[wordType] || [];

      const wordIndex = Math.floor(Math.random() * wordLib.length);

      if (wordType === "baseSpe" || wordType === "advanceSpe")
        addWord += wordLib[wordIndex];
      else {
        addWord += " " + wordLib[wordIndex];
      }
      console.log(addWord);
    }

    return addWord.trim();
  };

  console.log("paragraphArray, paragraphs", paragraphsArray, paragraphs);
  React.useEffect(() => {
    console.log("vao day");
    if (paragraphsArray.length <= wordIndex + 50) {
      console.log("vao cho nay");
      const addText = getWord();
      console.log("addText", addText);
      setParagraphs(addText);
    }
  }, [paragraphsArray, wordIndex]);

  React.useEffect(() => {
    setPrevDebounce(wordDebounce);
    if (isTyping) {
      if (isNextWord) return setIsNextWord(false);
      if (prevDebounce.length > wordDebounce.length) {
        setFailCount(failCount + (prevDebounce.length - wordDebounce.length));
      }
    }
  }, [wordDebounce]);

  React.useEffect(() => {
    if (wordIndex > paragraphsArray.length - 1) finishTyping();
    setTypingWord("");
    scrollToId("char-" + wordIndex);
  }, [wordIndex]);

  // React.useEffect(() => {
  //   resetType();
  // }, [paragraphs]);

  React.useEffect(() => {
    // resetType();
    inputRef.current?.focus();
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="shadow shadow-gray-700 p-4 flex-1">
      <Timer time={time} />
      <Paragraphs
        paragraphsArray={paragraphsArray}
        userInputArray={userInputArray}
        wordIndex={wordIndex}
        typingWord={typingWord}
      />
      <div className="flex gap-4 items-center justify-center my-8">
        <div className="w-122">
          <textarea
            ref={inputRef}
            className="bg-gray-100 disabled:bg-gray-300 rounded-lg w-full text-2xl px-3 py-1 resize-none h-10"
            style={{ wordSpacing: "6px" }}
            value={typingWord}
            onChange={(e) => onType(e.target.value)}
          />
        </div>
        <button
          className="px-4 py-1 rounded bg-blue-600 text-white text-lg"
          onClick={resetType}
        >
          reset
        </button>
      </div>
      <div className="flex justify-center">
        {isShowScore ? <Score result={result} /> : null}
      </div>
      <div className="mt-4">
        <p>Ban da go:</p>
        <p>{userInput}</p>
        {result.wpm}
      </div>
    </div>
  );
};

export default SpeedTest;
