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
