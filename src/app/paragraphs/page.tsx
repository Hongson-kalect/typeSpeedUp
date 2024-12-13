"use client";

import { useRouter } from "next/navigation";
import { FaLock, FaUnlock } from "react-icons/fa";
import { IoIosPricetags, IoMdStar } from "react-icons/io";
import { IParagraphItem } from "./_utils/interface";
import { useParagraphQuery } from "./_utils/query";
import { Header } from "./components/Header";
import Paragraphs from "./components/Paragraphs";

export default function ParagraphsPage() {
  return (
    <div className="px-6 pt-6 flex-1 flex flex-col overflow-auto">
      <div>
        <Header />
      </div>
      <div className="mt-6 flex-1 bg-white  rounded-2xl">
        <ParagraphsList />
      </div>
    </div>
  );
}


const ParagraphsList = () => {
  const { getParagraph } = useParagraphQuery();

  return (
    <div className="bg-white rounded-lg p-4 flex flex-col h-full overflow-auto">
      <Paragraphs/>

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
              <th className="px-2 min-w-[80px] text-sm font-normal">Length</th>
              <th className="px-2 min-w-[80px] text-sm font-normal">Level</th>
              <th className="px-2 min-w-[80px] text-sm font-normal">
                Completed
              </th>
              <th className="px-2 min-w-[80px] text-sm  font-normal">State</th>
              <th className="px-2 min-w-[80px] text-sm  font-normal">Voted</th>
              <th className="px-2 min-w-[80px] text-sm  font-normal">
                Upload at
              </th>
              {/* <th>total</th> */}
            </tr>

            {getParagraph.data?.map((item, index) => {
              return <ParaItem {...item} key={index} />;
            })}
          </tbody>
        </table>
      </div>

      {/* <Keyboard /> */}
    </div>
  );
};

// const Options = ({ content, tooltip, active = false }) => {
//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <TooltipTrigger>{content}</TooltipTrigger>
//         <TooltipContent sideOffset={8}>
//           <p className="text-xs bg-gray-800">{tooltip}</p>
//         </TooltipContent>
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

const ParaItem = (props: IParagraphItem) => {
  const router = useRouter();

  return (
    <tr
      onClick={() => router.push(`/paragraphs/${props.id}`)}
      className="text-gray-700 [&_td]:py-3 cursor-pointer hover:bg-blue-100"
      style={{ border: "1px solid #eee" }}
    >
      <td className="font-medium text-sm">
        <div className="pr-2 pl-4">
          <IoIosPricetags size={20} color="#aaa " />
        </div>
      </td>
      <td>
        <div>
          {props.novel && (
            <div className="text-xs text-gray-400 font-extralight flex gap-2">
              <p>Chapter {props.chapter}</p>
              <p>{props.novel.name}</p>
            </div>
          )}
          <p className="line-clamp-1 text-gray-800 font-bold">{props.header}</p>
          <p className="text-gray-600 text-sm line-clamp-1">{props.content}</p>
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
        <p
          className={`${
            props.completed ? " text-gray-700" : "text-sm text-gray-400"
          } text-center font-semibold`}
        >
          {props.completed || "-"}
        </p>
      </td>
      <td className="text-sm text-center">
        <div className="flex flex-col items-center justify-center">
          {props.isPrivate ? (
            <>
              <FaLock className="text-red-500" />
              <p className="text-red-700 text-xs">Privated</p>
            </>
          ) : (
            <>
              <FaUnlock className="text-green-500" />
              <p className="text-green-700 text-xs">Public</p>
            </>
          )}
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
