import MainLayout from "@/layouts/main.layout";
import * as React from "react";

export interface ISpeedTestLayoutProps {
  children: React.ReactNode;
}

export default function SpeedTestLayout(props: ISpeedTestLayoutProps) {
  return <MainLayout>{props.children}</MainLayout>;
}
