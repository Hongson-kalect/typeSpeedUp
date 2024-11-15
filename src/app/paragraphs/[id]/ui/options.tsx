"use client";

import { Button } from "@/components/ui/button";
import { StarIcon } from "@radix-ui/react-icons";
import * as React from "react";
import { BiLike } from "react-icons/bi";
import { FaFlag } from "react-icons/fa";
import { PiStarFill } from "react-icons/pi";
import { NovelInfoType } from "../../_utils/interface";
import { useMainStore } from "@/layouts/main.store";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Loader from "@/components/ui/loader";

export interface INovelOptionsProps {
  novel?: NovelInfoType;
}

export default function NovelOptions({ novel }: INovelOptionsProps) {
  const [isUpdateLike, setIsUpdateLike] = React.useState(false);
  const [isUpdateFavorite, setIsUpdateFavorite] = React.useState(false);
  const [isReport, setIsReport] = React.useState(false);
  const { userInfo } = useMainStore();
  const likeNovel = useQuery({
    queryFn: async () => {
      const res = await axios.get("/api/like", {
        params: { targetId: novel?.id, userId: userInfo?.id },
      });

      return res.data;
    },
    queryKey: ["like", novel?.id, userInfo?.id],
  });

  const favoriteNovel = useQuery({
    queryFn: async () => {
      const res = await axios.get("/api/favorite", {
        params: { targetId: novel?.id, userId: userInfo?.id },
      });

      return res.data;
    },
    queryKey: ["favorite", novel?.id, userInfo?.id],
    keepPreviousData: true,
  });

  const report = useQuery({
    queryFn: async () => {
      const res = await axios.get("/api/report", {
        params: { targetId: novel?.id, userId: userInfo?.id },
      });

      return res.data;
    },
    keepPreviousData: true,
  });

  const handleLike = async () => {
    setIsUpdateLike(true);
    if (likeNovel?.data?.like) {
      console.log(1);
      if (likeNovel?.data?.like.isDeleted) {
        const res = await axios.put("/api/like/" + likeNovel?.data?.like.id, {
          isDeleted: false,
        });
      } else {
        const res = await axios.put("/api/like/" + likeNovel?.data?.like.id, {
          isDeleted: true,
        });
      }
    } else {
      await axios.post("/api/like", {
        targetId: novel?.id,
        userId: userInfo?.id,
        type: "novel",
      });
    }
    setIsUpdateLike(false);
    likeNovel.refetch();
  };

  const handleFavorite = async () => {
    setIsUpdateFavorite(true);
    if (favoriteNovel?.data?.favorite) {
      console.log(1);
      if (favoriteNovel?.data?.favorite.isDeleted) {
        await axios.put("/api/favorite/" + favoriteNovel?.data?.favorite.id, {
          isDeleted: false,
        });
      } else {
        await axios.put("/api/favorite/" + favoriteNovel?.data?.favorite.id, {
          isDeleted: true,
        });
      }
    } else {
      console.log(2);
      await axios.post("/api/favorite", {
        targetId: novel?.id,
        userId: userInfo?.id,
        type: "novel",
      });
    }
    setIsUpdateFavorite(false);
    favoriteNovel.refetch();
  };

  const handleReport = async () => {
    if (report?.data?.report) {
      // Show report
      await axios.post("/api/report", {
        userId: userInfo?.id,
        targetId: novel?.id,
        type: "novel",
      });
    } else {
      await axios.put("/api/report/" + report?.data?.report.id, {
        isDeleted: true,
      });
    }

    report.refetch();
  };

  const cancelReport = async () => {};

  return (
    <div className="options bg-white rounded-lg w-full pl-3 pr-5  pt-4 pb-2 relative">
      <h2 className="line-clamp-2 text-xl font-medium text-gray-600 cursor-pointer">
        {novel?.name}
      </h2>
      <div className="flex items-center justify-center mb-3 mt-5">
        <div className="h-24 w-48 bg-gray-400">Img desc</div>
      </div>
      <div className="flex gap-2 items-center">
        <p className="text-sm text-gray-500 w-24">Uploader:</p>
        <p className="font-bold text-gray-800">{novel?.userId}</p>
      </div>
      <div className="flex gap-2">
        <p className="text-sm text-gray-500 w-24 ">Chapter:</p>
        <p className="font-bold text-blue-500">{novel?.lastChapter}</p>
      </div>
      <div className="flex gap-2">
        <p className="text-sm text-gray-500 w-24">Status:</p>
        <p className="text-green-500 italic">{novel?.status || "Ongoing"}</p>
      </div>
      <div className="flex gap-2">
        <p className="text-sm text-gray-500 w-24">Description:</p>
        <p className="line-clamp-3 text-sm">{novel?.desc}</p>
      </div>

      <div className="options flex items-end justify-between mt-4">
        <div className="flex gap-4">
          <div
            className={`flex items-center gap-1 cursor-pointer hover:bg-blue-50 px-1 text-sm py-1 rounded-md min-w-24 ${
              likeNovel.data?.like?.isDeleted === false
                ? "text-blue-600 !bg-blue-200"
                : ""
            }`}
            onClick={handleLike}
          >
            {likeNovel.isLoading || isUpdateLike ? (
              <div className="scale-75 items-center justify-center">
                <Loader />
              </div>
            ) : (
              <>
                Liked
                <BiLike />
                <div
                  className={`h-full flex items-center justify-center rounded-[50%]  ${
                    likeNovel.data?.like?.isDeleted === false
                      ? "text-white bg-blue-400"
                      : "bg-gray-100"
                  } px-2 py-1`}
                >
                  <p className="text-xs">{likeNovel.data?.likeCount}</p>
                </div>
              </>
            )}
          </div>
          <div
            className={`flex items-center gap-1 cursor-pointer hover:bg-pink-50 px-1 text-sm py-1 rounded-md min-w-24  ${
              favoriteNovel.data?.favorite?.isDeleted === false
                ? "text-pink-600 !bg-pink-200"
                : ""
            }`}
            onClick={handleFavorite}
          >
            {favoriteNovel.isLoading || isUpdateFavorite ? (
              <div className="scale-75 items-center justify-center">
                <Loader />
              </div>
            ) : (
              <>
                <StarIcon /> Follow
                <div
                  className={`h-full flex items-center justify-center rounded-[50%]   ${
                    favoriteNovel.data?.favorite?.isDeleted === false
                      ? "text-white bg-pink-400"
                      : "bg-gray-100"
                  } px-2 py-1`}
                >
                  <p className="text-xs">{favoriteNovel.data?.favoriteCount}</p>
                </div>
              </>
            )}
          </div>
        </div>
        <div className="report">
          {report?.data ? (
            <Button
              onClick={() => setIsReport(true)}
              size={"sm"}
              className="text-gray-600 bg-gray-100 hover:bg-gray-200"
            >
              <FaFlag size={16} />
              <p className="text-sm">Da báo cáo</p>
            </Button>
          ) : (
            <Button
              onClick={() => setIsReport(true)}
              size={"sm"}
              className="bg-red-500 text-white hover:bg-red-700"
            >
              <FaFlag size={16} />
              <p className="text-sm">Báo cáo</p>
            </Button>
          )}
        </div>
      </div>

      <div className="absolute favor top-1 right-1">
        <PiStarFill color="#ff4aa4" size={24} />
      </div>
      {isReport && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-[#00000088] flex items-center justify-center"
          onClick={() => setIsReport(false)}
        >
          <ReportNovel />
        </div>
      )}
    </div>
  );
}

const ReportNovel = () => {
  return (
    <div
      className="px-4 py-3 w-1/2 bg-white rounded-xl shadow-md"
      onClick={(e) => e.stopPropagation()}
    >
      <h2 className="text-center py-2 text-2xl font-bold">Báo cáo tập văn</h2>
      <p className="mb-2 text-sm text-gray-600">Tập văn này có vấn đề:</p>
      <Select defaultValue="vi">
        <SelectTrigger
          className="text-lg w-full !ring-0 my-4 h-16"
          defaultValue={"1"}
        >
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1">Vi phạm bản quyền</SelectItem>
          <SelectItem value="2">Tập văn này cổ xíu, không phù hợp</SelectItem>
          <SelectItem value="3">
            Tập văn này có nội dung phân biệt, đối xử
          </SelectItem>
          <SelectItem value="4">
            Nội dung của tập văn chứa nội dung người lớn
          </SelectItem>
          <SelectItem value="5">Khác</SelectItem>
        </SelectContent>
      </Select>
      <div className="text-center">
        <Button size={"lg"} className="bg-red-500 text-white hover:bg-red-700">
          Báo cáo
        </Button>
      </div>
    </div>
  );
};
