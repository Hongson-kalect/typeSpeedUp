import React from "react";

export const WordList = React.memo(function WordList({
  words,
  wordIndex,
  typedArray,
  typingWord,
}: {
  words: string[];
  wordIndex: number;
  typedArray: string[];
  typingWord: string;
}) {
  return words.map((correctWord, index) => {
    const typedWord = typedArray[index];

    if (wordIndex === index) {
      return (
        <WordItem
          index={index}
          key={index}
          correctWord={correctWord}
          typedWord={typingWord}
          active
        />
      );
    }

    return (
      <WordItem
        key={index}
        correctWord={correctWord}
        typedWord={typedWord}
        index={index}
      />
    );
  });
});

// WordList.displayName = "WordList";

const WordItem = React.memo(function WordItem({
  correctWord,
  typedWord,
  index,
  active,
}: {
  correctWord: string;
  typedWord: string;
  index: number;
  active?: boolean;
}) {
  if (typedWord === undefined) {
    return (
      <div
        id={"char-" + index}
        className={`px-0.5 mx-1 text-2xl h-9 pb-1 inline rounded-lg ${
          active ? "bg-yellow-300" : ""
        }`}
        key={index}
      >
        {correctWord}
      </div>
    );
  }
  return (
    <div
      id={"char-" + index}
      className={`px-0.5 mx-1 text-2xl h-9 pb-1 inline rounded-lg ${
        active ? "bg-yellow-300" : ""
      } ${
        typedWord !== undefined
          ? typedWord !== correctWord
            ? "bg-red-200"
            : "bg-green-200"
          : ""
      }`}
      // style={{ lineHeight: "40px" }}
      key={index}
    >
      <div className="relative inline">
        {correctWord.split("").map((correctChar, charIndex) => {
          const typedChar = typedWord?.[charIndex];
          return (
            <span
              className={` ${
                typedChar === undefined
                  ? "text-black"
                  : typedChar !== correctChar
                  ? "text-red-500"
                  : "text-green-600"
              }`}
              key={charIndex}
            >
              {correctChar}
            </span>
          );
        })}
        {active ? (
          <div className=" px-4 mx-auto rounded-xl absolute z-10 text-2xl  top-8 -left-4 bg-black box-content  min-w-full box text-white">
            <p className="h-6">
              {typedWord}
              <span className="text-gray-400">_</span>
            </p>
            <p className="mt-2 text-center text-gray-500 text-xs">
              <span>combo</span>
              <span className="text-gray-300">x2</span>
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
});

WordItem.displayName = "WordItem";
