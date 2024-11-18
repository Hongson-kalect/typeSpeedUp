"use client";

import { NovelInfoType } from "@/app/paragraphs/_utils/interface";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useParams } from "next/navigation";
import * as React from "react";
import { BiLeftArrow } from "react-icons/bi";
import NovelInfo from "./ui/novel.info";
import ParaList from "./ui/paralist";
import { useNovelStore } from "../_utils/store";

export interface INovelItemProps {}

export default function NovelItem(props: INovelItemProps) {
  const { selectedNovel, setSelectedNovel } = useNovelStore();
  const params = useParams();

  const novelItem = useQuery<NovelInfoType>({
    queryFn: async () => {
      const res = await axios.get(`/api/novel/${params.id}`);
      setSelectedNovel(res.data);
      return res.data;
    },
    queryKey: ["novel", params.id],
  });

  return (
    <div className="px-6 py-3 flex-1 flex flex-col min-h-0 hide-scrollbar">
      <div className="flex gap-4 text-gray-600 items-center">
        <BiLeftArrow />
        <h2 className="font-bold cursor-pointer">Trở lại</h2>
      </div>
      <div className="flex gap-4 pt-1 flex-1 overflow-auto">
        <NovelInfo novel={novelItem.data} />
        <ParaList paragraphs={novelItem.data?.paragraphs} />
      </div>
    </div>
  );
}
