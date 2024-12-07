"use client";

import { NovelInfoType } from "@/app/paragraphs/_utils/interface";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BiLike, BiStar } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import { FaUnlock, FaUser } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";
import { RiHistoryFill } from "react-icons/ri";
import { useNovelStore } from "../_utils/store";
import { useDebounce } from "@/hooks/useDebounce";
import { useMainStore } from "@/layouts/main.store";

export const NovelList = () => {
  const { novelFilter, setNovelFilter } = useNovelStore();
  const [search, setSearch] = React.useState("");
  const { userInfo } = useMainStore();
  console.log("userInfo :>> ", userInfo);
  const searchDebounce = useDebounce(search, 800);

  const getNovel = useQuery<NovelInfoType[]>({
    queryFn: async () => {
      console.log("1 :>> ", 1);
      const res = await axios.post("/api/novel/filter", novelFilter);
      return res.data;
    },
    queryKey: ["novel", novelFilter],
  });

  const favorNovel = useQuery<string[]>({
    queryFn: async () => {
      const res = await axios.get("/api/favorite/get-my", {
        params: { userId: userInfo?.id },
      });

      return res.data;
    },
    queryKey: ["favorNovel", userInfo],
  });

  useEffect(() => {
    setNovelFilter({
      keyword: searchDebounce,
    });
  }, [searchDebounce]);

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col">
      <div className="filter rounded-3xl flex items-center justify-between">
        <div
          className="search bg-gray-100 focus-within:bg-white focus-within:shadow shadow-black flex items-center gap-4 rounded-full px-6 w-80"
          style={{ border: "1px solid #dddddd" }}
        >
          <CiSearch size={28} className="text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
              active={novelFilter.follow}
              onClick={() => setNovelFilter({ follow: !novelFilter.follow })}
              content={<IoIosPricetags size={24} />}
              tooltip={"History"}
            />
            <div className="h-5 bg-gray-300 w-[1px]"></div>
            <Options
              active={novelFilter.history}
              onClick={() => setNovelFilter({ history: !novelFilter.history })}
              content={<RiHistoryFill size={24} />}
              tooltip={"Your favorite"}
            />
            <div className="h-5 bg-gray-300 w-[1px]"></div>
            <Options
              active={novelFilter.myNovel}
              onClick={() => setNovelFilter({ myNovel: !novelFilter.myNovel })}
              content={<FaUser size={22} />}
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
            <th className="min-w-[80px] text-sm text-left font-normal">Name</th>
            <th className="min-w-[80px] text-sm text-left font-normal">
              Description
            </th>
            {/* <th className="min-w-[80px] text-sm font-normal">Access range</th> */}
            <th className="min-w-[80px] text-sm text-left font-normal">
              Status
            </th>
            <th className="min-w-[80px] text-sm text-left font-normal">Like</th>
            <th className="min-w-[80px] text-sm text-left font-normal">
              Follow
            </th>
            <th className="min-w-[80px] text-sm text-left font-normal">
              Release At
            </th>
            {/* <th>total</th> */}
          </tr>

          {getNovel.data?.map((item, index) => {
            console.log(
              "item, favorNovel :>> ",
              item,
              favorNovel.data,
              favorNovel.data?.includes(item.id)
            );
            return (
              <NovelItem
                {...item}
                key={index}
                favor={favorNovel.data?.includes(item.id)}
              />
            );
          })}
        </tbody>
      </table>

      {/* <Keyboard /> */}
    </div>
  );
};

const Options = ({
  content,
  tooltip,
  onClick,
  active = false,
}: {
  content: React.ReactNode;
  tooltip: string;
  active?: boolean;
  onClick?: () => void;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          onClick={onClick}
          className={`cursor-pointer ${
            active ? "!text-blue-600" : "text-gray-700 hover:text-gray-800"
          }`}
        >
          {content}
        </TooltipTrigger>
        <TooltipContent sideOffset={8}>
          <p className="text-xs bg-gray-800">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const NovelItem = (props: NovelInfoType & { favor?: boolean }) => {
  const router = useRouter();

  console.log("props.favor, props.id :>> ", props.favor, props);

  return (
    <tr
      onClick={() => router.push(`/novel/${props.id}`)}
      className="text-gray-700 [&_td]:py-3 cursor-pointer hover:bg-blue-100"
      style={{ border: "1px solid #eee" }}
    >
      <td className="font-medium text-sm">
        <div className="pr-2 pl-4 flex items-center justify-center">
          <IoIosPricetags
            size={20}
            color={`${props.favor ? "orange" : "#aaa"} `}
          />
        </div>
      </td>
      <td className="text-green-500 font-medium">
        <div>
          <p className="line-clamp-1 text-gray-800 font-bold">{props.name}</p>
        </div>
      </td>
      <td>
        {props.desc ? (
          <p className="text-gray-600 text-sm line-clamp-3">{props.desc}</p>
        ) : (
          <p className="text-gray-400 text-xs line-clamp-1">
            {'"Không có mô tả"'}
          </p>
        )}
      </td>
      <td className="text-left">
        <div className="flex items-start justify-start flex-col">
          <p className="text-gray-700 font-bold text-sm">{props.status}</p>
        </div>
      </td>
      <td>
        <div className="text-gray-500 text-sm font-semibold">
          {props.like || 0}
        </div>
      </td>
      <td>
        <p className="text-sm font-semibold text-gray-500">
          {props.favorite || 0}
        </p>
      </td>
      <td className="text-sm">
        <p className="text-green-700 text-xs">{props.createdAt.slice(0, 10)}</p>
      </td>
    </tr>
  );
};
