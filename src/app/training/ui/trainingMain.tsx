import * as React from "react";
import { useTrainingStore } from "../_utils/store";
import TrainingType from "./trainingType";
import TrainingQuill from "./trainingQuill";

export interface ITrainingMainProps {}

export default function TrainingMain(props: ITrainingMainProps) {
  const { selectedTraining } = useTrainingStore();

  if (!selectedTraining)
    return (
      <div className="bg-white px-2 py-1 overflow-auto flex-1 rounded-lg h-full">
        Hướng dẫn or lời nói đầu or Không có cái nào đc chọn
      </div>
    );

  return (
    <div className="bg-gray-100 px-2 py-1 overflow-auto flex-1 rounded-lg h-full">
      <div className="text-lg font-bold text-gray-800">
        {"Training - "}
        <span className="text-base text-gray-500">
          {selectedTraining.title}
        </span>
      </div>
      {!selectedTraining.content ? null : (
        <TrainingType content={selectedTraining.content} />
      )}

      {!selectedTraining?.qill ? null : (
        <TrainingQuill quill={selectedTraining.qill} />
      )}

      {/* <div>{JSON.stringify(selectedTraining, null, 2)}</div> */}
    </div>
  );
}
