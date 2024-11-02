"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import * as React from "react";

export interface ILanguageHandlerProps {
  // action:'create'|'update',
  // name:string,
  // code:string,
  // desc:string
  // url:string
}

export default function LanguageHandler(props: ILanguageHandlerProps) {
  const [name, setName] = React.useState<string>("");
  const [code, setCode] = React.useState<string>("");
  const [desc, setDesc] = React.useState<string>("");
  const [imgUrl, setImgUrl] = React.useState<string>("");

  return (
    <div className="w-96 h-full bg-white p-4 rounded-2xl">
      <h2 className="text-2xl font-medium">Tạo ngôn ngữ mới</h2>

      <div className="mt-8 flex flex-col gap-4">
        <div>
          <p>Tên ngôn ngữ</p>
          <Input value={name} onChange={(e) => setName(e.target.value)} />
        </div>
        <div>
          <p>Mã ngôn ngữ</p>
          <Input value={code} onChange={(e) => setCode(e.target.value)} />
        </div>
        <div>
          <p>Mô tả</p>
          <Input value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>
        <div>
          <p>Hình ảnh</p>
          <Input value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} />
        </div>
        <div>
          <Image src={imgUrl} alt="image" width={100} height={100} />
        </div>
      </div>
    </div>
  );
}
