import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { BiPlus } from "react-icons/bi";
import { FaChevronLeft } from "react-icons/fa";

export interface IAddParagraphsProps {}

export default function AddParagraphs(props: IAddParagraphsProps) {
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
            <Select defaultValue="vi">
              <SelectTrigger className="w-32 border-none outline-none !ring-0 text-sm">
                <SelectValue placeholder="Theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="vi">Viet Nam</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
                <SelectItem value="system">System</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-6 flex h-[200px] items-center gap-4 flex-1 px-4 py-3 rounded-lg bg-white">
          <Textarea
            rows={10}
            placeholder="Viết văn bản của bạn tại đây"
            // className="w-full rounded-lg outline-none p-2"
            style={{ border: "1px solid #aaa" }}
          ></Textarea>
        </div>

        <div className="flex items-center justify-center mt-6">
          <Button size={"lg"} className="bg-blue-600 hover:bg-blue-800">
            <BiPlus />
            <p>Thêm bài viết</p>
          </Button>
        </div>
      </div>
    </div>
  );
}
