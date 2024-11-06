"use client";

import Keyboard from "@/components/custom/keyboard";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import Link from "next/link";
import * as React from "react";
import { CiSearch } from "react-icons/ci";
import { FaUnlock, FaUser } from "react-icons/fa";
import { IoIosPricetags, IoMdStar } from "react-icons/io";
import { PiPlus } from "react-icons/pi";
import { RiHistoryFill } from "react-icons/ri";
import { useParagraphQuery } from "./_utils/query";
import { IParagraphItem } from "./_utils/interface";

export interface IParagraphsPageProps {}

export default function ParagraphsPage(props: IParagraphsPageProps) {
  return (
    <div className="px-6 pt-6 flex-1 flex flex-col">
      <div>
        <Header />
      </div>
      <div className="mt-6 flex-1 bg-white  rounded-2xl">
        <ParagraphsList />
      </div>
    </div>
  );
}

const Header = () => {
  const [date, setDate] = React.useState(new Date());
  const [isRange, setIsRange] = React.useState(false);
  return (
    <div
      id="para-header"
      className="bg-white rounded-lg p-4 py-2 flex justify-between"
    >
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
      <div className="flex items-center justify-center gap-2">
        <p className="font-medium text-lg">Time:</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[120px] justify-start text-left text-xs",
                !date && "text-muted-foreground"
              )}
            >
              {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
              {date ? (
                date.getFullYear() +
                "-" +
                date.getMonth().toString().padStart(2, "0") +
                "-" +
                date.getDate()
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Link href="/paragraphs/add">
          <Button className="bg-blue-600 hover:bg-blue-800">
            <PiPlus /> <p>Add paragraphs</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};

const ParagraphsList = () => {
  const { getParagraph } = useParagraphQuery();

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col">
      <div className="filter rounded-3xl flex items-center justify-between">
        <div
          className="search bg-gray-100 flex items-center gap-4 rounded-full px-6 w-80"
          style={{ border: "1px solid #dddddd" }}
        >
          <CiSearch size={28} className="text-gray-500" />
          <input
            placeholder="search text"
            className="w-[40%] bg-transparent h-10 outline-none border-none flex-1"
          />
        </div>

        <div className="flex items-center justify-center gap-2">
          <div
            className="p-1 rounded-xl px-2 bg-blue-50 flex items-center justify-center gap-2"
            style={{ border: "1px solid #aaa" }}
          >
            <Options
              content={
                <IoIosPricetags
                  size={24}
                  // color="#555"
                  className="text-gray-500 hover:text-black cursor-pointer"
                />
              }
              tooltip={"History"}
            />
            <div className="h-5 bg-gray-300 w-[1px]"></div>
            <Options
              content={
                <RiHistoryFill
                  size={24}
                  // color="#555"
                  className="text-gray-500 hover:text-black cursor-pointer"
                />
              }
              tooltip={"Your favorite"}
            />
            <div className="h-5 bg-gray-300 w-[1px]"></div>
            <Options
              content={
                <FaUser
                  size={22}
                  // color="#555"
                  className="text-gray-500 hover:text-black cursor-pointer"
                />
              }
              tooltip={"Your content"}
            />
          </div>
        </div>
      </div>

      <table className="mt-6 min-w-[700px] w-full flex-1">
        <tbody>
          <tr className="text-gray-700 [&_th]:py-3 bg-gray-200">
            <th>
              <div className="flex items-center justify-center pl-4 pr-2">
                <IoIosPricetags size={16} color="orange" />
              </div>
            </th>
            <th className="px-2 min-w-[80px] text-sm text-left font-normal">
              Title
            </th>
            <th className="px-2 min-w-[80px] text-sm text-left font-normal">
              length
            </th>
            <th className="px-2 min-w-[80px] text-sm font-normal">độ khó</th>
            <th className="px-2 min-w-[80px] text-sm  font-normal">
              completed
            </th>
            <th className="px-2 min-w-[80px] text-sm  font-normal">state</th>
            <th className="px-2 min-w-[80px] text-sm  font-normal">voted</th>
            <th className="px-2 min-w-[80px] text-sm  font-normal">
              upload at
            </th>
            {/* <th>total</th> */}
          </tr>

          {getParagraph.data?.map((item, index) => {
            return <ParaItem {...item} key={index} />;
          })}
        </tbody>
      </table>

      {/* <Keyboard /> */}
    </div>
  );
};

const Options = ({ content, tooltip, active = false }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>{content}</TooltipTrigger>
        <TooltipContent sideOffset={8}>
          <p className="text-xs bg-gray-800">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const ParaItem = (props: IParagraphItem) => {
  return (
    <tr
      className="text-gray-700 [&_td]:py-3 cursor-pointer hover:bg-blue-100"
      style={{ border: "1px solid #eee" }}
    >
      <td className="font-medium text-sm">
        <div className="pr-2 pl-4">
          <IoIosPricetags size={20} color="#aaa " />
        </div>
      </td>
      <td className="text-green-500 font-medium px-2">
        <div>
          <h3 className="line-clamp-1 text-gray-800 font-bold">
            {props.header}
          </h3>
          <p className="text-gray-400 text-xs line-clamp-1">{props.content}</p>
        </div>
      </td>
      <td className="text-left">
        <div className="px-2 flex items-start justify-start flex-col">
          <p className="text-gray-700 font-bold text-sm">
            <span>Word: </span>
            {props.content.split(" ").length}
          </p>
          <p className="text-gray-400 text-xs ">
            <span>Char: </span>
            {props.content.replaceAll(" ", "").length}
          </p>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <button className="px-2 py-0.5 -skew-x-12 bg-orange-500 text-white rounded-lg text-xs">
            {"Easy"}
          </button>
        </div>
      </td>
      <td>
        <p className="text-center text-sm font-semibold text-gray-500">124</p>
      </td>
      <td className="text-sm text-center">
        <div className="flex flex-col items-center justify-center">
          <FaUnlock className="text-green-500" />
          <p className="text-green-300 text-xs">Public</p>
        </div>
      </td>
      <td className="text-sm text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-gray-500 text-sm flex items-center justify-center">
            <p className="mt-1.5">3.5</p> <IoMdStar color="#cab919" size={20} />
          </div>
          <p className="text-gray-400 text-[11px]">( 214 )</p>
        </div>
      </td>

      <td>
        {/* <p className="text-sm text-center">18:30</p> */}
        <p className="text-center text-xs text-blue-400">2 giờ trước</p>
      </td>
    </tr>
  );
};
