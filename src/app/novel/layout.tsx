"use client";

import MainLayout from "@/layouts/main.layout";
import * as React from "react";

export interface ISpeedTestLayoutProps {
  children: React.ReactNode;
}

export default function ParagraphsLayout(props: ISpeedTestLayoutProps) {
  return <MainLayout>{props.children}</MainLayout>;
}
