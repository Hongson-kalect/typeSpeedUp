import * as React from "react";

export interface ILanguageListProps {}

export default function LanguageList(props: ILanguageListProps) {
  return (
    <div className="flex-1 bg-white rounded-2xl p-4">
      <h2 className="text-2xl font-medium">Danh sách ngôn ngữ</h2>
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
              <th>Attemp</th>
              {/* <th>total</th> */}
            </tr>

            {rankList.map((item, index) => (
              <RankItem
                id={item.rank}
                key={index}
                rank={item.rank}
                userName={item.name}
                wpm={item.wpm}
                cpm={item.cpm}
                wa={item.wa}
                ca={item.ca}
                score={item.score}
                attempt={item.attemp}
              />
            ))}
            <tr
              className="text-gray-700 [&_td]:py-4 shadow-inner shadow-blue-400"
              style={{ border: "1px solid #eee" }}
            >
              <td colSpan={2} className="font-medium text-sm">
                TRUNG BINH
              </td>
              <td className="text-green-500 font-medium">42</td>
              <td>102</td>
              <td className="text-sm">75%</td>
              <td className="text-sm">63%</td>
              <td>124</td>
              <td>5</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
