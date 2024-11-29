"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accodition";
import { PiPlus, PiPlusCircle } from "react-icons/pi";
import { TrainingType } from "../_utils/interface";
import { useAdminTrainingStore } from "../_utils/store";

export interface ITrainingListProps {
  trainings?: TrainingType[];
}

export default function TrainingList(props: ITrainingListProps) {
  const { selectedTraining, setSelectedTraining, setIsAdd } =
    useAdminTrainingStore();

  const handleAddTraining = (item?: TrainingType) => {
    setIsAdd(true);
    setSelectedTraining(item);
  };

  const renderItem = (item: TrainingType, navIndex: number = 0) => {
    const selected = selectedTraining?.id === item?.id;
    // let navIndex = 0;

    // if (item.children?.length > 0) {
    if (!item.children || !item.children.length) {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
            setIsAdd(false);
            setSelectedTraining(item);
          }}
          className={`px-2 flex justify-between items-center cursor-pointer ${
            navIndex === 0
              ? "text-blue-800  hover:bg-orange-100 font-bold text-lg py-4"
              : navIndex === 1
              ? "text-orange-600  hover:bg-gray-100 font-medium text-base py-2"
              : "text-gray-600  hover:bg-slate-100 text-sm py-1"
          } ${selected ? "bg-blue-200 " : ""}`}
        >
          <p>{item.title}</p>
          <div
            className="hover:opacity-100 duration-200 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setIsAdd(true);
              setSelectedTraining(item);
            }}
          >
            <PiPlusCircle className="opacity-70" />
          </div>
        </div>
      );
    }

    return (
      <AccordionItem value={`item-${item.id}`}>
        <AccordionTrigger
          onClick={(e) => {
            e.stopPropagation();
            setIsAdd(false);
            setSelectedTraining(item);
          }}
          className={`px-2 ${
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
            // navIndex++;
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
          <div
            onClick={() => handleAddTraining(item)}
            className={`py-1 hover:opacity-100 duration-200 cursor-pointer italic pl-2 flex gap-2 items-center opacity-80 ${
              navIndex === 0
                ? " text-orange-600 hover:bg-orange-100 text-sm"
                : navIndex === 1
                ? " text-gray-600 hover:bg-gray-100 text-xs"
                : " text-gray-400 hover:bg-slate-100 text-[10px]"
            }`}
          >
            <PiPlus />
            <p>Add menu</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  return (
    <Accordion
      type="multiple"
      // collapsible={true}
      className="w-1/3 bg-white px-4 py-3 rounded-lg h-full overflow-auto"
    >
      <h2 className="text-center border-b text-xl pb-2 mb-3">Training menu</h2>
      {!props.trainings ? (
        <div>Loading...</div>
      ) : (
        props.trainings?.map((item, index) => {
          if (item?.parentId) return;
          return <div key={index}>{renderItem(item, 0)}</div>;
        })
      )}

      <div
        onClick={() => handleAddTraining()}
        className="text-blue-800 font-bold text-lg py-4 flex gap-2 items-center italic opacity-60 cursor-pointer hover:opacity-100 duration-200"
      >
        <PiPlus />
        <p>Add session</p>
      </div>
    </Accordion>
  );
}
