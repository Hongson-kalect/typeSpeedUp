import { ResultType } from "@/app/paragraphs/_utils/interface";
import { scrollTo } from "@/app/libs/utils";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useDebounce } from "@/hooks/useDebounce";
import { useMainStore } from "@/layouts/main.store";
import { formatString } from "@/lib/utils";
import { ResetIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { useTrainingStore } from "../../_utils/store";
import { calculateKeyResults, calculateScore } from "../../_utils/util";
import { KeyResultType } from "../types";

type TypeAreaProps = {
  content: string;
  setTypingChar: React.Dispatch<
    React.SetStateAction<string | null | undefined>
  >;
  setResult: React.Dispatch<React.SetStateAction<ResultType>>;
  setKeyResult: React.Dispatch<React.SetStateAction<KeyResultType[]>>;
  setTyped: React.Dispatch<React.SetStateAction<string>>;
};

let timeInterval: NodeJS.Timeout;

export const TypeArea = (props: TypeAreaProps) => {
  const content = React.useMemo(() => props.content, [props.content]);
  const { userInfo } = useMainStore();
  const paraArr = React.useMemo(() => {
    return formatString(content)?.split(" ") || [];
  }, [content]);
  const { selectedTraining } = useTrainingStore();

  const [isShowResult, setIsShowResult] = React.useState(false);
  const [isTyping, setIsTyping] = React.useState(false);
  const [isNextWord, setIsNextWord] = React.useState(false);

  const [wordIndex, setWordIndex] = React.useState(0);
  const [time, setTime] = React.useState(0);

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
    setUserInputArr([]);
    inputRef.current?.removeAttribute("disabled");
    inputRef.current?.focus();
  };

  const handleCalculateScore = async () => {
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
      handleCalculateScore();
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

  React.useEffect(() => {
    reset();
  }, [content]);

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
