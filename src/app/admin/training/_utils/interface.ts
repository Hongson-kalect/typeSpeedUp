export type TrainingType = {
  isDeleted: boolean;
  id: number;
  title: string;
  qill?: string;
  index?: string;
  content?: string;
  parentId?: number;
  parent?: TrainingType;
  children: TrainingType[];
  createdAt: Date;
  updatedAt: Date;
};
