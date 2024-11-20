import { NovelInfoType } from "@/app/paragraphs/_utils/interface";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import * as React from "react";
import { BiEdit, BiLike } from "react-icons/bi";
import { MdDelete, MdDeleteOutline, MdFavorite } from "react-icons/md";
import { toast } from "react-toastify";

export interface INovelInfoProps {
  novel?: NovelInfoType;
}

export default function NovelInfo({ novel }: INovelInfoProps) {
  const router = useRouter();

  console.log("novel :>> ", novel);
  if (!novel)
    return (
      <div className="bg-white rounded-lg pr-4 pl-6 py-3 flex-1 pt-8">
        <div>Loading...</div>
      </div>
    );

  const handleDeleteNovel = async () => {
    if (!window.confirm("Are you sure you want to delete this novel?")) return;
    const res = await fetch(`/api/novel/${novel._id || novel.id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      toast.success("Delete Novel Success");
      router.back();
    }
  };

  return (
    <div className="flex-1 overflow-auto">
      <div className="bg-white rounded-lg pr-4 pl-6 py-3 flex flex-col flex-1 h-full pt-8 overflow-auto hide-scroll">
        <div className="preview-image">
          <div className="max-h-[200px] w-[400px] h-screen max-w-[80%] bg-gray-400">
            preview-image
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex gap-2 items-center">
            <div className="rounded-md w-16 border h-6 mt-2 items-center justify-center border-gray-300 flex gap-2 cursor-pointer">
              <BiLike className="text-gray-600" />{" "}
              <p className="text-xs text-gray-600">12k</p>
            </div>

            <div className="rounded-md w-16 border h-6 mt-2 items-center justify-center border-gray-300 flex gap-2 cursor-pointer">
              <MdFavorite className="text-gray-600" />{" "}
              <p className="text-xs text-gray-600">12k</p>
            </div>
          </div>
          <div className="flex gap-2 items-center">
            <Link href={`/novel/${novel._id || novel.id}/edit`}>
              <div className="rounded-md shadow px-2 h-6 mt-2 items-center justify-center shadow-orange-300 bg-orange-400 text-white flex gap-2 cursor-pointer">
                <BiEdit className="" /> <p className="text-xs ">Edit</p>
              </div>
            </Link>

            <div
              onClick={handleDeleteNovel}
              className="rounded-md shadow px-2 h-6 mt-2 items-center justify-center shadow-red-300 bg-red-600 text-white flex gap-2 cursor-pointer"
            >
              <MdDelete className="text-white" />{" "}
              <p className="text-xs ">Remove</p>
            </div>

            <Link href={`/novel/${novel._id || novel.id}/add-chapter`}>
              <div className="rounded-md shadow px-2 h-6 mt-2 items-center justify-center shadow-green-300 bg-green-600 text-white flex gap-2 cursor-pointer">
                <PlusIcon className="text-white" />{" "}
                <p className="text-xs ">Chap</p>
              </div>
            </Link>
          </div>
        </div>
        <h2 className="text-2xl py-2 my-2">{novel.name}</h2>
        <div className="text-gray-700 flex flex-col gap-1">
          <div className="flex gap-3 items-center">
            <p className="opacity-80 min-w-24 text-sm">Người đăng:</p>
            <p>{1 + 1 === 2 ? "Kalect" : novel.userId}</p>
          </div>

          <div className="flex gap-3 items-center">
            <p className="opacity-80 min-w-24 text-sm">Số chapter:</p>
            <p>{novel.paragraphs?.length || "Null"}</p>
            <p className="opacity-80 min-w-24 text-sm ml-4">Chapter cuối:</p>
            <p>{novel.paragraphs?.at(-1)?.chapter}</p>
          </div>

          <div className="flex gap-3 items-center">
            <p className="opacity-80 min-w-24 text-sm">Tình trạng:</p>
            <p>{novel.status || " On going"}</p>
          </div>

          <div className="flex gap-3 items-center">
            <p className="opacity-80 min-w-24 text-sm">Mô tả:</p>
            <p>{novel.desc || "Chưa có mô tả"}</p>
          </div>

          {novel.firstChapter?.id || novel.firstChapter?._id ? (
            <div className="flex gap-4 mt-3">
              <Link
                href={`/paragraphs/${
                  novel.firstChapter.id || novel.firstChapter._id
                }`}
              >
                <Button>Gõ chương đầu</Button>
              </Link>
              <Link
                href={`/paragraphs/${
                  novel.paragraphs?.at(-1)?.id || novel.paragraphs?.at(-1)?._id
                }`}
              >
                <Button className="bg-blue-600 hover:bg-blue-800">
                  Gõ chương cuối
                </Button>
              </Link>
            </div>
          ) : (
            <p className="mt-2 ml-3 text-gray-400 font-bold italic">
              Chưa có bài viết nào
            </p>
          )}
        </div>
        <h3 className="mt-8 font-medium text-lg underline">Có thể bạn thích</h3>
        <div className="py-2 flex-1 overflow-auto shadow-inner shadow-gray-200 ">
          <div className="h-full overflow-auto">
            <div className="flex gap-y-6 flex-wrap px-4 py-3">
              <div className="w-1/2 flex gap-3 ">
                <div className="h-20 w-32 bg-gray-500"></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-medium line-clamp-2">
                    Tiêu đề của novel được đề xuất
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">Số chap: 140</p>
                    <p className="flex items-center gap-2 text-xs text-gray-600">
                      <BiLike /> 10k
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex gap-3 ">
                <div className="h-20 w-32 bg-gray-500"></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-medium line-clamp-2">
                    Tiêu đề của novel được đề xuất
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">Số chap: 140</p>
                    <p className="flex items-center gap-2 text-xs text-gray-600">
                      <BiLike /> 10k
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex gap-3 ">
                <div className="h-20 w-32 bg-gray-500"></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-medium line-clamp-2">
                    Tiêu đề của novel được đề xuất
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">Số chap: 140</p>
                    <p className="flex items-center gap-2 text-xs text-gray-600">
                      <BiLike /> 10k
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex gap-3 ">
                <div className="h-20 w-32 bg-gray-500"></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-medium line-clamp-2">
                    Tiêu đề của novel được đề xuất
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">Số chap: 140</p>
                    <p className="flex items-center gap-2 text-xs text-gray-600">
                      <BiLike /> 10k
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex gap-3 ">
                <div className="h-20 w-32 bg-gray-500"></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-medium line-clamp-2">
                    Tiêu đề của novel được đề xuất
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">Số chap: 140</p>
                    <p className="flex items-center gap-2 text-xs text-gray-600">
                      <BiLike /> 10k
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex gap-3 ">
                <div className="h-20 w-32 bg-gray-500"></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-medium line-clamp-2">
                    Tiêu đề của novel được đề xuất
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">Số chap: 140</p>
                    <p className="flex items-center gap-2 text-xs text-gray-600">
                      <BiLike /> 10k
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex gap-3 ">
                <div className="h-20 w-32 bg-gray-500"></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-medium line-clamp-2">
                    Tiêu đề của novel được đề xuất
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">Số chap: 140</p>
                    <p className="flex items-center gap-2 text-xs text-gray-600">
                      <BiLike /> 10k
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex gap-3 ">
                <div className="h-20 w-32 bg-gray-500"></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-medium line-clamp-2">
                    Tiêu đề của novel được đề xuất
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">Số chap: 140</p>
                    <p className="flex items-center gap-2 text-xs text-gray-600">
                      <BiLike /> 10k
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex gap-3 ">
                <div className="h-20 w-32 bg-gray-500"></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-medium line-clamp-2">
                    Tiêu đề của novel được đề xuất
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">Số chap: 140</p>
                    <p className="flex items-center gap-2 text-xs text-gray-600">
                      <BiLike /> 10k
                    </p>
                  </div>
                </div>
              </div>
              <div className="w-1/2 flex gap-3 ">
                <div className="h-20 w-32 bg-gray-500"></div>
                <div className="flex flex-col justify-between py-1">
                  <p className="font-medium line-clamp-2">
                    Tiêu đề của novel được đề xuất
                  </p>
                  <div>
                    <p className="text-sm text-gray-600">Số chap: 140</p>
                    <p className="flex items-center gap-2 text-xs text-gray-600">
                      <BiLike /> 10k
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
