"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { IParagraphItem } from "./interface";

export const useParagraphQuery = () => {
  const getParagraph = useQuery<IParagraphItem[]>({
    queryFn: async () => {
      const res = await axios.get("/api/paragraph");
      return res.data;
    },
    queryKey: ["paragraph"],
  });

  return { getParagraph };
};
