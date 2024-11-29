import * as React from "react";

export interface ITrainingMainProps {}

export default function TrainingMain(props: ITrainingMainProps) {
  return (
    <div className="bg-white px-2 py-1 overflow-auto flex-1 rounded-lg h-full">
      <div className="text-lg font-bold text-gray-800">
        Training 1.1:{" "}
        <span className="text-base text-gray-500">Lời nói đầu sử dụng</span>
      </div>
    </div>
  );
}
