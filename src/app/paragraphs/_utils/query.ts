"use client";

import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IParagraphItem } from "./interface";
import { useParagraphStore } from "./store";
import { useMainStore } from "@/layouts/main.store";

export const useParagraphQuery = () => {
  const { filter } = useParagraphStore();
  const { userInfo } = useMainStore();

  //Chưa lấy dữ liệu theo ngày

  const getParagraph = useQuery<IParagraphItem[]>({
    queryFn: async () => {
      const res = await axios.post("/api/paragraph/filter", {
        ...filter,
        userId: userInfo?.id,
      });
      return res.data;
    },
    queryKey: ["paragraph", filter, userInfo?.id],
  });

  return { getParagraph };
};
