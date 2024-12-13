import * as React from "react";
import { IParagraphItem } from "../../_utils/interface";
import { useRouter } from "next/navigation";
import { IoIosPricetags } from "react-icons/io";
import { FaLock, FaUnlock } from "react-icons/fa";
import { relativeTime } from "./utils";

export default function ParagraphItem(props: IParagraphItem) {
  const router = useRouter();

  const time = React.useMemo(() => {
    if (!props.createdAt) return "";
    return relativeTime(props.createdAt);
  }, [props.createdAt]);

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
            <div className="text-xs text-gray-500 font-extralight flex gap-2">
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
      {/* <td className="text-sm text-center">
        <div className="flex flex-col items-center justify-center">
          <div className="text-gray-500 text-sm flex items-center justify-center">
            <p className="mt-1.5">3.5</p> <IoMdStar color="#cab919" size={20} />
          </div>
          <p className="text-gray-400 text-[11px]">( 214 )</p>
        </div>
      </td> */}

      <td>
        {/* <p className="text-sm text-center">18:30</p> */}
        <p className="text-center text-xs text-blue-400">{time}</p>
      </td>
    </tr>
  );
}
