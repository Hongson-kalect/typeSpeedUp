"use client";

import Link from "next/link";
import { BiLeftArrow } from "react-icons/bi";
import { useNovelStore } from "../_utils/store";
import NovelInfo from "./ui/novel.info";
import ParaList from "./ui/paralist";

export interface INovelItemProps {}

export default function NovelItem(props: INovelItemProps) {
  const { selectedNovel } = useNovelStore();

  return (
    <div className="px-6 py-3 flex-1 flex flex-col min-h-0 hide-scrollbar">
      <Link href={"/novel"}>
        <div className="flex gap-4 text-gray-600 items-center">
          <BiLeftArrow />
          <h2 className="font-bold cursor-pointer">Trở lại</h2>
        </div>
      </Link>
      <div className="flex gap-4 pt-1 flex-1 overflow-auto">
        <NovelInfo novel={selectedNovel} />
        <ParaList paragraphs={selectedNovel?.paragraphs} />
      </div>
    </div>
  );
}
