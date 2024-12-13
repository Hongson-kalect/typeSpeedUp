import * as React from "react";
import ParagraphItem from "./ParagraphItem";
import { IoIosPricetags } from "react-icons/io";
import { IParagraphItem } from "../../_utils/interface";
import { useParagraphQuery } from "../../_utils/query";
import { Filter } from "./Filter";

export default function Paragraphs() {
  const { getParagraph } = useParagraphQuery();

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col h-full overflow-auto">
      <Filter />

      <div className="flex-1 overflow-auto my-6">
        <table className="min-w-[700px] w-full flex-1">
          <tbody>
            <tr className="text-gray-700 [&_th]:py-3 bg-gray-200 sticky top-0 z-10">
              <th>
                <div className="flex items-center justify-center pl-4 pr-2">
                  <IoIosPricetags size={16} color="orange" />
                </div>
              </th>
              <th className="px-2 min-w-[80px] text-sm text-left font-normal">
                Title
              </th>
              <th className="px-2 min-w-[80px] text-sm font-normal text-left">
                Length
              </th>
              <th className="px-2 min-w-[80px] text-sm font-normal">Level</th>
              <th className="px-2 min-w-[80px] text-sm font-normal">
                Completed
              </th>
              <th className="px-2 min-w-[80px] text-sm  font-normal">State</th>
              {/* <th className="px-2 min-w-[80px] text-sm  font-normal">Voted</th> */}
              <th className="px-2 min-w-[80px] text-sm  font-normal">
                Upload at
              </th>
              {/* <th>total</th> */}
            </tr>

            {getParagraph.data?.map((item: IParagraphItem, index: number) => {
              return <ParagraphItem {...item} key={index} />;
            })}
          </tbody>
        </table>
      </div>

      {/* <Keyboard /> */}
    </div>
  );
}
