"use client";

import * as React from "react";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { NovelInfoType } from "@/app/paragraphs/_utils/interface";
import axios from "axios";
import { useParagraphStore } from "../_utils/store";

export interface INovelItemLayoutProps {
  children: React.ReactNode;
}

export default function NovelItemLayout(props: INovelItemLayoutProps) {
  const { setSelectedPara } = useParagraphStore();
  const params = useParams();

  useQuery<NovelInfoType>({
    queryFn: async () => {
      const res = await axios.get(`/api/paragraph/${params.id}`);
      setSelectedPara(res.data);
      return res.data;
    },
    queryKey: ["novel", params.id],
  });

  return props.children;
}
