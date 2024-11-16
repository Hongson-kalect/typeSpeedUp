"use client";

import * as React from "react";
import { Header } from "./ui/header";
import { NovelList } from "./ui/novel.list";

export default function DefaultPage() {
  return (
    <div className="px-6 pt-6 flex-1 flex flex-col overflow-auto">
      <div>
        <Header />
      </div>
      <div className="mt-6 flex-1 bg-white  rounded-2xl">
        <NovelList />
      </div>
    </div>
  );
}
