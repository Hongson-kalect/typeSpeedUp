"use client";

import { NovelInfoType } from "@/app/paragraphs/_utils/interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import * as React from "react";

export interface INovelItemProps {}

export default function NovelItem(props: INovelItemProps) {
  const params = useParams();

  const novelItem = useQuery<NovelInfoType>({
    queryFn: async () => {
      const res = await axios.get(`/api/novel/${params.id}`);
      return res.data;
    },
    queryKey: ["novel", params.id],
  });

  console.log("novelItem :>> ", novelItem);
  return <div className="px-4 py-3">novel item</div>;
}
