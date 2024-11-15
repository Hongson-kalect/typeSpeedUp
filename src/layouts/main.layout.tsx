"use client";

import { CommonSideBar } from "@/components/custom/common.side.bar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import * as React from "react";
import { HiMiniFire } from "react-icons/hi2";
import { useMainStore } from "./main.store";

export interface ILayoutProps {
  children: React.ReactNode;
}

export default function MainLayout(props: ILayoutProps) {
  return (
    <div className="flex h-screen w-screen">
      <div className="h-full">
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
  const { data: session } = useSession();
  const { setUserInfo } = useMainStore();

  const addUser = async () => {
    console.log("session", session);
    if (!session) return;
    const res = await axios.post("/api/appUser", session.user);
    console.log("res :>> ", res);
    setUserInfo(res.data);
  };

  React.useEffect(() => {
    console.log("Get User data");
    // addUser
    addUser();
  }, [session]);

  console.log("session ádasdasdasd:>> ", session);
  return (
    <div className="h-16  px-6 bg-white flex items-center justify-between w-full">
      <p className="text-xl font-bold">Kiểm tra tốc độ gõ</p>
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

        <div
          className="user-info flex gap-2 cursor-pointer"
          onClick={() => {
            signIn("google");
          }}
        >
          <div className="flex items-center justify-center">
            <Image
              className="bg-gray-400 rounded-full"
              src={session?.user?.image ?? ""}
              width={40}
              height={40}
              alt="user"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="user-name text-sm font-bold text-gray-800">
              {session?.user?.name || "Guest Account"}
            </p>
            <p className="text-gray-400 text-xs">
              {session?.user?.email || "Login to save progress"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
