"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { TrainingType } from "./_utils/interface";
import TrainingModify from "./ui/trainingModify";
import TrainingList from "./ui/trainingList";

export default function DefaultPage() {
  const trainingQuery = useQuery<TrainingType[]>({
    queryFn: async () => {
      const res = await axios.get("/api/training");
      return res.data;
    },
    queryKey: ["training"],
  });

  console.log("trainingQuery.data", trainingQuery.data);

  return (
    <div className="flex gap-3 px-2 py-3 flex-1 min-h-0">
      {/* <h2>Training Menu</h2> */}
      <TrainingModify />
      <TrainingList trainings={trainingQuery.data} />
    </div>
  );
}
