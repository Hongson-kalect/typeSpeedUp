import * as React from "react";

export interface ITrainingQuillProps {
  quill: string;
}

export default function TrainingQuill(props: ITrainingQuillProps) {
  return (
    <div>
      Training Quill
      <div>{props.quill}</div>
    </div>
  );
}
