import { ParaInfoType } from "@/app/paragraphs/_utils/interface";
import Link from "next/link";
import * as React from "react";

export interface IParaListProps {
  paragraphs?: ParaInfoType[];
}

export default function ParaList({ paragraphs }: IParaListProps) {
  if (!paragraphs) return;
  if (paragraphs.length === 0) return;
  return (
    <div className="px-4 py-3 w-[400px] bg-white flex flex-col rounded-lg h-full">
      <h2 className="text-xl font-bold text-gray-800">Danh sách chương</h2>

      <div className="flex gap-1 flex-col flex-1 overflow-auto">
        {!paragraphs ? (
          <div className="px-4 py-3 w-[400px] bg-white rounded-lg">
            Loading...
          </div>
        ) : paragraphs.length === 0 ? (
          <div className="px-4 py-3 w-[400px] bg-white rounded-lg">
            No paragraphs
          </div>
        ) : (
          paragraphs.map((item, index) => (
            <div
              key={index}
              className="p-2 bg-blue-50 hover:bg-blue-100 duration-200 rounded-lg shadow shadow-gray-100"
            >
              <Link className="" href={`/paragraphs/${item.id || item._id}`}>
                <p className="text-sm text-gray-700">
                  Chapter: {item.chapter} -
                  <span className="font-medium"> {item.header}</span>
                </p>
                <div className="flex px-2 items-center justify-between text-xs mt-1 text-gray-500">
                  <p>
                    Word: <b>{item.content.split(" ").length}</b>
                  </p>
                  <p>
                    Completed: <b>{item.completed}</b>
                  </p>
                  <p className="text-xs italic">
                    Release: <b>{item.createdAt.slice(0, 10)}</b>
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
