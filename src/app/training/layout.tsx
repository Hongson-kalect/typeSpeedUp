import MainLayout from "@/layouts/main.layout";
import * as React from "react";
export interface ISpeedTestLayoutProps {
  children: React.ReactNode;
}

export default function TrainingLayout(props: ISpeedTestLayoutProps) {
  return <MainLayout>{props.children}</MainLayout>;
}
