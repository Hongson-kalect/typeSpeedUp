"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMainStore } from "@/layouts/main.store";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { BiLeftArrow, BiPlus } from "react-icons/bi";
import { toast } from "react-toastify";

export default function CreateNovelPage() {
  //keep novel by zustand will be the best

  return (
    <div className="px-6 py-3 flex-1 flex flex-col min-h-0 hide-scrollbar">
      <Link href={`/novel`}>
        <div className="flex gap-4 text-gray-600 items-center">
          <BiLeftArrow />
          <h2 className="font-bold cursor-pointer">{"Novel List"}</h2>
        </div>
      </Link>
      {/* <div className="flex gap-4 pt-1 flex-1 overflow-auto bg-white"> */}
      <div className=" bg-white rounded-lg px-4 py-3 flex-1">
        <h1 className="text-xl font-bold text-gray-800 text-center">
          Create Novel
        </h1>
        <div className="mt-2">
          <CreateNovel />
        </div>
      </div>
    </div>
  );
}

//Add para may have fixed width
const CreateNovel = () => {
  const router = useRouter();
  const { userInfo } = useMainStore();

  const [novelInfo, setNovelInfo] = React.useState({
    name: "",
    isPrivate: false,
    desc: "",
  });

  const createNovel = async () => {
    console.log("userInfo?.language?.id :>> ", userInfo?.language?.id);

    await axios.post("/api/novel", {
      ...novelInfo,
      userId: userInfo?.id,
      languageId: userInfo?.language?.id,
    });
    toast.success("Create Novel Success");
    router.back();
  };

  return (
    <div className="px-6 py-3 flex-1 flex flex-col min-h-0 hide-scrollbar bg-white">
      <div className="flex flex-col gap-5">
        <div className="flex items-center space-x-2">
          <p className="text-lg text-gray-700">Status:</p>
          <Checkbox
            id="private"
            checked={novelInfo.isPrivate}
            onCheckedChange={(checked) => {
              console.log("checked :>> ", checked);
              setNovelInfo({
                ...novelInfo,
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
            value={novelInfo.name}
            onChange={(e) =>
              setNovelInfo({ ...novelInfo, name: e.target.value })
            }
          />
        </div>

        <div className="text-lg text-gray-700">
          <p>Description:</p>
          <Textarea
            rows={10}
            value={novelInfo.desc}
            onChange={(e) =>
              setNovelInfo({ ...novelInfo, desc: e.target.value })
            }
            className="resize-none mt-1"
          />
        </div>

        <div className="mt-5 text-center">
          <Button
            onClick={createNovel}
            size={"lg"}
            className="w-1/2 bg-orange-600 hover:bg-orange-700"
          >
            <BiPlus />
            <p className="text-lg">Create Novel</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
