"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMainStore } from "@/layouts/main.store";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import * as React from "react";
import { BiEdit, BiPlus } from "react-icons/bi";
import { FaChevronLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { IParagraphItem } from "../../_utils/interface";
import { useParagraphStore } from "../../_utils/store";

export default function AddParagraphs() {
  const router = useRouter();
  const { userInfo } = useMainStore();
  const { selectedPara } = useParagraphStore();
  const [editItem, setEditItem] = React.useState<IParagraphItem>(
    JSON.parse(JSON.stringify(selectedPara || ""))
  );

  const handleEditNovel = useMutation({
    mutationFn: async () => {
      const res = await axios.put("/api/paragraph/" + editItem?.id, {
        // languageId: userLanguage?.id,
        header: editItem?.header,
        content: editItem?.content,
        // userId: userInfo?.id,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Edit paragraph success");
      // setSelectedPara
      router.back();
    },
  });

  React.useEffect(() => {
    setEditItem((prev) => ({ ...prev, ...selectedPara }));
  }, [selectedPara]);
  return (
    <div>
      {userInfo?.id ? null : (
        // popup đăng nhập để tạo cái này
        <div></div>
      )}
      <div className="flex flex-col p-4 flex-1">
        <div className="flex items-center gap-4 flex-1 pt-3 rounded-lg">
          <FaChevronLeft size={12} className="text-gray-500" />
          <p className="text-gray-700">Sửa bài viết</p>
        </div>
        <div className="mt-2 gap-4 flex-1 px-4 py-2 rounded-lg bg-white">
          <p className="font-medium text-blue-500">Tên bài viết</p>
          <Input
            spellCheck={false}
            className="font-bold text-gray-800 mt-1"
            // placeholder="Tên bài viết"
            value={editItem.header}
            onChange={(e) =>
              setEditItem((prev) => ({ ...prev, header: e.target.value }))
            }
            style={{ border: "1px solid #aaa" }}
          />
        </div>

        {/* <div className="mt-6 gap-4 flex-1 px-4 py-3 rounded-lg bg-white">
          <p>Tiêu đề</p>
          <Input
            className="text-lg text-gray-800"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // className="w-full rounded-lg outline-none p-2"
            style={{ border: "1px solid #aaa" }}
          />
        </div> */}

        <div className="mt-6 flex h-[200px] items-center gap-4 flex-1 px-4 py-3 rounded-lg bg-white">
          <Textarea
            rows={10}
            spellCheck={false}
            value={editItem.content}
            onChange={(e) =>
              setEditItem((prev) => ({ ...prev, content: e.target.value }))
            }
            placeholder="Viết văn bản của bạn tại đây"
            // className="w-full rounded-lg outline-none p-2"
            style={{ border: "1px solid #aaa" }}
          ></Textarea>
        </div>

        <div className="flex items-center justify-center mt-6">
          <Button
            size={"lg"}
            className="bg-orange-600 hover:bg-orange-800"
            onClick={() => {
              if (!userInfo?.id) {
                alert("Please login first, hiện giao diện đăng nhập nọ kia");
              } else handleEditNovel.mutate();
            }}
          >
            <BiEdit />
            <p>Sửa bài viết</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
