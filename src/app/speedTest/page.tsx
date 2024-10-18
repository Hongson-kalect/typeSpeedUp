"use client";
import * as React from "react";
import { scrollToId } from "../libs/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { wordRate, words } from "./utils/const";
import { CiEdit } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";

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
  const [initTime, setInitTime] = React.useState(30);
  const [time, setTime] = React.useState(initTime);
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
    setTime(initTime);
    setWordIndex(0);
    setFailCount(0);
    setIsTyping(false);
    setTypingWord("");
    inputRef.current?.focus();
  };

  const startTyping = () => {
    setIsTyping(true);
    intervalRef.current = setInterval(() => {
      setTime((prev) => {
        if (!prev) {
          if (intervalRef.current) clearInterval(intervalRef.current);
          return 0;
        } else {
          return prev - 1;
        }
      });
    }, 1000);
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

    const typedWordArray = paragraphsArray.slice(0, wordIndex - 1);
    const typedWord = typedWordArray.join("");
    typedWordArray.map((word, index) => {
      if (word !== userInputArray[index]) {
        charFail += word.length;
        wordFail += 1;
      }
    });
    charFail = Math.min(charFail, typedWord.length);
    const wpm = Math.floor(typedWordArray.length / (initTime / 60));
    const cpm = Math.floor((typedWord.length / initTime) * 60);
    const wAccuracy =
      Math.floor(
        ((typedWordArray.length - wordFail) / typedWordArray.length) * 10000
      ) / 100;
    const cAccuracy =
      Math.floor(((typedWord.length - charFail) / typedWord.length) * 10000) /
      100;
    const score =
      Math.floor(
        Math.sqrt(
          (typedWord.length *
            (typedWord.length - failCount) *
            wAccuracy *
            cAccuracy) /
            (initTime || 1)
        )
      ) / 10;
    setResult({ wpm, cpm, wAccuracy, cAccuracy, score });
  };

  const finishType = () => {
    setIsTyping(false);
    caculScore();

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    inputRef.current?.setAttribute("disabled", "disabled");

    setIsShowScore(true);
  };

  const getWord = () => {
    const type = "basic"; //basic normal extreme master
    //type này sẽ lấy từ settings

    let addWord = "";
    while (addWord.split(" ").length < 10) {
      const gacha = Math.floor(Math.random() * 100);
      let wordType = "";
      const selectedWordType = Object.entries(wordRate[type]).find(
        ([key, value]) => {
          return value >= gacha;
        }
      );

      if (selectedWordType) wordType = selectedWordType[0];

      console.log("wordType :>> ", wordType);

      const wordLib = words.vi?.[wordType] || [];

      const wordIndex = Math.floor(Math.random() * wordLib.length);

      if (wordType === "baseSpe" || wordType === "advanceSpe")
        addWord += wordLib[wordIndex];
      else {
        addWord += " " + wordLib[wordIndex];
      }
      console.log(
        "wordType, wordLib[wordIndex] :>> ",
        wordType,
        wordLib[wordIndex]
      );
    }

    return addWord.trim();
  };

  React.useEffect(() => {
    if (isTyping && !time) {
      finishType();
    }
  }, [time, isTyping]);

  React.useEffect(() => {
    if (paragraphsArray.length <= wordIndex + 50) {
      const addText = getWord();
      setParagraphs((prev) => {
        if (prev) return prev + " " + addText;
        else return addText;
      });
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
    <div className="shadow shadow-gray-700 p-4 flex-1 px-6 overflow-auto">
      <h2 className="text-3xl font-bold mt-4">Kiểm tra tốc độ gõ</h2>

      <div
        className="bg-white px-6 py-5 rounded-lg mt-4"
        style={{ border: "2px solid #D8D8D8" }}
      >
        <div className="flex gap-2 items-center">
          <p className="text-gray-600">Tiếng Việt</p>
          <CiEdit size={18} />
        </div>

        <div className="h-[120px] overflow-hidden bg-[#f8f8f8] px-4 py-3 rounded-lg  shadow-sm shadow-gray-300 relative">
          <div
            className="line-clamp-3 text-2xl flex flex-wrap"
            style={{ wordSpacing: "8px" }}
          >
            {paragraphsArray.map((item, index) => (
              <div
                id={"char-" + index}
                className={`px-1.5 text-2xl h-9 pt-1 inline rounded-lg ${
                  wordIndex === index ? "bg-yellow-300 text-white" : ""
                } ${
                  userInputArray[index] !== undefined
                    ? userInputArray[index] !== item
                      ? "text-red-400"
                      : "text-green-600"
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
                    <p className="text-center px-4 mx-auto rounded-xl absolute z-10 text-3xl  -bottom-12 bg-black text-white">
                      {typingWord}
                    </p>
                  </p>
                ) : (
                  item
                )}
              </div>
            ))}
          </div>

          <div className="absolute top-14 right-0 left-0 h-16 bg-[#ffffffaa]"></div>
        </div>

        <div className="flex gap-8 items-center mt-6">
          <textarea
            value={typingWord}
            onChange={(e) => onType(e.target.value)}
            className="text-center font-bold outline-none rounded-xl resize-none h-12 text-[#0C3690] !border-[#0C3690] flex items-center justify-center text-xl"
            rows={1}
            style={{ border: "2px solid #0C3690", lineHeight: "44px" }}
          />

          <button className="text-white flex h-12 rounded-lg bg-green-500 items-center px-4 gap-3">
            <GrPowerReset size={20} />
            <p>reset</p>
          </button>
        </div>
      </div>

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
        {failCount}
      </div>
    </div>
  );
};

export default SpeedTest;
