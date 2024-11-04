"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import * as React from "react";
import LanguageHandler from "./ui/handle.language";
import LanguageList from "./ui/list.language";
import { ILanguageItem } from "./_utils/interface";

export default function DefaultPage() {
  const [selectedLanguage, setSelectedLanguage] = React.useState<
    ILanguageItem | undefined
  >();
  const [action, setAction] = React.useState<"create" | "update">("create");

  const setLanguage = (item: ILanguageItem) => {
    setSelectedLanguage(item);
    setAction("update");
  };

  return (
    <div className="p-6 flex-1 overflow-auto">
      <div className="flex gap-4 h-full overflow-auto">
        <LanguageList
          setLanguage={(item: ILanguageItem) => setLanguage(item)}
        />
        <LanguageHandler language={selectedLanguage} action={action} />
      </div>
    </div>
  );
}
