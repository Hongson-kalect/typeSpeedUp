import axios from "axios";
import { KeyResultType } from "../ui/trainingType";

export const caculScore = (): void => {};

export const calculateScore = async ({
  paraArr,
  userInputArr,
  content,
  time,
  setResult,
  setTyped,
  userId,
  selectedTrainingId,
}: {
  paraArr: string[];
  userInputArr: string[];
  content: string;
  time: number;
  setResult: (cb: (prev: any) => any) => void;
  setTyped: (value: string) => void;
  userId?: string | number;
  selectedTrainingId?: string | number;
}): Promise<void> => {
  let failWord = 0,
    correctWord = 0,
    failChar = 0,
    correctChar = 0;

  paraArr.map((word, index) => {
    if (word !== userInputArr[index]) {
      failWord += 1;
      failChar += word.length;
    } else {
      correctWord += 1;
      correctChar += word.length;
    }
  });

  const wordCount = paraArr.length;
  const charCount = content?.replaceAll(" ", "")?.length || 0;

  const wpm = Math.floor((wordCount / (time / 60)) * 10) / 10;
  const cpm = Math.floor((charCount / (time / 60)) * 10) / 10;
  const wAccuracy = Math.floor((correctWord / wordCount) * 1000) / 10;
  const cAccuracy = Math.floor((correctChar / charCount) * 1000) / 10;
  const score =
    Math.floor(
      Math.sqrt((wordCount * charCount * wAccuracy * cAccuracy) / (time || 1))
    ) / 10;

  setResult((prev) => ({
    wpm,
    time,
    cpm,
    wAccuracy,
    cAccuracy,
    score,
    failChar: prev.failChar + failChar,
    failWord,
    correctChar,
    correctWord,
  }));

  setTyped(userInputArr.join(" "));

  //   const keyResults = calculateKeyResults({ paraArr, userInputArr });
  //   setResult((prev) => ({
  //     ...prev,
  //     ...keyResults,
  //   }));

  if (userId && selectedTrainingId) {
    await postHistory(userId, selectedTrainingId);
  }
};

export const calculateKeyResults = ({
  paraArr,
  userInputArr,
  setKeyResult,
}: {
  paraArr: string[];
  userInputArr: string[];
  setKeyResult: React.Dispatch<React.SetStateAction<KeyResultType[]>>;
}) => {
  let correctChar = 0,
    correctWord = 0,
    failChar = 0,
    failWord = 0;

  console.log("setKeyResult :>> ", paraArr, userInputArr);

  const tempResult: KeyResultType[] = [];

  paraArr.forEach((word, index) => {
    //foreach char in word, compare with userInputArr[index]
    word.split("").forEach((char, charIndex) => {
      //detect tempResult have that key yet
      let keyIndex = tempResult.find((key) => key.char === char);
      if (!keyIndex) {
        keyIndex = { char, total: 0, accuracy: 0 };
        tempResult.push(keyIndex);
      }

      keyIndex.total += 1;
      if (userInputArr?.[index]?.[charIndex] === char) {
        keyIndex.accuracy += 1;
      }
    });
    if (userInputArr?.[index] === word) {
      correctChar += word.length;
      correctWord += 1;
    } else {
      failChar += word.length;
      failWord += 1;
    }
  });

  setKeyResult(
    tempResult
      .sort((a, b) => a.char.localeCompare(b.char))
      .sort((a, b) => b.total - a.total)
  );

  return {
    correctChar,
    correctWord,
    failChar,
    failWord,
  };
};

export const caculCharScore = (): void => {};

export const postHistory = async (
  userId: string | number,
  trainingId: string | number
): Promise<void> => {
  try {
    await axios.post("/api/history", {
      userId,
      trainingId,
    });
  } catch (error) {
    console.error("Lỗi khi gửi lịch sử:", error);
    throw error; // Ném lỗi để component gọi hàm có thể xử lý
  }
};
