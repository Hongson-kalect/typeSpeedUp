import axios from "axios";
import { IResult } from "../../types";
import { wordRate, words } from "../../utils/const";

export const getWord = () => {
  const type = "basic"; //basic normal extreme master
  //type này sẽ lấy từ settings

  let addWord = "";
  while (addWord.split(" ").length < 30) {
    const gacha = Math.floor(Math.random() * 100);
    let wordType = "";
    const selectedWordType = Object.entries(wordRate[type]).find(
      ([key, value]) => {
        return value >= gacha;
      }
    );

    if (selectedWordType) wordType = selectedWordType[0];

    const wordLib = words.vi?.[wordType] || [];

    const wordIndex = Math.floor(Math.random() * wordLib.length);

    if (wordType === "baseSpe" || wordType === "advanceSpe")
      addWord += wordLib[wordIndex];
    else {
      addWord += " " + wordLib[wordIndex];
    }
  }

  return addWord.trim();
};

export const caculScore = ({
  failCount,
  wordIndex,
  paragraphsArray,
  userInputArray,
  initTime,
}: {
  failCount: number;
  wordIndex: number;
  paragraphsArray: string[];
  userInputArray: string[];
  initTime: number;
}) => {
  const initResult: IResult = {
    wordTyped: 0,
    charTyped: 0,
    wordCorrect: 0,
    charCorrect: 0,
    wordError: 0,
    charError: 0,
    wpm: 0,
    cpm: 0,
    wAccuracy: 0,
    cAccuracy: 0,
    score: 0,
  };

  initResult.charError = wordIndex ? failCount : 0;

  const correctWords = paragraphsArray.slice(0, wordIndex);
  userInputArray.pop(); //remove last space
  initResult.wordTyped = wordIndex;
  userInputArray.map((typedWord, index) => {
    const correctWord = correctWords[index];
    const isCorrect = typedWord === correctWord;

    if (isCorrect) {
      initResult.wordCorrect += 1;
      initResult.charCorrect += correctWord.length;
    } else {
      initResult.wordError += 1;
      for (
        let i = 0;
        i < Math.max(correctWord?.length, typedWord?.length);
        i++
      ) {
        if (correctWord[i] !== typedWord[i]) {
          initResult.charError += 1;
        } else {
          initResult.charCorrect += 1;
        }
      }
    }
  });

  initResult.wordTyped = userInputArray.length;
  initResult.charTyped = wordIndex ? userInputArray.join("").length : 0;

  initResult.wpm = Math.floor(initResult.wordCorrect / (initTime / 60));
  initResult.cpm = Math.floor((initResult.charCorrect / initTime) * 60);
  initResult.wAccuracy = initResult.wordTyped
    ? Math.floor((initResult.wordCorrect / initResult.wordTyped) * 10000) / 100
    : 0;
  initResult.cAccuracy = initResult.charTyped
    ? Math.floor((initResult.charCorrect / initResult.charTyped) * 10000) / 100
    : 0;
  initResult.score =
    Math.floor(
      Math.sqrt(
        (initResult.wordCorrect *
          initResult.charCorrect *
          initResult.wAccuracy *
          initResult.cAccuracy) /
          (initTime || 1)
      )
    ) / 10;
  return initResult;
};

export const pushScore = async (
  result: IResult,
  userId: number,
  languageId: number
) => {
  await axios.post("/api/score", {
    type: "speed-test",
    userId: userId,
    languageId: languageId,
    wpm: result.wpm,
    cpm: result.cpm,
    score: result.score,
    wAccuracy: result.wAccuracy,
    cAccuracy: result.cAccuracy,
    time: result.time || 60,
  });
};
