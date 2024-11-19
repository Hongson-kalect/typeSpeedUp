"use client";

import * as React from "react";
import { useNovelStore } from "../_utils/store";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { NovelInfoType } from "@/app/paragraphs/_utils/interface";
import axios from "axios";

export interface INovelItemLayoutProps {
  children: React.ReactNode;
}

export default function NovelItemLayout(props: INovelItemLayoutProps) {
  const { setSelectedNovel } = useNovelStore();
  const params = useParams();

  useQuery<NovelInfoType>({
    queryFn: async () => {
      const res = await axios.get(`/api/novel/${params.id}`);
      setSelectedNovel(res.data);
      return res.data;
    },
    queryKey: ["novel", params.id],
  });

  return props.children;
}
