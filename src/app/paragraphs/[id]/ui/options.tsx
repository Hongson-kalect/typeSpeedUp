"use client";

import { Button } from "@/components/ui/button";
import { StarIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { BiLike } from "react-icons/bi";
import { FaFlag } from "react-icons/fa";
import { PiStarFill } from "react-icons/pi";

export interface INovelOptionsProps {}

export default function NovelOptions(props: INovelOptionsProps) {
  return (
    <div className="options bg-white rounded-lg w-full pl-3 pr-5  pt-4 pb-2 relative">
      <h2 className="line-clamp-2 text-xl font-medium text-gray-600 cursor-pointer">
        Từ ấy trong tôi bừng nắng hạ, Mặt trời chân lí chói qua tim, chói chang,
        cí lùm mía
      </h2>
      <div className="flex items-center justify-center mb-3 mt-5">
        <div className="h-24 w-48 bg-gray-400">Img desc</div>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-sm text-gray-500 w-24">Uploader:</p>
        <p className="font-bold text-gray-800">Phùng Quốc Hùng</p>
      </div>
      <div className="flex gap-2">
        <p className="text-sm text-gray-500 w-24 ">Chapter:</p>
        <p className="font-bold text-blue-500">14</p>
      </div>
      <div className="flex gap-2">
        <p className="text-sm text-gray-500 w-24">Status:</p>
        <p className="text-green-500 italic">Completed</p>
      </div>
      <div className="flex gap-2">
        <p className="text-sm text-gray-500 w-24">Description:</p>
        <p className="line-clamp-3 text-sm">
          Kể về Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit
          ipsum accusamus natus, magni recusandae odit neque laborum molestias
          deserunt aperiam minus sint. Optio odit itaque necessitatibus beatae
          fuga, nisi sint.
        </p>
      </div>

      <div className="options flex items-end justify-between mt-4">
        <div className="flex gap-4">
          <div className="flex items-center gap-1 cursor-pointer hover:bg-blue-50 duration-150 px-1 text-sm py-1 rounded-md">
            <BiLike /> Liked
            <div className="h-full flex items-center justify-center rounded-[50%] bg-gray-100 px-2 py-1">
              <p className="text-xs">1000</p>
            </div>
          </div>
          <div className="flex items-center gap-1 cursor-pointer hover:bg-purple-50 duration-150 px-1 text-sm py-1 rounded-md">
            <StarIcon /> Follow
            <div className="h-full flex items-center justify-center rounded-[50%] bg-gray-100 px-2 py-1">
              <p className="text-xs">1000</p>
            </div>
          </div>
        </div>
        <div className="report">
          <Button
            size={"sm"}
            className="bg-red-500 text-white hover:bg-red-700"
          >
            <FaFlag size={16} />
            <p className="text-sm">Báo cáo</p>
          </Button>
        </div>
      </div>

      <div className="absolute favor top-1 right-1">
        <PiStarFill color="#ff4aa4" size={24} />
      </div>
    </div>
  );
}
