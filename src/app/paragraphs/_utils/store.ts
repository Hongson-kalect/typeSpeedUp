import { create } from "zustand";
import { ILanguageItem, IParagraphItem } from "./interface";

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
  selectedPara: IParagraphItem | undefined;
  setSelectedPara: (para?: IParagraphItem) => void;
};

export const useParagraphStore = create<IParagraphStore>((set) => ({
  selectedPara: undefined,
  setSelectedPara(para) {
    set({ selectedPara: para });
  },
}));
