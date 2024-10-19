import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import * as React from "react";
import { BiTrendingUp } from "react-icons/bi";
import { HiMiniFire } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import { MdEditNote } from "react-icons/md";

export interface ISpeedTestLayoutProps {
  children: React.ReactNode;
}

export default function SpeedTestLayout(props: ISpeedTestLayoutProps) {
  return (
    <div className="flex h-screen w-screen">
      <div>
        <SideBar />
      </div>
      <div className="flex-1 bg-[#F5F6FA] flex flex-col">
        <Header />
        {props.children}
      </div>
    </div>
  );
}

const SideBar = () => {
  return (
    <div className="w-60 pt-5">
      <h1 className="font-bold text-xl text-center">
        <span className="text-blue-500">Type</span>
        <span>Speed</span>
        <span className="text-orange-500">Up</span>
      </h1>

      <div className="nav-list mt-5">
        <SideBarItem
          active
          icon={<IoSearchOutline size={22} />}
          title="Speed test"
          href="/test"
        />
        <SideBarItem
          icon={<MdEditNote size={22} />}
          title="Type paragraphs"
          href="/paragraphs"
        />
        <SideBarItem
          icon={<BiTrendingUp size={22} />}
          title="Tranining"
          href="/training"
        />
      </div>
    </div>
  );
};

type SideBarItemProps = {
  active?: boolean;
  icon?: React.ReactNode;
  title: string;
  href?: string;
};
const SideBarItem = (props: SideBarItemProps) => {
  return (
    <div className="wrapper px-6 relative h-12">
      {props.active ? (
        <div className="absolute rounded-r-lg top-0 left-0 w-1.5 h-full bg-blue-500"></div>
      ) : null}
      <div
        className={`h-full px-4 rounded-lg  bar-item flex items-center gap-4 ${
          props.active ? "bg-blue-500 text-white" : "text-gray-800"
        }`}
      >
        {props.icon}
        <p className="text-sm font-semibold">{props.title}</p>
      </div>
    </div>
  );
};

const Header = () => {
  return (
    <div className="h-16  px-8 bg-white flex items-center justify-between w-full">
      <p className="text-xl font-bold">Go tat</p>
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
              className="bg-gray-400 rounded-full"
              src="/user.png"
              width={40}
              height={40}
              alt="user"
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
