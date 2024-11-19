"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { BiLeftArrow } from "react-icons/bi";
import { useNovelStore } from "../../_utils/store";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";

export default function EditParagraph() {
  //keep novel by zustand will be the best

  return (
    <div className="px-6 py-3 flex-1 flex flex-col min-h-0 hide-scrollbar">
      <Link href={"/novel"}>
        <div className="flex gap-4 text-gray-600 items-center">
          <BiLeftArrow />
          <h2 className="font-bold cursor-pointer">{"Novel Name"}</h2>
        </div>
      </Link>
      {/* <div className="flex gap-4 pt-1 flex-1 overflow-auto bg-white"> */}
      <div className=" bg-white rounded-lg px-4 py-3 flex-1">
        <h1 className="text-xl font-bold text-gray-800 text-center">
          Edit Paragraph
        </h1>
        <div className="mt-2">
          <EditPara />
        </div>
      </div>
    </div>
  );
}

//Edit para may have fixed width
const EditPara = () => {
  const { selectedNovel, setSelectedNovel } = useNovelStore();
  console.log("selectedNovel :>> ", selectedNovel);

  if (!selectedNovel)
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
            checked={selectedNovel.isPrivate}
            onCheckedChange={(checked) => {
              console.log("checked :>> ", checked);
              setSelectedNovel({
                ...selectedNovel,
                isPrivate: !!checked,
              });
            }}
          />
          <label
            htmlFor="private"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Private this novel
          </label>
        </div>

        <div>
          <p className="text-lg text-gray-700">Name:</p>
          <Input
            className="mt-1"
            value={selectedNovel.name}
            onChange={(e) =>
              setSelectedNovel({ ...selectedNovel, name: e.target.value })
            }
          />
        </div>

        <div className="text-lg text-gray-700">
          <p>Description:</p>
          <Textarea
            rows={10}
            value={selectedNovel.desc}
            onChange={(e) =>
              setSelectedNovel({ ...selectedNovel, desc: e.target.value })
            }
            className="resize-none mt-1"
          />
        </div>

        <div className="mt-5 text-center">
          <Button
            size={"lg"}
            className="w-1/2 bg-orange-600 hover:bg-orange-700"
          >
            <p className="text-lg">Update Paragraph</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
