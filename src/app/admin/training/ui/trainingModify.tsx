"use client";

import * as React from "react";
import { useAdminTrainingStore } from "../_utils/store";
import { Input } from "@/components/ui/input";
import { TrainingType } from "../_utils/interface";
// import Editor from "@/components/ui/quill";
import { Button } from "@/components/ui/button";
import { BiEdit, BiPlus } from "react-icons/bi";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { UseQueryResult } from "@tanstack/react-query";

export interface ITrainingModifyProps {
  query: UseQueryResult<TrainingType[], unknown>;
}

export default function TrainingModify(props: ITrainingModifyProps) {
  const Editor = React.useMemo(
    () => React.lazy(() => import("@/components/ui/quill")),
    []
  );
  const { selectedTraining, isAdd, setIsAdd, setSelectedTraining } =
    useAdminTrainingStore();

  const [modifyTraining, setModifyTraining] = React.useState<
    TrainingType | undefined
  >(selectedTraining);

  const handleModifyTraining = async () => {
    if (isAdd) {
      const res = await axios.post("/api/training", {
        ...modifyTraining,
        parentId: selectedTraining?.id,
      });
      if (res.data) {
        setIsAdd(false);
        setSelectedTraining(res.data);
      }
    } else {
      if (!selectedTraining) return toast.error("Chưa chọn training");
      const { id, children, ...rest } = modifyTraining;
      const res = await axios.put("/api/training/" + selectedTraining.id, rest);
      if (res.data) setSelectedTraining(res.data);
    }
    props.query.refetch();
  };

  const handleDeleteTraining = async () => {
    if (selectedTraining) {
      await axios.delete("/api/training/" + selectedTraining.id);
      props.query.refetch();
      setIsAdd(false);
      setSelectedTraining(undefined);
    }
  };

  React.useEffect(() => {
    if (isAdd) {
      setModifyTraining({
        // ...modifyTraining,
        title: "",
        content: "",
        qill: "",
      });
    } else {
      setModifyTraining({ ...selectedTraining });
    }
  }, [selectedTraining]);

  if (!isAdd && !selectedTraining)
    return (
      <div className="flex-1 bg-white px-4 py-3 rounded-lg">
        Please select a training
      </div>
    );

  return (
    <div className="flex-1 bg-white px-4 py-3 rounded-lg">
      <h2 className="text-center border-b text-xl pb-2 mb-3">
        {isAdd ? "Add training" : "Edit training"}
      </h2>

      <div>
        <p>Training title</p>
        <Input
          className="text-lg font-medium text-gray-800"
          value={modifyTraining?.title || ""}
          onChange={(e) =>
            setModifyTraining((prev) => {
              if (prev) return { ...prev, title: e.target.value };
              return { title: e.target.value };
            })
          }
        />
      </div>
      <div className="mt-3">
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
      <div className="mt-3">
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
      <div className="mt-4 flex items-center justify-center gap-2">
        <Button
          className={`${isAdd ? "bg-green-500" : "bg-orange-500"}`}
          size={"lg"}
          onClick={handleModifyTraining}
        >
          {isAdd ? <BiPlus /> : <BiEdit />}
          {isAdd ? "Add training" : "Edit training"}
        </Button>
        <Button
          className={`bg-red-500`}
          size={"lg"}
          onClick={handleDeleteTraining}
        >
          <MdDelete />
          {/* {isAdd ? "Add training" : "Edit training"} */}
        </Button>
      </div>
    </div>
  );
}
