import { ResultType } from "@/app/paragraphs/_utils/interface";
import * as React from "react";
import { KeyResultType } from "../types";

interface ResultAreaProps {
  content: string;
  typed: string;
  result: ResultType;
  keyResult: KeyResultType[];
}

export const ResultArea = ({
  content,
  typed,
  result,
  keyResult,
}: ResultAreaProps) => {
  const contentArr = React.useMemo(() => {
    return content.split(" ");
  }, [content]);
  const userInputArr = React.useMemo(() => {
    return typed.split(" ");
  }, [typed]);

  const correctChar = React.useMemo(() => {
    return keyResult.reduce((acc, curr) => acc + curr.accuracy, 0);
  }, [keyResult]);
  const totalChar = React.useMemo(() => {
    return keyResult.reduce((acc, curr) => acc + curr.total, 0);
  }, [keyResult]);
  const charRate = React.useMemo(() => {
    return (correctChar / totalChar) * 100;
  }, [correctChar, result]);

  const totalWord = React.useMemo(() => {
    return result.correctWord + result.failWord;
  }, [result]);
  const wordRate = React.useMemo(() => {
    return (result.correctWord / totalWord) * 100;
  }, [result, totalWord]);

  const renderAccuracyBar = (accuracy: number, total: number) => {
    const percentage = (accuracy / total) * 100;

    if (!totalWord) return;

    return (
      <div className="flex items-center gap-2 flex-1">
        <div className="flex-1 h-2 bg-gray-200 rounded overflow-hidden">
          <div
            className="h-full bg-blue-500 transition-all duration-300"
            style={{ width: `${percentage}%` }}
          />
        </div>
        <span className="text-sm text-gray-600 w-16 text-right">
          {percentage.toFixed(1)}%
        </span>
      </div>
    );
  };

  return (
    <div className="bg-white flex-1 shadow rounded-lg p-2">
      <h2 className="font-bold text-lg">Result</h2>
      {!totalWord ? (
        <div className="text-center mt-2 text-gray-600 font-medium">
          Finish type to show result
        </div>
      ) : (
        <>
          <div className="flex items-center justify-between gap-4">
            <div className="relative shadow-sm shadow-gray-600 rounded-lg flex-1 p-2 pb-4 mt-3 text-center">
              <div className="flex justify-between items-center">
                <p className="text-sm p-2 text-gray-600 bg-white">WORD</p>
                <p className={`text-right text-sm opacity-70 font-semibold`}>
                  <span
                    className={`text-normal py-3 ${
                      wordRate >= 50 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {result.correctWord}
                  </span>{" "}
                  / {totalWord}
                </p>
              </div>

              <p
                className={`text-xl font-medium ${
                  wordRate >= 50 ? "text-green-600" : "text-red-500"
                }`}
              >
                {wordRate.toFixed(2)}%
              </p>
            </div>
            <div className="relative shadow-sm shadow-gray-600 rounded-lg flex-1 p-2 pb-4 mt-3 text-center">
              <div className="flex justify-between items-center">
                <p className="text-sm p-2 text-gray-600 bg-white">CHAR</p>
                <p className={`text-right text-sm opacity-70 font-semibold`}>
                  <span
                    className={`text-normal py-3 ${
                      charRate >= 50 ? "text-green-600" : "text-red-500"
                    }`}
                  >
                    {correctChar}
                  </span>{" "}
                  / {totalChar}
                </p>
              </div>

              <p
                className={`text-xl font-medium ${
                  charRate >= 50 ? "text-green-600" : "text-red-500"
                }`}
              >
                {charRate.toFixed(2)}%
              </p>
            </div>
            <div className="relative shadow-sm shadow-gray-600 rounded-lg flex-1 p-2 pb-4 mt-3 text-center">
              <div className="flex justify-between items-center">
                <p className="text-sm p-2 text-gray-600 bg-white">TIME</p>
              </div>

              <p className={`text-xl font-medium text-gray-600`}>
                {result.time}
              </p>
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Các từ đã gõ:</h3>
            <div className="flex flex-wrap gap-2 p-2 bg-gray-50 rounded-lg">
              {userInputArr.map((word, index) => {
                let wordLeft = "";
                const originWord = contentArr[index];

                if (originWord?.length > word?.length)
                  wordLeft = originWord.slice(word.length);

                return (
                  <div
                    key={index}
                    className={`px-2 py-1 rounded ${
                      word === originWord ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    {word.split("").map((char, charIndex) => {
                      const originChar = originWord?.[charIndex];

                      return (
                        <span
                          key={charIndex}
                          className={` ${
                            char === originChar
                              ? "bg-green-100 text-green-700" // Từ đúng
                              : "bg-red-100 text-red-700" // Từ sai
                          }`}
                        >
                          {char}
                        </span>
                      );
                    })}
                    <span className="text-gray-300 italic">{wordLeft}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-2">Thống kê phím:</h3>
            <div className="grid grid-cols-1 gap-1">
              {keyResult.map((key, index) => (
                <div
                  key={index}
                  className="px-1 bg-gray-50 rounded-lg flex items-center gap-3"
                >
                  <span className="font-bold w-6 text-center">{key.char}</span>
                  {renderAccuracyBar(key.accuracy, key.total)}
                  <span className="text-xs text-gray-500">
                    ({key.accuracy}/{key.total})
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
