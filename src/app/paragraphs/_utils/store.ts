import { create } from "zustand";
import { IParagraphItem } from "./interface";
import { ILanguageItem } from "@/app/language/_utils/interface";

type ILanguageStore = {
  action: "create" | "update";
  setAction: (action: "create" | "update") => void;
  selectedLanguage?: ILanguageItem;
  setSelectedLanguage: (language?: ILanguageItem) => void;
};

export const useLanguageStore = create<ILanguageStore>((set) => ({
  action: "create",
  setAction: (action: "create" | "update") => set({ action }),

  selectedLanguage: undefined,
  setSelectedLanguage: (language?: ILanguageItem) =>
    set({ selectedLanguage: language }),
}));

type IParagraphStore = {
  filter: {
    date: Date;
    search: string;
    favorite: boolean;
    history: boolean;
    yourContent: boolean;
  };
  setFilter: (filter: {
    date: Date;
    search: string;
    favorite: boolean;
    history: boolean;
    yourContent: boolean;
  }) => void;
  selectedPara: IParagraphItem | undefined;
  setSelectedPara: (para?: IParagraphItem) => void;
};

export const useParagraphStore = create<IParagraphStore>((set) => ({
  filter: {
    date: new Date(),
    search: "",
    favorite: false,
    history: false,
    yourContent: false,
  },
  setFilter: (filter) => set({ filter }),
  selectedPara: undefined,
  setSelectedPara(para) {
    set({ selectedPara: para });
  },
}));
