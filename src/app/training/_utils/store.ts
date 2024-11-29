import { create } from "zustand";
import { TrainingType } from "./interface";

type IStrainingStore = {
  selectedTraining?: TrainingType;
  setSelectedTraining: (training?: TrainingType) => void;
  isAdd: boolean;
  setIsAdd: (isAdd: boolean) => void;
};

export const useTrainingStore = create<IStrainingStore>((set) => ({
  selectedTraining: undefined,
  setSelectedTraining: (training) =>
    set((state) => {
      if (!training) return { selectedTraining: undefined };
      return { selectedTraining: { ...training } };
      // return { selectedNovel: { ...state.selectedTraining, ...training } };
    }),

  isAdd: false,
  setIsAdd: (isAdd) => set(() => ({ isAdd })),
}));
