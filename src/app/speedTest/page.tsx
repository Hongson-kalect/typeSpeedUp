"use client";
import * as React from "react";
import { scrollToId } from "../libs/utils";
import { useDebounce } from "@/hooks/useDebounce";
import { wordRate, words } from "./utils/const";
import { CiEdit, CiSettings } from "react-icons/ci";
import { GrPowerReset } from "react-icons/gr";
import { IoSettingsOutline } from "react-icons/io5";
import { RiTimerLine } from "react-icons/ri";

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

const Result = ({ result }) => (
  <div
    className="mt-8 bg-white rounded-lg px-6 py-4 flex gap-4"
    id="type-score"
    style={{ border: "1px solid #ddd" }}
  >
    <div className="flex-2">
      <h2 className=" text-orange-500 font-bold text-2xl">KẾT QUẢ</h2>
      <div className="detail flex flex-wrap gap-[20%] mt-4 pl-4 max-w-[360px]">
        <div className="w-2/5">
          <p className="text-sm text-gray-600 mt-3">Word Per Minute</p>
          <p className="font-semibold text-3xl mt-2 text-center">
            {result.wpm || 0}
          </p>
        </div>
        <div className="w-2/5">
          <p className="text-sm text-gray-600 mt-3">Char Per Minute</p>
          <p className="font-semibold text-3xl mt-2 text-center">
            {result.cpm || 0}
          </p>
        </div>
        <div className="w-2/5">
          <p className="text-sm text-gray-600 mt-3">Word Accuracy Rate</p>
          <p className="font-medium text-xl italic mt-2 text-center">
            {result.wa || 0}%
          </p>
        </div>
        <div className="w-2/5">
          <p className="text-sm text-gray-600 mt-3">Char Accuracy Rate</p>
          <p className="font-medium text-xl italic mt-2 text-center">
            {result.ca || 0}%
          </p>
        </div>
      </div>
    </div>
    <div
      className="flex-1 flex flex-col pl-4"
      style={{ borderLeft: "1px solid #ddd" }}
    >
      <h2 className=" text-blue-500 font-bold text-2xl">ĐIỂM</h2>
      <div className="flex flex-col items-center justify-center flex-1">
        <p className="point text-5xl font-bold">{result.score}</p>
        <p className="point text-xl text-cyan-500 italic font-bold mt-6">
          Excelent
        </p>
      </div>
    </div>
    <div className="flex-1">
      {/* <h2 className=" text-blue-500 font-bold text-2xl">ĐIỂM</h2> */}
    </div>
  </div>
);

