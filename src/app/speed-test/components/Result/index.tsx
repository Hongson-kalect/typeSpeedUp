import { Button } from "@/components/ui/button";
import { IResult } from "../../types";
import { GrPowerReset } from "react-icons/gr";
import { ReactNode } from "react";

const ResultItem = ({
  name,
  result,
  italic = false,
}: {
  name: string;
  result: string | ReactNode;
  italic?: boolean;
}) => (
  <div className="">
    <p className="text-sm text-gray-600 mt-3">{name}</p>
    <p
      className={`font-semibold text-3xl mt-2 text-center ${
        italic ? "italic" : ""
      }`}
    >
      {result}
    </p>
  </div>
);

export const Result = ({
  result,
  reset,
}: {
  result: IResult;
  reset: () => void;
}) => (
  <div
    className=" bg-white rounded-lg px-6 py-4 flex gap-4"
    id="type-score"
    style={{ border: "1px solid #ddd" }}
  >
    <div className="flex-2">
      <h2 className=" text-orange-500 font-bold text-2xl">KẾT QUẢ</h2>
      <div className="detail grid grid-cols-3 flex-wrap gap-8 mt-4 pl-4 max-w-[560px]">
        <ResultItem
          name="Số từ đã gõ"
          result={
            <>
              <span>{result.wordTyped || 0}</span>
              <span className="text-sm text-red-400">
                ({result.wordError || 0})
              </span>
            </>
          }
        />

        <ResultItem name="Số chữ / phút" result={result.wpm || 0} />
        <ResultItem name="Tỉ lệ đúng" result={result.wa || 0} italic />

        <ResultItem
          name="Số ký tự đã gõ"
          result={
            <>
              <span>{result.charTyped || 0}</span>
              <span className="text-sm text-red-400">
                ({result.charError || 0})
              </span>
            </>
          }
        />

        <ResultItem name="Số ký tự / phút" result={result.cpm || 0} />
        <ResultItem name="Tỉ lệ đúng" result={result.ca || 0} italic />
      </div>
    </div>
    <div
      className="flex-1 flex flex-col pl-4"
      style={{ borderLeft: "1px solid #ddd" }}
    >
      <h2 className=" text-blue-500 font-bold text-2xl">ĐIỂM</h2>
      <div className="flex flex-col items-center justify-center flex-1">
        <p className="point text-5xl font-bold">{result.score}</p>
        <p className="point text-xl text-cyan-500 italic font-bold mt-6">
          Excelent
        </p>
      </div>
      <Button
        className="h-14 bg-green-500 hover:bg-green-700 text-lg"
        onClick={() => reset()}
      >
        <GrPowerReset size={20} /> Thử lại
      </Button>
    </div>
    <div className="flex-1"></div>
  </div>
);
