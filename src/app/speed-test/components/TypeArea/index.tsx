import { scrollTo, scrollToId } from "@/app/libs/utils";
import { useDebounce } from "@/hooks/useDebounce";
import * as React from "react";
import { GrPowerReset } from "react-icons/gr";
import { caculScore, getWord, pushScore } from "./_utils";
import { Header } from "./Header";
import { WordList } from "./WordList";
import { IRank, IResult } from "../../types";
import { useSession } from "next-auth/react";
import { useMainStore } from "@/layouts/main.store";
import { UseQueryResult } from "@tanstack/react-query";

export interface ITypeAreaProps {
  rankQuery: UseQueryResult<IRank[]>;
  paragraphs: string;
  userInput: string;
  wordIndex: number;
  setParagraphs: React.Dispatch<React.SetStateAction<string>>;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  setWordIndex: (value: number) => void;
  isTyping: boolean;
  setIsTyping: (value: boolean) => void;
  resetType: () => void;
  setResult: (value: IResult) => void;
  isFinish: boolean;
  setIsFinish: (value: boolean) => void;
}

export default function TypeArea({
  rankQuery,
  isTyping,
  setIsTyping,
  paragraphs,
  userInput,
  wordIndex,
  setParagraphs,
  setUserInput,
  setWordIndex,
  resetType,
  setResult,
  isFinish,
  setIsFinish,
}: ITypeAreaProps) {
  const { userInfo, languages } = useMainStore();

  // console.log("userInfo :>> ", userInfo);
  const paragraphsArray = React.useMemo(() => {
    return paragraphs.split(/[ \n]+/);
  }, [paragraphs]);
  const userInputArray = React.useMemo(() => {
    return userInput.split(" ");
  }, [userInput]);
  const [typingWord, setTypingWord] = React.useState("");
  const wordDebounce = useDebounce(typingWord, 0);
  const [prevDebounce, setPrevDebounce] = React.useState("");
  const [failCount, setFailCount] = React.useState(0);
  const [initTime, setInitTime] = React.useState(10);
  const [time, setTime] = React.useState(initTime);
  const [isNextWord, setIsNextWord] = React.useState(false);
  const intervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const [inputRef, setInputRef] = React.useState<HTMLTextAreaElement | null>(
    null
  );

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

    if (value.slice(-1) === " " || value.slice(-1) === "\n") {
      if (prevDebounce !== paragraphsArray[wordIndex]) {
        setFailCount(failCount + prevDebounce.length);
      }
      setUserInput((prev) => prev + value.slice(0, value.length - 1) + " ");
      setWordIndex(wordIndex + 1);
      setIsNextWord(true);
    } else {
      setTypingWord(value);
    }
  };

  const finishType = async () => {
    inputRef?.setAttribute("disabled", "disabled");

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    setIsTyping(false);
    const result = caculScore({
      failCount,
      wordIndex,
      paragraphsArray,
      userInputArray,
      initTime,
    });
    setResult(result);

    //only push score when user is logged in change if need
    if (userInfo?.id && Number(userInfo?.id) && userInfo?.language?.id) {
      await pushScore(
        result,
        Number(userInfo.id),
        Number(userInfo.language?.id)
      );
      await rankQuery.refetch();
    }
    setIsFinish(true);
    scrollToId("type-result");
  };

  React.useEffect(() => {
    if (isTyping && !time) {
      finishType();
    }
  }, [time]);

  React.useEffect(() => {
    if (!isFinish) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      setTime(initTime);
      setTypingWord("");
    }
  }, [isFinish]);

  React.useEffect(() => {
    if (paragraphsArray.length <= wordIndex + 30) {
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
    console.log("wordIndex, userInputArray :>> ", wordIndex, userInputArray);
    setTypingWord("");
    scrollTo("#char-" + wordIndex, ".words-wrapper");
  }, [wordIndex]);

  React.useEffect(() => {
    setInputRef(document.querySelector("textarea") || null);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  React.useEffect(() => {
    if (inputRef) {
      inputRef.focus();
    }
  }, [inputRef]);

  return (
    <div
      className={`bg-white rounded-lg mt-4 flex gap-4 duration-500 overflow-hidden ${
        isFinish ? "h-0 min-h-0" : "h-[300px]"
      }`}
    >
      <div className={`w-2/3 px-6 py-5 shadow-sm shadow-gray-300`}>
        <Header time={time} />
        <div
          className="relative bg-[#F5F6FA] px-4 py-3 rounded-lg shadow-sm shadow-gray-300 "
          style={{ border: "1px solid #d8d8d8" }}
        >
          <div className="h-[120px] overflow-y-hidden words-wrapper">
            <div
              className="text-2xl flex flex-wrap overflow-auto "
              style={{ wordSpacing: "8px" }}
            >
              <div id="first-word"></div>
              <WordList
                typedArray={userInputArray}
                typingWord={wordDebounce}
                wordIndex={wordIndex}
                words={paragraphsArray}
              />
            </div>
          </div>
          <div className="absolute top-12 left-1 right-1 h-[90px] bg-[#f6faffaa]"></div>
        </div>
        <div className="flex gap-8 items-center mt-6">
          <textarea
            id="input-text"
            spellCheck={false}
            value={typingWord}
            onChange={(e) => onType(e.target.value)}
            className="disabled:bg-gray-200 disabled:text-gray-400 disabled:!border-none  text-center font-bold outline-none rounded-xl resize-none h-12 text-[#0C3690] !border-[#0C3690] flex items-center justify-center text-xl"
            rows={1}
            style={{ border: "2px solid #0C3690", lineHeight: "44px" }}
          />
          <button
            className="text-white flex h-12 rounded-lg bg-green-500 items-center px-4 gap-3 relative"
            onClick={resetType}
          >
            <GrPowerReset size={20} />
            <p>Reset</p>

            <p className="absolute text-xs -bottom-4 w-full left-0 text-center text-gray-400">
              <span>( F5 )</span>
            </p>
          </button>
        </div>
      </div>
      <div className="flex-1 px-4" style={{ borderLeft: "1px solid #ddd" }}>
        <p>Bên lưu ghi mấy cái streak, animation, combo các thứ</p>
      </div>
    </div>
  );
}
