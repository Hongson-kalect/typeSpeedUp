"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ILanguageItem } from "./interface";

export const useLanguageQuery = () => {
  const getLanguage = useQuery<ILanguageItem[]>({
    queryFn: async () => {
      const res = await axios.get("/api/language");
      return res.data;
    },
    queryKey: ["language"],
  });

  return { getLanguage };
};