const Rank = () => {
  return (
    <div
      className="mt-8 bg-white rounded-lg px-6 py-4 flex gap-4"
      style={{ border: "1px solid #d5d5d5" }}
    >
      <div>
        <h2 className=" text-gray-700 font-bold text-">XẾP HẠNG</h2>
        <table className="">
          <tbody>
            <tr>
              <th>User Name</th>
              <th>WPM</th>
              <th>CPM</th>
              <th>WA</th>
              <th>CR</th>
              <th>Score</th>
              <th>Attemp</th>
              {/* <th>total</th> */}
            </tr>
            <tr>
              <td>Guest</td>
              <td>82</td>
              <td>250</td>
              <td>80.14%</td>
              <td>78.8%</td>
              <td>248</td>
              <td>82</td>
            </tr>
            <tr>
              <td>Guest</td>
              <td>82</td>
              <td>250</td>
              <td>80.14%</td>
              <td>78.8%</td>
              <td>248</td>
              <td>82</td>
            </tr>
            <tr>
              <td>Guest</td>
              <td>82</td>
              <td>250</td>
              <td>80.14%</td>
              <td>78.8%</td>
              <td>248</td>
              <td>82</td>
            </tr>
            <tr>
              <td>Guest</td>
              <td>82</td>
              <td>250</td>
              <td>80.14%</td>
              <td>78.8%</td>
              <td>248</td>
              <td>82</td>
            </tr>
            <tr>
              <td>Guest</td>
              <td>82</td>
              <td>250</td>
              <td>80.14%</td>
              <td>78.8%</td>
              <td>248</td>
              <td>82</td>
            </tr>
            <tr>
              <td>Guest</td>
              <td>82</td>
              <td>250</td>
              <td>80.14%</td>
              <td>78.8%</td>
              <td>248</td>
              <td>82</td>
            </tr>
            <tr>
              <td>Guest</td>
              <td>82</td>
              <td>250</td>
              <td>80.14%</td>
              <td>78.8%</td>
              <td>248</td>
              <td>82</td>
            </tr>
            <tr>
              <td>Guest</td>
              <td>82</td>
              <td>250</td>
              <td>80.14%</td>
              <td>78.8%</td>
              <td>248</td>
              <td>82</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

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
    wa: 0,
    ca: 0,
    score: null,
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

    window.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the h to top of window
    });

    document.getElementById("speed-test-page")?.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the scroll top of page
    });

    document.getElementById("speed-test-page")?.scrollTo({
      top: 0,
      behavior: "smooth", // This makes the scroll top of page
    });
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
    const wa =
      Math.floor(
        ((typedWordArray.length - wordFail) / typedWordArray.length) * 10000
      ) / 100;
    const ca =
      Math.floor(((typedWord.length - charFail) / typedWord.length) * 10000) /
      100;
    const score =
      Math.floor(
        Math.sqrt(
          (typedWord.length * (typedWord.length - failCount) * wa * ca) /
            (initTime || 1)
        )
      ) / 10;
    setResult({ wpm, cpm, wa, ca, score });
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
    <div
      className="shadow shadow-gray-700 p-4 flex-1 px-6 overflow-auto"
      id="speed-test-page"
    >
      <h2 className="text-3xl font-bold mt-4">Kiểm tra tốc độ gõ</h2>

      <div
        className="bg-white px-6 py-5 rounded-lg mt-4 flex gap-4"
        style={{ border: "2px solid #D8D8D8" }}
      >
        <div className="w-2/3">
          <div className="flex items-end justify-between">
            <div className="flex gap-2 items-center">
              <p className="text-gray-600">Tiếng Việt</p>
              <CiEdit size={18} />
            </div>
            <div className="setting flex items-end gap-1">
              <IoSettingsOutline size={20} className="text-gray-500 mb-1" />
              <p className="h-7 rounded-lg mb-0.5 bg-green-500 text-white px-3 flex items-center justify-center">
                Dễ
              </p>
              <RiTimerLine size={20} className="text-gray-500 ml-2 mb-1" />
              <Timer time={time} />
            </div>
          </div>
          <div className="relative">
            <div
              className="h-[120px] overflow-y-hidden bg-[#F5F6FA] px-4 pb-3 rounded-lg  shadow-sm shadow-gray-300"
              style={{ border: "1px solid #d8d8d8" }}
            >
              <div
                className="text-2xl flex flex-wrap overflow-auto"
                style={{ wordSpacing: "8px" }}
              >
                <div id="first-word"></div>
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
            <div className="absolute top-10 left-1 right-1 h-[79px] bg-[#f6faffaa]"></div>
          </div>
          <div className="flex gap-8 items-center mt-6">
            <textarea
              ref={inputRef}
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
              <p>reset</p>

              <p className="absolute text-xs -bottom-4 w-full left-0 text-center text-gray-400">
                ( F5 )
              </p>
            </button>
          </div>
        </div>
        <div className="flex-1 px-4" style={{ borderLeft: "1px solid #ddd" }}>
          <p>Bên lưu ghi mấy cái streak, animation, combo các thứ</p>
        </div>
      </div>

      <div className="h-20 flex items-center justify-center mt-8">
        <div className="h-full w-40 bg-red-300"></div>
      </div>

      <div className="duration-200" id="type-result">
        {result.score !== null ? (
          <div className={`${isTyping ? "opacity-30" : ""}`}>
            <Result result={result} />
          </div>
        ) : null}
      </div>

      <div className="" id="type-rank">
        <Rank />
      </div>
    </div>
  );
};

export default SpeedTest;
