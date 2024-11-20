"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import * as React from "react";
import { BiLeftArrow } from "react-icons/bi";
import { PiPlus } from "react-icons/pi";
import { toast } from "react-toastify";
import { useNovelStore } from "../../_utils/store";
import { useMainStore } from "@/layouts/main.store";
import { useQuery } from "@tanstack/react-query";
import { NovelInfoType } from "@/app/paragraphs/_utils/interface";

export default function AddNovelChapterPage() {
  const { selectedNovel } = useNovelStore();
  //keep novel by zustand will be the best

  return (
    <div className="px-6 py-3 flex-1 flex flex-col min-h-0 hide-scrollbar">
      <Link href={`/novel/${selectedNovel?.id || selectedNovel?._id}`}>
        <div className="flex gap-4 text-gray-600 items-center">
          <BiLeftArrow />
          <h2 className="font-bold cursor-pointer">{selectedNovel?.name}</h2>
        </div>
      </Link>
      {/* <div className="flex gap-4 pt-1 flex-1 overflow-auto bg-white"> */}
      <div className=" bg-white rounded-lg px-4 py-3 flex-1">
        <h1 className="text-xl font-bold text-gray-800 text-center">
          Add Chapter
        </h1>
        <div className="mt-2">
          <AddNovelChapter />
        </div>
      </div>
    </div>
  );
}

const AddNovelChapter = () => {
  const router = useRouter();
  const params = useParams();

  const { selectedNovel, setSelectedNovel } = useNovelStore();
  const { userLanguage } = useMainStore();
  const [novel, setNovel] = React.useState({
    header: "",
    content: "",
    desc: "",
    chapter: (
      Number(
        Math.floor(Number(selectedNovel?.paragraphs?.at(-1)?.chapter) + 1)
      ) || 1
    ).toString(),
    isPrivate: false,
  });
  const getNovel = useQuery<NovelInfoType>({
    queryFn: async () => {
      const res = await axios.get(`/api/novel/${params.id}`);
      setSelectedNovel(res.data);
      return res.data;
    },
    queryKey: ["novel", params.id],
  });

  const handleAddChapter = async () => {
    if (!novel.content && !novel.header && !novel.chapter) return;
    const res = await axios.post(`/api/novel/add-chapter`, {
      ...novel,

      novelId: selectedNovel?._id || selectedNovel?.id,
      language: userLanguage?.id,
    });

    if (res.data) {
      toast.success("Add chapter success");
      getNovel.refetch();
      // setSelectedNovel({ ...selectedNovel, ...res.data });
      router.back();
    }
  };

  if (!novel)
    return (
      <div>
        <p>No Novel Selected</p>
      </div>
    );

  return (
    <div className="px-6 py-3 flex-1 flex flex-col min-h-0 hide-scrollbar">
      <div className="flex flex-col gap-5">
        <div className="flex items-center space-x-2">
          <p className="text-lg text-gray-700">Status:</p>
          <Checkbox
            id="private"
            checked={novel.isPrivate}
            onCheckedChange={(checked) => {
              console.log("checked :>> ", checked);
              setNovel({
                ...novel,
                isPrivate: !!checked,
              });
            }}
          />
          <label
            htmlFor="private"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Private this chapter
          </label>
        </div>

        <div>
          <p className="text-lg text-gray-700">Chap number:</p>
          <Input
            className="mt-1"
            value={novel.chapter}
            onChange={(e) => setNovel({ ...novel, chapter: e.target.value })}
          />
        </div>

        {/* <div>
          <p className="text-lg text-gray-700">Chap number:</p>
          <Input
            className="mt-1"
            value={novel.chap}
            onChange={(e) => setNovel({ ...novel, name: e.target.value })}
          />
        </div> */}

        <div>
          <p className="text-lg text-gray-700">Chap title:</p>
          <Input
            className="mt-1"
            value={novel.header}
            onChange={(e) => setNovel({ ...novel, header: e.target.value })}
          />
        </div>

        <div className="text-lg text-gray-700">
          <p>Chap content:</p>
          <Textarea
            rows={10}
            value={novel.content}
            onChange={(e) => setNovel({ ...novel, content: e.target.value })}
            className="resize-none mt-1"
          />
        </div>

        <div className="mt-5 text-center">
          <Button
            onClick={handleAddChapter}
            size={"lg"}
            className="w-1/2 bg-orange-600 hover:bg-orange-700"
          >
            <PiPlus />
            <p className="text-lg">Add Chapter</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
