"use client";

import * as React from "react";
import { TrainingType } from "../_utils/interface";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accodition";
import { PiPlus, PiPlusCircle } from "react-icons/pi";
import { useTrainingStore } from "../_utils/store";

export interface ITrainingListProps {
  trainings?: TrainingType[];
}

const exList = [
  {
    title: "first session",
    id: 1,
    children: [
      {
        title: "first item child",
        id: 2,
      },
      {
        title: "second item child",
        id: 3,
      },
      {
        title: "third item child",
        id: 4,
      },
    ],
  },
  {
    title: "second session",
    id: 5,
    children: [
      {
        title: "first item child 2",
        id: 6,
      },
      {
        title: "second item child 2",
        id: 7,
        children: [
          {
            title: "first item child 2",
            id: 8,
          },
          {
            title: "second item child 2",
            id: 9,
          },
          {
            title: "third item child 2",
            id: 10,
          },
        ],
      },
      {
        title: "third item child 2",
        id: 11,
      },
    ],
  },
];

export default function TrainingList(props: ITrainingListProps) {
  const { selectedTraining, setSelectedTraining } = useTrainingStore();
  const renderItem = (item: TrainingType, navIndex: number = 0) => {
    const selected = selectedTraining?.id === item.id;
    // let navIndex = 0;

    // if (item.children?.length > 0) {
    if (!item.children || !item.children.length) {
      return (
        <div
          onClick={(e) => {
            e.stopPropagation();
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

          <PiPlusCircle className="opacity-80" />
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
            className={`py-1 hover:opacity-100 duration-200 cursor-pointer italic pl-2 flex gap-2 items-center opacity-80 ${
              navIndex === 0
                ? " text-orange-600 hover:bg-orange-100 text-sm"
                : navIndex === 1
                ? " text-gray-600 hover:bg-gray-100 text-xs"
                : " text-gray-400 hover:bg-slate-100 text-[10px]"
            }`}
          >
            <PiPlus />
            <p>Add session</p>
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  };

  // return (
  //   <Accordion type="multiple" collapsible className="w-full">
  //     <AccordionItem value="item-1">
  //       <AccordionTrigger>Is it accessible?</AccordionTrigger>
  //       <AccordionContent>
  //         Yes. It adheres to the WAI-ARIA design pattern.
  //       </AccordionContent>
  //     </AccordionItem>
  //     <AccordionItem value="item-2">
  //       <AccordionTrigger>Is it styled?</AccordionTrigger>
  //       <AccordionContent>
  //         Yes. It comes with default styles that matches the other
  //         components&apos; aesthetic.
  //       </AccordionContent>
  //     </AccordionItem>
  //     <AccordionItem value="item-3">
  //       <AccordionTrigger>Is it animated?</AccordionTrigger>
  //       <AccordionContent>
  //         Yes. It's animated by default, but you can disable it if you prefer.
  //       </AccordionContent>
  //     </AccordionItem>
  //   </Accordion>
  // );

  return (
    <Accordion
      type="multiple"
      collapsible
      className="w-1/3 bg-white px-4 py-3 rounded-lg h-full overflow-auto"
    >
      <h2 className="text-center border-b text-xl pb-2 mb-3">Training menu</h2>
      {exList.map((item, index) => (
        <div key={index}>{renderItem(item, 0)}</div>
      ))}

      <div className="text-blue-800 font-bold text-lg py-4 flex gap-2 items-center italic opacity-60 cursor-pointer hover:opacity-100 duration-200">
        <PiPlus />
        <p>Add session</p>
      </div>
    </Accordion>
  );
}
