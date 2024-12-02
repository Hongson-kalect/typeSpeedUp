import { TrainingType } from "@/app/admin/training/_utils/interface";
import * as React from "react";
import { useTrainingStore } from "../_utils/store";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accodition";

export interface ITrainingMenuProps {
  menuList: TrainingType[];
}

export default function TrainingMenu(props: ITrainingMenuProps) {
  const { selectedTraining, setSelectedTraining, setIsAdd, isAdd } =
    useTrainingStore();

  const renderItem = (item: TrainingType, navIndex: number = 0) => {
    const selected = selectedTraining?.id === item?.id;
    // let navIndex = 0;

    // if (item.children?.length > 0) {
    if (!item.children || !item.children.length) {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTraining(item);
          }}
          className={`px-2 !py-2  cursor-pointer ${
            navIndex === 0
              ? "text-blue-800  hover:bg-orange-100 font-bold text-lg py-4"
              : navIndex === 1
              ? "text-orange-600  hover:bg-gray-100 font-medium text-base py-2"
              : "text-gray-600  hover:bg-slate-100 text-sm py-1"
          } ${selected ? "bg-blue-200 " : ""}`}
        >
          <p>{item.title}</p>
        </div>
      );
    }

    return (
      <AccordionItem value={`item-${item.id}`}>
        <AccordionTrigger
          onClick={(e) => {
            e.stopPropagation();
            setSelectedTraining(item);
          }}
          className={`px-2 py-2 ${
            navIndex === 0
              ? "text-blue-800 font-bold text-lg"
              : navIndex === 1
              ? "text-orange-600 font-medium text-base"
              : "text-gray-600 text-sm"
          } ${selected ? "bg-blue-200 " : ""}`}
        >
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="px-2">
          {item.children?.map((item, index) => {
            return (
              <div
                className=""
                style={{ borderLeft: "1px solid #ccc" }}
                key={index}
              >
                {renderItem(item, navIndex + 1)}
              </div>
            );
          })}
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <div className="bg-white  px-2 py-1 overflow-auto w-[320px] rounded-lg h-full">
      <div className="text-xl font-light">Training Menu</div>

      <Accordion type="multiple" className="mt-3">
        {props.menuList.map((item) => {
          return renderItem(item);
        })}
      </Accordion>
    </div>
  );
}