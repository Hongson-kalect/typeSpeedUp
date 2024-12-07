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

  const menuList = React.useMemo(() => {
    if (!trainingQuery.data) return [];

    const menuLists = JSON.parse(JSON.stringify(trainingQuery.data));
    const data: TrainingType[] = [];

    menuLists
      .sort((a: TrainingType, b: TrainingType) =>
        a?.title?.localeCompare(b?.title)
      )
      .map((item: TrainingType) => {
        if (item?.parentId) {
          const parent = menuLists.find(
            (parent: TrainingType) => item.parentId === parent.id
          );
          if (parent) {
            if (!parent?.children) parent.children = [];

            parent.children.push(item);
          }
        } else {
          data.push(item);
        }
      });
    return data;
  }, [trainingQuery.data]);

  return (
    <div className="flex gap-3 px-2 py-3 flex-1 min-h-0">
      {/* <h2>Training Menu</h2> */}
      <TrainingModify query={trainingQuery} />
      <TrainingList trainings={menuList} />
    </div>
  );
}
