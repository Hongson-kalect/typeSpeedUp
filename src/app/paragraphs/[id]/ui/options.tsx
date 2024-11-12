import { StarIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { PiStarFill } from "react-icons/pi";

export interface INovelOptionsProps {}

export default function NovelOptions(props: INovelOptionsProps) {
  return (
    <div className="options bg-white rounded-lg w-full pl-3 pr-5  py-4 relative">
      <h2 className="line-clamp-2 text-xl font-medium text-gray-600">
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

      <div className="absolute favor top-1 right-1">
        <PiStarFill color="#ff4aa4" size={24} />
      </div>
    </div>
  );
}
