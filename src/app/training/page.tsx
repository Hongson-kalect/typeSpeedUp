"use client";

import * as React from "react";
import TrainingMenu from "./ui/trainingMenu";
import TrainingMain from "./ui/trainingMain";
import { TrainingType } from "../admin/training/_utils/interface";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

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
    return data.sort((a, b) => a?.title?.localeCompare(b?.title));
  }, [trainingQuery.data]);

  console.log("menuList :>> ", menuList);

  return (
    <div className="px-6 pt-6 flex-1 flex overflow-auto gap-3">
      <TrainingMain />
      <TrainingMenu menuList={menuList} />
    </div>
  );
}
