"use client";

import MainLayout from "@/layouts/main.layout";
import * as React from "react";

export interface ILanguageLayoutProps {
  children: React.ReactNode;
}

export default function LanguageLayout(props: ILanguageLayoutProps) {
  return <MainLayout>{props.children}</MainLayout>;
}
