import { Timer } from "@/components/timer";
import { CiEdit } from "react-icons/ci";
import { IoSettingsOutline } from "react-icons/io5";
import { RiTimerLine } from "react-icons/ri";

export const Header = ({ time }: { time: number }) => {
  return (
    <div className="flex items-end justify-between">
      <div className="flex gap-2 items-center">
        <p className="text-gray-600">Tiếng Việt</p>
        <CiEdit size={18} />
      </div>
      <div className="setting flex items-end gap-1">
        <IoSettingsOutline size={20} className="text-gray-500 mb-1" />
        <p className="h-7 rounded-lg mb-0.5 bg-green-500 text-white px-3 flex items-center justify-center">
          Dễ
        </p>
        <RiTimerLine size={20} className="text-gray-500 ml-2 mb-1" />
        <Timer time={time} />
      </div>
    </div>
  );
};
