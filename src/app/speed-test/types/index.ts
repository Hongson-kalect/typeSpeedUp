export interface IResult {
  time?: number;
  wordTyped: number;
  charTyped: number;
  wordCorrect: number;
  charCorrect: number;
  wordError: number;
  charError: number;
  wpm: number;
  cpm: number;
  wAccuracy: number;
  cAccuracy: number;
  score: number | null;
}

export interface IUser {
  id: string;
  name?: string;
  email?: string;
  emailVerified: Date;
  image?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type IRank = IResult & {
  user: IUser;
  wAccuracy: number;
  cAccuracy: number;
};

export interface IRankItemProps {
  id: number;
  userName: string;
  rank: number;
  wpm: number;
  cpm: number;
  wAccuracy: number;
  cAccuracy: number;
  score: number;
  attempt: number;
}
