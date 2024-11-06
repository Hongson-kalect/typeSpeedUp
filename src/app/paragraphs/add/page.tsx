"use client";

import { ILanguageItem } from "@/app/language/_utils/interface";
import { useLanguageQuery } from "@/app/language/_utils/query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { BiPlus } from "react-icons/bi";
import { FaChevronLeft } from "react-icons/fa";
import { toast } from "react-toastify";

export interface IAddParagraphsProps {}

export default function AddParagraphs(props: IAddParagraphsProps) {
  const [header, setHeader] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [content, setContent] = React.useState("");
  const [language, setLanguage] = React.useState(() => {
    return "";
    //set user default language
  });

  const getLanguage = useQuery<ILanguageItem[]>({
    queryFn: async () => {
      const res = await axios.get("/api/language");
      return res.data;
    },
    queryKey: ["language"],
  });

  const handleAddNovel = useMutation({
    mutationFn: async () => {
      const res = await axios.post("/api/novel", {
        language: language,
        header,
        title,
        content,
      });
      return res.data;
    },
    onSuccess: () => {
      toast.success("Add paragraph success");
    },
  });

  React.useEffect(() => {
    //return set user default language

    if (getLanguage.data) {
      setLanguage(getLanguage.data[0].id || "");
    }
  }, [getLanguage.data]);
  return (
    <div>
      <div className="flex flex-col p-4 flex-1">
        <div className="flex items-center gap-4 flex-1 pt-3 rounded-lg">
          <FaChevronLeft size={12} className="text-gray-500" />
          <p className="text-gray-700">Thêm bài viết</p>
        </div>

        <div className="flex items-center gap-4 flex-1 px-4 py-3 rounded-lg bg-white">
          <div className="language flex gap-2 items-center">
            <p className="font-medium text-lg">Language:</p>
            <Select defaultValue={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-32 border-none outline-none !ring-0 text-sm">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                {getLanguage?.data &&
                  getLanguage?.data.map((item) => (
                    <SelectItem key={item.id} value={item.id || ""}>
                      {item.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-6 gap-4 flex-1 px-4 py-3 rounded-lg bg-white">
          <p className="text-xl font-bold text-blue-800">Tên bài viết</p>
          <Input
            className="text-lg font-semibold text-blue-800"
            placeholder="Tên bài viết"
            value={header}
            onChange={(e) => setHeader(e.target.value)}
            style={{ border: "1px solid #aaa" }}
          />
        </div>

        <div className="mt-6 gap-4 flex-1 px-4 py-3 rounded-lg bg-white">
          <p>Tiêu đề</p>
          <Input
            className="text-lg text-gray-800"
            placeholder="Tiêu đề"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            // className="w-full rounded-lg outline-none p-2"
            style={{ border: "1px solid #aaa" }}
          />
        </div>

        <div className="mt-6 flex h-[200px] items-center gap-4 flex-1 px-4 py-3 rounded-lg bg-white">
          <Textarea
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Viết văn bản của bạn tại đây"
            // className="w-full rounded-lg outline-none p-2"
            style={{ border: "1px solid #aaa" }}
          ></Textarea>
        </div>

        <div className="flex items-center justify-center mt-6">
          <Button
            size={"lg"}
            className="bg-blue-600 hover:bg-blue-800"
            onClick={() => handleAddNovel.mutate()}
          >
            <BiPlus />
            <p>Thêm bài viết</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
