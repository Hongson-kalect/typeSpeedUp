import { create } from "zustand";
import { IAppUser } from "./main.interface";

export const useMainStore = create<{
  userInfo: IAppUser | null;
  setUserInfo: (data: IAppUser | null) => void;
}>((set) => ({
  userInfo: null,
  setUserInfo: (userInfo) => set({ userInfo }),
}));
