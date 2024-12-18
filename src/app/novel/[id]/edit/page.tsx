"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { BiEdit, BiLeftArrow } from "react-icons/bi";
import { useNovelStore } from "../../_utils/store";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function EditNovelPage() {
  const { selectedNovel } = useNovelStore();
  //keep novel by zustand will be the best

  return (
    <div className="px-6 py-3 flex-1 flex flex-col min-h-0 hide-scrollbar">
      <Link href={`/novel/${selectedNovel?.id || selectedNovel?._id}`}>
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
          <EditNovel />
        </div>
      </div>
    </div>
  );
}

//Edit para may have fixed width
const EditNovel = () => {
  const router = useRouter();

  const { selectedNovel, setSelectedNovel } = useNovelStore();
  const [editNovel, setEditNovel] = React.useState(selectedNovel);

  const handleEditNovel = async () => {
    if (!editNovel) return;
    const res = await axios.put(`/api/novel/${editNovel._id || editNovel.id}`, {
      name: editNovel.name,
      desc: editNovel.desc,
      // isPrivate: editNovel.isPrivate, // chưa có cái này
    });

    if (res.data) {
      toast.success("Edit Novel Success");
      setSelectedNovel({ ...selectedNovel, ...res.data });
      router.back();
    }
  };

  if (!editNovel)
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
            checked={editNovel.isPrivate}
            onCheckedChange={(checked) => {
              console.log("checked :>> ", checked);
              setEditNovel({
                ...editNovel,
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
            value={editNovel.name}
            onChange={(e) =>
              setEditNovel({ ...editNovel, name: e.target.value })
            }
          />
        </div>

        <div className="text-lg text-gray-700">
          <p>Description:</p>
          <Textarea
            rows={10}
            value={editNovel.desc}
            onChange={(e) =>
              setEditNovel({ ...editNovel, desc: e.target.value })
            }
            className="resize-none mt-1"
          />
        </div>

        <div className="mt-5 text-center">
          <Button
            onClick={handleEditNovel}
            size={"lg"}
            className="w-1/2 bg-orange-600 hover:bg-orange-700"
          >
            <BiEdit />
            <p className="text-lg">Update Novel</p>
          </Button>
        </div>
      </div>
    </div>
  );
};
