import { useQuery } from "@tanstack/react-query";
import { IRank, IResult } from "../../types";
import { getSpeedTestRank } from "./_utils";
import { useEffect } from "react";
import { useMainStore } from "@/layouts/main.store";

type IRankItemProps = {
  result: IRank;
  rank: number;
};

const RankItem = ({ result, rank }: IRankItemProps) => {
  return (
    <tr
      className="text-gray-700 [&_td]:py-2"
      style={{ border: "1px solid #eee" }}
    >
      <td className="text-sm">{rank}</td>
      <td
        className={`font-medium ${
          rank === 1 ? "font-medium text-lg" : "text-sm"
        } `}
      >
        {result.user?.name || "Guest"}
      </td>
      <td className="text-blue-600 font-medium">{result.wpm}</td>
      <td>{result.cpm}</td>
      <td className="text-sm text-green-500 italic">{result.wAccuracy}%</td>
      <td className="text-sm text-green-500 italic">{result.cAccuracy}%</td>
      <td className="text-lg font-bold">{result.score}</td>
      {/* <td>{attempt}</td> */}
    </tr>
  );
};

type IRankProps = {
  result: IResult;
  ranks: IRank[];
};

export const Rank = ({ result, ranks }: IRankProps) => {
  const { userInfo } = useMainStore();

  return (
    <div
      className="mt-8 bg-white rounded-lg px-6 py-4 flex gap-4"
      style={{ border: "1px solid #d5d5d5" }}
    >
      <div className="w-full">
        <h2 className=" text-gray-700 font-bold text-">XẾP HẠNG</h2>
        <table className="mt-6 min-w-[700px] w-5/6 text-center">
          <tbody>
            <tr className="text-gray-700 [&_th]:py-3 bg-gray-200">
              <th>Rank</th>
              <th>User Name</th>
              <th>WPM</th>
              <th>CPM</th>
              <th>WA</th>
              <th>CR</th>
              <th>Score</th>
              {/* <th>Attemp</th> */}
              {/* <th>total</th> */}
            </tr>

            {ranks?.map((item, index) => (
              <RankItem result={item} rank={index + 1} key={index} />
            ))}
            <tr
              className="text-gray-700 [&_td]:py-3 shadow-inner shadow-blue-400"
              style={{ border: "1px solid #eee" }}
            >
              <td colSpan={2} className=" font-bold">
                Điểm của bạn
              </td>
              <td className="text-blue-600 font-medium">{result.wpm}</td>
              <td>{result.cpm}</td>
              <td className="text-sm text-green-500 italic">{result.wa}%</td>
              <td className="text-sm text-green-500 italic">{result.ca}%</td>
              <td className="text-lg font-bold">{result.score}</td>
              {/* <td>5</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
