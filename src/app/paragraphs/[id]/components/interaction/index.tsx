import SendButton from "@/app/paragraphs/components/send.button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import * as React from "react";
import { BiStar } from "react-icons/bi";
import { FaFlag } from "react-icons/fa";

export interface IInteractionProps {}

export default function Interaction(props: IInteractionProps) {
  const;
  return (
    <div className="flex gap-4 mt-8">
      <div className="bg-white flex-1 px-4 py-3 rounded-lg">
        <div className="flex justify-between">
          <h2 className=" text-blue-600 font-bold text-lg">COMMENT</h2>
          <div className="flex gap-2 items-center">
            <div className="flex gap-1 items-center cursor-pointer hover:scale-105 duration-200">
              <BiStar className="mb-0.5" />
              <p>Đánh giá</p>
            </div>
            <Button
              size={"sm"}
              className="bg-red-500 text-white hover:bg-red-700"
            >
              <FaFlag size={16} />
              <p className="text-sm">Báo cáo</p>
            </Button>
          </div>
        </div>

        <div>
          <div className="empty-comment text-center flex flex-col justify-center items-center">
            <div className="h-12 w-16 bg-red-400"></div>
            <p className="text-center mt-3">
              Hãy là người đầu tiên nói gì đó về đoạn văn này
            </p>
          </div>
        </div>

        <div className="px-4 flex items-center gap-4 mt-3">
          <Input />
          <SendButton className="h-10 rounded" />
        </div>
      </div>
      <div
        className={`bg-white overflow-hidden w-1/2 px-4 rounded-lg duration-500 ${
          !true ? "h-0" : "h-full"
        }`}
      >
        {/* <div className="py-3">
              <div>
                <h2 className=" text-orange-500 font-bold text-lg">
                  YOUR PARAGRAPHS
                </h2>
              </div>
              <div
                className={`py-2 px-2 rounded bg-blue-50 overflow-hidden duration-500 relative `}
              >
                {userInput}
              </div>
            </div> */}
      </div>
    </div>
  );
}
