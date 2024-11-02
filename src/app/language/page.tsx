import { Input } from "@/components/ui/input";
import Image from "next/image";
import * as React from "react";
import LanguageHandler from "./ui/handle.language";
import LanguageList from "./ui/list.language";

export default function DefaultPage() {
  return (
    <div className="p-6 flex-1">
      <div className="flex gap-4 h-full">
        <LanguageList />
        <LanguageHandler />
      </div>
    </div>
  );
}
