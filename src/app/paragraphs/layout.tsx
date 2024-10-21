"use client";

import { CommonSideBar } from "@/components/custom/common.side.bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import * as React from "react";
import { HiMiniFire } from "react-icons/hi2";

export interface ISpeedTestLayoutProps {
  children: React.ReactNode;
}

export default function ParagraphsLayout(props: ISpeedTestLayoutProps) {
  return (
    <div className="flex h-screen w-screen">
      <div>
        <CommonSideBar />
      </div>
      <div className="flex-1 bg-[#d5ddff] flex flex-col">
        <Header />
        {props.children}
      </div>
    </div>
  );
}

const Header = () => {
  return (
    <div className="h-16  px-6 bg-white flex items-center justify-between w-full">
      <p className="text-xl font-bold">Gõ theo đoạn văn bản</p>
      <div className="flex items-center gap-2">
        <div className="streak relative">
          <HiMiniFire size={32} className="text-red-600" />
          <span
            className="absolute top-0 right-0 bg-white text-red-600 text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center"
            style={{ border: "1px solid red" }}
          >
            2
          </span>
        </div>
        <div className="language h-7 w-16 bg-gray-400 rounded"></div>
        <Select defaultValue="vi">
          <SelectTrigger className="w-[120px] h-8 border-none outline-none !ring-0">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vi">Viet Nam</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>

        <div className="user-info flex gap-2">
          <div className="flex items-center justify-center">
            <Image
              className="bg-gray-400 rounded-full object-cover w-10 h-10"
              src="https://th.bing.com/th/id/OIP.SIQlKH33GB2cq4eWyCaLxAHaEK?rs=1&pid=ImgDetMain"
              alt="user"
              width={40}
              height={40}
              style={{ border: "1px solid #ddd" }}
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="user-name text-sm font-bold text-gray-800">
              Guest Account
            </p>
            <p className="text-gray-400 text-xs">Login to save your progress</p>
          </div>
        </div>
      </div>
    </div>
  );
};
