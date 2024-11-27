"use client";

import * as React from "react";
import { useTrainingStore } from "../_utils/store";
import { Input } from "@/components/ui/input";
import { TrainingType } from "../_utils/interface";
import Editor from "@/components/ui/quill";

export interface ITrainingModifyProps {}

export default function TrainingModify(props: ITrainingModifyProps) {
  const { selectedTraining } = useTrainingStore();

  const [modifyTraining, setModifyTraining] = React.useState<
    TrainingType | undefined
  >(selectedTraining);

  React.useEffect(() => {
    setModifyTraining(selectedTraining);
  }, [selectedTraining]);
  return (
    <div className="flex-1 bg-white px-4 py-3 rounded-lg">
      <h2 className="text-center border-b text-xl pb-2 mb-3">
        Training modify
      </h2>

      <div>
        <p>Training title</p>
        <Input
          value={modifyTraining?.title || ""}
          onChange={(e) =>
            setModifyTraining((prev) => {
              if (prev) return { ...prev, title: e.target.value };
              return { title: e.target.value };
            })
          }
        />
      </div>
      <div>
        <p>Training content</p>
        <Input
          value={modifyTraining?.content || ""}
          onChange={(e) =>
            setModifyTraining((prev) => {
              if (prev) return { ...prev, content: e.target.value };
              return { content: e.target.value };
            })
          }
        />
      </div>
      <div>
        <p>Training quill</p>
        <Editor
          value={modifyTraining?.qill || ""}
          onChange={(value) =>
            setModifyTraining((prev) => {
              if (prev) return { ...prev, qill: value };
              return { qill: value };
            })
          }
        />

        {/* <Input
          value={modifyTraining?.qill || ""}
          onChange={(e) =>
            setModifyTraining((prev) => {
              if (prev) return { ...prev, qill: e.target.value };
              return { qill: e.target.value };
            })
          }
        /> */}
      </div>
      {JSON.stringify(selectedTraining)}
    </div>
  );
}
