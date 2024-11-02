import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useLanguageQuery = () => {
  const getLanguage = useQuery({
    queryFn: () => {
      axios.get("/api/language").then((res) => res.data);
    },
  });
  return { getLanguage };
};
