import { create } from "zustand";
import { NovelFilterType } from "./interface";

type INovelStore = {
  novelFilter: NovelFilterType;
  setNovelFilter: (filter: Partial<NovelFilterType>) => void;
};

export const useNovelStore = create<INovelStore>((set) => ({
  novelFilter: {
    keyword: "",
    sort: "createdAt",
    order: "desc",
  },
  setNovelFilter: (filter: Partial<NovelFilterType>) =>
    set((state) => ({
      novelFilter: { ...state.novelFilter, ...filter },
    })),
}));
