"use client";

import { Header } from "./components/Header";
import Paragraphs from "./components/Paragraphs";

export default function ParagraphsPage() {
  return (
    <div className="px-6 pt-6 flex-1 flex flex-col overflow-auto">
      <div>
        <Header />
      </div>
      <div className="mt-6 flex-1 bg-white overflow-auto rounded-2xl">
        <Paragraphs />
      </div>
    </div>
  );
}
