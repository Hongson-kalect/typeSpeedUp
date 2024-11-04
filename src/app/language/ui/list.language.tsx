"use client";

import * as React from "react";
import { useLanguageQuery } from "../_utils/query";
import LanguageItem from "../components/language.item";
import Image from "next/image";
import { ILanguageItem } from "../_utils/interface";
import { Button } from "@/components/ui/button";
import { PiPlus } from "react-icons/pi";
import { FaPlus } from "react-icons/fa";
import { useLanguageStore } from "../_utils/store";

export interface ILanguageListProps {
  setLanguage: (item: ILanguageItem) => void;
}

export default function LanguageList(props: ILanguageListProps) {
  const { selectedLanguage, setSelectedLanguage, setAction } =
    useLanguageStore();
  const { getLanguage } = useLanguageQuery();

  const handleAddLanguageClicked = () => {
    setSelectedLanguage(undefined);
    setAction("create");
  };

  const handleSelectLanguage = (item: ILanguageItem) => {
    setSelectedLanguage(item);
    setAction("update");
  };

  React.useEffect(() => {
    console.log("getLanguage :>> ", getLanguage);
  }, [getLanguage.data]);

  return (
    <div className="flex-1 bg-white rounded-2xl p-4 overflow-auto">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-medium ">Danh sách ngôn ngữ</h2>
        <Button
          onClick={handleAddLanguageClicked}
          className="bg-green-600 hover:bg-green-800"
        >
          <FaPlus />
          <p>Tạo ngôn ngữ</p>
        </Button>
      </div>
      <div className="w-full">
        {/* <h2 className=" text-gray-700 font-bold text-">XẾP HẠNG</h2> */}
        <table className="mt-6 min-w-[700px] w-full text-center">
          <tbody>
            <tr className="text-gray-700 [&_th]:py-3 bg-gray-200">
              <th>Index</th>
              <th>Language name</th>
              <th>Code</th>
              <th>Flag</th>
              <th>Desc</th>

              {/* <th>total</th> */}
            </tr>

            {getLanguage.isLoading ? (
              <p>Loading</p>
            ) : (
              getLanguage.data?.map((item, index) => (
                <tr
                  className={`hover:bg-blue-100 duration-300 cursor-pointer ${
                    selectedLanguage?.id === item.id
                      ? "!bg-blue-500 text-white"
                      : ""
                  }`}
                  key={item.code}
                  onClick={() => handleSelectLanguage(item)}
                >
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.code}</td>
                  <td className="h-10">
                    <div className="items-center justify-center flex h-full">
                      <img
                        src={item.flag}
                        alt={item.name}
                        width={24}
                        height={32}
                      />
                    </div>
                  </td>
                  <td>{item.name}</td>
                </tr>
                // <div key={index}>{JSON.stringify(item)}</div>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
