import MainLayout from "@/layouts/main.layout";
import * as React from "react";

export interface IDefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout(props: IDefaultLayoutProps) {
  return <MainLayout>{props.children}</MainLayout>;
}
