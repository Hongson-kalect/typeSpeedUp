import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CiSearch } from "react-icons/ci";
import { RiHistoryFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
import { IoIosPricetags } from "react-icons/io";

const Options = ({
  content,
  tooltip,
  active = false,
}: {
  content: React.ReactNode;
  tooltip: string;
  active?: boolean;
}) => {
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

export const Filter = () => {
  return (
    // <div className="bg-white rounded-lg p-4 flex flex-col h-full overflow-auto">
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
            tooltip={"Your favorite"}
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
            tooltip={"History"}
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
    // </div>
  );
};
