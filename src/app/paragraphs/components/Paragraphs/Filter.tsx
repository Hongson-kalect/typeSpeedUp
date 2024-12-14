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
import { useParagraphStore } from "../../_utils/store";
import React from "react";
import { useDebounce } from "@/hooks/useDebounce";

const Options = ({
  content,
  tooltip,
  active = false,
  onClick,
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
          className={`${
            active ? "text-blue-500" : "text-gray-500 hover:text-black"
          } cursor-pointer`}
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

const FilterItem = ({
  icon,
  tooltip,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  tooltip: string;
  active: boolean;
  onClick: () => void;
}) => {
  return (
    <Options
      content={icon}
      tooltip={tooltip}
      active={active}
      onClick={onClick}
    />
  );
};

export const Filter = () => {
  const { filter, setFilter } = useParagraphStore();
  const [search, setSearch] = React.useState("");
  const searchFilter = useDebounce(search, 500);

  const handleFilter = (key: "favorite" | "history" | "yourContent") => {
    const newFilter = {
      favorite: false,
      history: false,
      yourContent: false,
    };
    newFilter[key] = !filter[key];
    setFilter({ ...filter, ...newFilter });
  };

  React.useEffect(() => {
    setFilter({ ...filter, search: searchFilter });
  }, [searchFilter]);

  return (
    <div className="filter rounded-3xl flex items-center justify-between">
      <div
        className="search bg-gray-100 flex items-center gap-4 rounded-full px-6 w-80"
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
          <FilterItem
            icon={<IoIosPricetags size={24} />}
            tooltip={"Favorite"}
            active={filter.favorite}
            onClick={() => handleFilter("favorite")}
          />
          <div className="h-5 bg-gray-300 w-[1px]"></div>
          <FilterItem
            icon={<RiHistoryFill size={24} />}
            tooltip={"History"}
            active={filter.history}
            onClick={() => handleFilter("history")}
          />
          <div className="h-5 bg-gray-300 w-[1px]"></div>
          <FilterItem
            icon={<FaUser size={22} />}
            tooltip={"Your"}
            active={filter.yourContent}
            onClick={() => handleFilter("yourContent")}
          />
        </div>
      </div>
    </div>
    // </div>
  );
};
