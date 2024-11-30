"use client";

import { scrollTo } from "@/app/libs/utils";
import { ResultType } from "@/app/paragraphs/_utils/interface";
import Keyboard from "@/components/custom/keyboard";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useDebounce } from "@/hooks/useDebounce";
import { formatString } from "@/lib/utils";
import { ResetIcon } from "@radix-ui/react-icons";
import * as React from "react";

export interface ITrainingTypeProps {
  content: string;
}

export default function TrainingType(props: ITrainingTypeProps) {
  const [typingChar, setTypingChar] = React.useState<string | null | undefined>(
    ""
  );

  console.log("typingChar :>> ", typingChar);

  return (
    <div>
      Training type
      <p>{props.content}</p>
      <div className="flex gap-2 w-full">
        <div className="bg-white flex-[2] p-2 shadow rounded-lg">
          <TypeArea setTypingChar={setTypingChar} />
        </div>
        <Keyboard char={typingChar} />
        {/* <KeyboardGuide typingChar={typingChar} /> */}
      </div>
      <div className="flex gap-2 mt-4 w-full">
        <div className="bg-white flex flex-1 shadow rounded-lg p-2">
          <div>Result</div>
          <div>Score</div>
        </div>
        <div className="bg-white flex-1 shadow rounded-lg p-2">Type detail</div>
      </div>
    </div>
  );
}

type TypeAreaProps = {
  setTypingChar: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
};

const TypeArea = (props: TypeAreaProps) => {
  const [content] = React.useState(
    "aSdA sddd aasa sdsa sdasd lkjl kjj jjkj lklk jhh klkjl"
  );
  const paraArr = React.useMemo(() => {
    return formatString(content).split(" ");
  }, []);

  const [isShowResult, setIsShowResult] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isNextWord, setIsNextWord] = React.useState(false);

  const [wordIndex, setWordIndex] = React.useState(0);

  const [userInput, setUserInput] = React.useState("");
  const [userInputArr, setUserInputArr] = React.useState<string[]>([]);
  const [typingVal, setTypingVal] = React.useState("");
  const wordDebounce = useDebounce(typingVal, 0);
  const [prevWordDebounce, setPrevWordDebounce] = React.useState("");

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

  const inputRef = React.useRef<HTMLTextAreaElement | null>(null);

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (!isTyping) setIsTyping(true);

    const value = e.target.value;
    if (value.slice(-1) === " " || value.slice(-1) === "\n") {
      setIsNextWord(true);
      userInputArr.push(value.slice(0, value.length - 1));
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
    setUserInputArr([]);
    inputRef.current?.removeAttribute("disabled");
    inputRef.current?.focus();
  };

  const caculScore = () => {
    alert("Show result ");
  };

  React.useEffect(() => {
    if (isNextWord) {
      setIsNextWord(false);
      setTypingVal("");
      setPrevWordDebounce("");
      return;
    }
    if (prevWordDebounce.length > wordDebounce.length) {
      setResult((prev) => ({
        ...prev,
        failChar:
          (prev?.failChar || 0) +
          (prevWordDebounce.length - wordDebounce.length),
      }));
    }
    setPrevWordDebounce(wordDebounce);
  }, [wordDebounce]);

  React.useEffect(() => {
    scrollTo("#char-" + wordIndex, ".words-wrapper");
    if (wordIndex >= paraArr.length) {
      caculScore();
      setIsShowResult(true);
      inputRef.current?.setAttribute("disabled", "disabled");
    }
  }, [wordIndex]);

  React.useEffect(() => {
    if (typingVal === paraArr[wordIndex].slice(0, typingVal.length)) {
      const nextChar = paraArr[wordIndex][typingVal.length];
      console.log("nextChar :>> ", nextChar);
      if (nextChar) props.setTypingChar(nextChar);
      else props.setTypingChar("");
    } else {
      props.setTypingChar(null);
    }

    console.log("typingVal.length :>> ", typingVal.length, typingVal);
  }, [typingVal]);

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
};

const KeyboardGuide = ({ char }: { char: string | null | undefined }) => {
  const [capsLock, setCapsLock] = React.useState(false);
  const [shift, setShift] = React.useState(false);

  const keys = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "0",
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "Space",
    "Delete",
    "Shift",
    "Caps Lock",
  ];

  const handleKeyClick = (key: string) => {
    if (key === "Caps Lock") {
      setCapsLock(!capsLock);
    } else if (key === "Shift") {
      setShift(!shift);
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        gap: "10px",
      }}
    >
      {keys.map((key) => {
        let displayKey = key;
        let isBold = false;

        if (char === key) {
          isBold = true;
        } else if (char === null && key === "Delete") {
          isBold = true;
        } else if (char === undefined && key === "Space") {
          isBold = true;
        }

        if (capsLock || shift) {
          if (key.length === 1 && /[a-zA-Z]/.test(key)) {
            displayKey = key.toUpperCase();
          }
        }

        return (
          <div
            key={key}
            onClick={() => handleKeyClick(key)}
            style={{
              padding: "10px",
              border: "1px solid black",
              fontWeight: isBold ? "bold" : "normal",
              cursor: "pointer",
            }}
          >
            {displayKey}
          </div>
        );
      })}
    </div>
  );
};
