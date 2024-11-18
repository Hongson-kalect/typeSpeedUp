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

export type ParaInfoType = {
  _id: string;
  id: string;
  language: LanguageInfoType;
  header: string;
  content: string;
  desc: string;
  chapter: string;
  rate: number;
  rateTime: number;
  prev?: string;
  next?: string;
  isPrivate: false;
  completed: number;
  userId: string;
  createdAt: string;
  updatedAt: string;
  novelId: string;
  novel: NovelInfoType;
};

export type NovelInfoType = {
  _id: string;
  id: string;
  createdAt: string;
  defaultLanguageId: string;
  desc?: string;
  status: string;
  isDeleted: boolean;
  isPrivate: boolean;
  level: string;
  name: string;
  price: string;
  like: number;
  favorite: number;
  tag: string;
  unit: string;
  chapterCount: number | string;
  firstChapter: ParaInfoType;
  lastChapter: ParaInfoType;
  paragraphs?: ParaInfoType[];
  updatedAt: string;
  userId: string;
};

export type LanguageInfoType = {
  code: string;
  createdAt: string;
  desc: string;
  flag: string;
  id: string;
  isDeleted: boolean;
  name: string;
  updatedAt: string;
};

export type ScoreInfoType = {
  cAccuracy: number;
  cpm: number;
  score: number;
  targetId: string;
  time: number;
  type: string;
  userId: string;
  wAccuracy: number;
  wpm: number;
  rank?: string | number;
};
