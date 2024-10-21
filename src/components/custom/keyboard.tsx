import React from "react";

const Keyboard = () => {
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

  return (
    <div className="flex flex-col items-center space-y-2">
      {keys.map((row, rowIndex) => (
        <div key={rowIndex} className="flex space-x-1">
          {row.map((key) => (
            <div
              key={key}
              className={`w-10 h-10 flex items-center justify-center bg-white border border-gray-300 rounded shadow cursor-pointer select-none font-sans text-lg ${
                key === "Backspace" ||
                key === "Enter" ||
                key === "Shift" ||
                key === "CapsLock" ||
                key === "Space"
                  ? "w-20"
                  : ""
              }`}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
