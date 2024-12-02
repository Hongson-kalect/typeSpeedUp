import React, { useMemo } from "react";

const Keyboard = ({ char }: { char: string | null | undefined }) => {
  const keys = [
    [
      "`",
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
      "-",
      "=",
      "Backspace",
    ],
    ["Tab", "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P", "[", "]", "\\"],
    [
      "CapsLock",
      "A",
      "S",
      "D",
      "F",
      "G",
      "H",
      "J",
      "K",
      "L",
      ";",
      "'",
      "Enter",
    ],
    ["Shift", "Z", "X", "C", "V", "B", "N", "M", ",", ".", "/", "Shift"],
    ["Ctrl", "Win", "Alt", "Space", "Alt", "Fn", "Menu", "Ctrl"],
  ];

  console.log("char :>> ", char?.toString());

  const uppercase = useMemo(() => {
    return char && typeof char === "string" && char?.toUpperCase() === char;
  }, [char]);

  return (
    <div className="flex flex-col items-center space-y-2">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-0.5">
          {row.map((key, index) => {
            let isBold = false;
            if (char?.toUpperCase() === key) {
              isBold = true;
            } else if (char === null && key === "Backspace") {
              isBold = true;
            } else if (char === undefined && key === "Space") {
              isBold = true;
            } else if (uppercase && key === "Shift") {
              isBold = true;
            }

            return (
              <div
                key={index}
                className={`duration-200 w-6 h-6 text-sm flex items-center justify-center bg-white border border-gray-300 rounded shadow cursor-pointer select-none font-sans ${
                  key === "Backspace" ||
                  key === "Tab" ||
                  key === "Enter" ||
                  key === "CapsLock"
                    ? "!text-[10px] !w-12"
                    : key === "Shift"
                    ? "!text-[10px] !w-14"
                    : ["Ctrl", "Win", "Alt", "Fn", "Menu"].includes(key)
                    ? "!text-[10px] !w-8"
                    : key === "Space"
                    ? "!text-[10px] !w-32"
                    : ""
                } ${
                  isBold
                    ? "font-bold -translate-y-0.5 !bg-blue-600 text-white scale-105"
                    : ""
                }`}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
      {char + "qq"}
    </div>
  );
};

export default Keyboard;
