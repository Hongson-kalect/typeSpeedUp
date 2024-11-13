import { ILanguageItem } from "@/app/language/_utils/interface";

export type IParagraphItem = {
  isDeleted?: boolean;
  id?: string;
  languageId: string;
  language: ILanguageItem;
  header: string;
  content: string;
  desc: string;
  rate: string;
  rateTime: string;
  userId: string;
  // user      User
  novelId: string;
  // novel Novel
  createdAt?: Date;
  updatedAt?: Date;
};

export type ResultType = {
  time?: number;
  wpm: number;
  cpm: number;
  wAccuracy: number;
  cAccuracy: number;
  score: number;
  failChar: number;
  failWord: number;
  correctChar: number;
  correctWord: number;
};
