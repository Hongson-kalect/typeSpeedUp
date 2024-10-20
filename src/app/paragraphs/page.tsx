"use client";

import * as React from "react";
import { CiSearch } from "react-icons/ci";
import { FaUnlock } from "react-icons/fa";
import { IoIosPricetags, IoMdStar } from "react-icons/io";
import { IoStarOutline } from "react-icons/io5";

export interface IParagraphsPageProps {}

export default function ParagraphsPage(props: IParagraphsPageProps) {
  return (
    <div className="px-6 pt-6">
      <Header />
      <ParagraphsList />
    </div>
  );
}

const Header = () => {
  return <div>header</div>;
};

const ParagraphsList = () => {
  return (
    <div className="bg-white rounded-lg p-4">
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
      </div>

      <table className="mt-6 min-w-[700px] w-full">
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

          <ParaItem />
          <ParaItem />
          <ParaItem />
          <ParaItem />
          <ParaItem />
        </tbody>
      </table>
    </div>
  );
};

const ParaItem = () => {
  return (
    <tr
      className="text-gray-700 [&_td]:py-3"
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
            Lời bài hát tiến quân ca
          </h3>
          <p className="text-gray-400 text-xs line-clamp-1">
            Cùng nhay ta đileen theo bước đường thanh niên đi lên cố gắng xứng
            đáng chau ngoan Bác Hồ
          </p>
        </div>
      </td>
      <td className="text-left">
        <div className="px-2 flex items-start justify-start flex-col">
          <p className="text-gray-700 font-bold text-sm">160 Từ</p>
          <p className="text-gray-400 text-xs "> 456 ký tự</p>
        </div>
      </td>
      <td>
        <div className="flex items-center justify-center">
          <button className="px-2 py-0.5 -skew-x-12 bg-orange-500 text-white rounded-lg text-xs">
            Khó
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
        <p className="text-sm text-center">18:30</p>
        <p className="text-center text-xs text-blue-400">2 giờ trước</p>
      </td>
    </tr>
  );
};
