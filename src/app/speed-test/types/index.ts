export interface IResult {
  wordTyped: number;
  charTyped: number;
  wordCorrect: number;
  charCorrect: number;
  wordError: number;
  charError: number;
  wpm: number;
  cpm: number;
  wa: number;
  ca: number;
  score: number | null;
}

export interface IRankItemProps {
  id: number;
  userName: string;
  rank: number;
  wpm: number;
  cpm: number;
  wa: number;
  ca: number;
  score: number;
  attempt: number;
}
