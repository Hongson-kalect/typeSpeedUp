import { create } from "zustand";
import { NovelFilterType } from "./interface";
import { NovelInfoType } from "@/app/paragraphs/_utils/interface";

type INovelStore = {
  novelFilter: NovelFilterType;
  setNovelFilter: (filter: Partial<NovelFilterType>) => void;
  selectedNovel?: NovelInfoType;
  setSelectedNovel: (novel: NovelInfoType) => void;
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

  selectedNovel: undefined,
  setSelectedNovel: (novel) =>set((state)=>{
      if(!state.selectedNovel) return { selectedNovel: {...novel } }; return { selectedNovel: { ...state.selectedNovel, ...novel }}
    })
  
}));
// set((state) => {
//   if(!state.selectedNovel) return { selectedNovel: {...novel } }; return ({ selectedNovel: { ...state.selectedNovel, ...novel }, })
//   }),
