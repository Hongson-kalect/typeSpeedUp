"use client";

import { Input } from "@/components/ui/input";
import Image from "next/image";
import * as React from "react";
import { ILanguageItem } from "../_utils/interface";
import { useLanguageStore } from "../_utils/store";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useLanguageQuery } from "../_utils/query";
import { toast } from "react-toastify";

export interface ILanguageHandlerProps {
  language?: ILanguageItem;
  action: "create" | "update";
}

export default function LanguageHandler(props: ILanguageHandlerProps) {
  const { action, selectedLanguage, setSelectedLanguage } = useLanguageStore();
  const { getLanguage } = useLanguageQuery();
  const languageNameRef = React.useRef<HTMLInputElement | null>(null);
  const [language, setLanguage] = React.useState<ILanguageItem | undefined>({
    name: "",
    code: "",
    desc: "",
    flag: "",
  });

  const createLanguage = useMutation({
    mutationFn: async (data: ILanguageItem) => {
      const res = await axios.post("/api/language", data);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Tạo ngôn ngữ thành công");
      setSelectedLanguage(undefined);
      await getLanguage.refetch();
    },
  });

  const editLanguage = useMutation({
    mutationFn: async (data: ILanguageItem) => {
      const { id, ...rest } = data;
      const res = await axios.put("/api/language/" + language?.id, rest);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Edit ngôn ngữ thành công");
      await getLanguage.refetch();
    },
  });

  const deleteLanguage = useMutation({
    mutationFn: async () => {
      const res = await axios.delete("/api/language/" + language?.id);
      return res.data;
    },
    onSuccess: async () => {
      toast.success("Xoá ngôn ngữ thành công");
      setSelectedLanguage(undefined);
      await getLanguage.refetch();
    },
  });

  const handleAddLanguage = async () => {
    if (language) {
      createLanguage.mutate(language);
    }
  };

  const handleEditLanguage = async () => {
    if (language?.id) {
      editLanguage.mutate(language);
    }
  };

  const handleDeleteLanguage = async () => {
    if (language?.id) {
      deleteLanguage.mutate();
    }
  };

  console.log("language, selectedLanguage :>> ", language, selectedLanguage);

  React.useEffect(() => {
    if (!selectedLanguage)
      return setLanguage({ name: "", code: "", flag: "", desc: "" });
    setLanguage(JSON.parse(JSON.stringify(selectedLanguage)));
  }, [selectedLanguage]);

  React.useEffect(() => {
    languageNameRef?.current?.focus();
  }, [action, selectedLanguage]);

  if (!language) return <div>Loading</div>;

  return (
    <div className="w-96 h-full bg-white p-4 rounded-2xl">
      <h2 className="text-2xl font-medium">
        {action === "create" ? "Tạo ngôn ngữ" : "Cập nhật ngôn ngữ"}
      </h2>

      <form
        className="mt-8 flex flex-col gap-4"
        onSubmit={(e) => e.preventDefault()}
      >
        <div>
          <p>Tên ngôn ngữ</p>
          <Input
            ref={languageNameRef}
            value={language?.name}
            onChange={(e) => setLanguage({ ...language, name: e.target.value })}
          />
        </div>
        <div>
          <p>Mã ngôn ngữ</p>
          <Input
            value={language?.code}
            onChange={(e) => setLanguage({ ...language, code: e.target.value })}
          />
        </div>
        <div>
          <p>Mô tả</p>
          <Input
            value={language?.desc}
            onChange={(e) => setLanguage({ ...language, desc: e.target.value })}
          />
        </div>
        <div>
          <p>Hình ảnh</p>
          <Input
            value={language?.flag}
            onChange={(e) => setLanguage({ ...language, flag: e.target.value })}
          />
        </div>
        <div className="flex items-center justify-center h-20">
          <img
            className="h-full"
            src={language?.flag}
            alt="Preview Flag Image"
          />
        </div>

        <div className="flex flex-col items-center justify-center mt-8">
          {action === "create" ? (
            <Button
              className="bg-green-400 hover:bg-green-700 w-full h-12 text-lg"
              onClick={handleAddLanguage}
            >
              Tạo moi
            </Button>
          ) : (
            <>
              <Button
                size={"lg"}
                className="bg-blue-400 hover:bg-blue-700 w-full h-12 text-lg"
                onClick={handleEditLanguage}
              >
                Cập nhật
              </Button>
              <Button
                onClick={handleDeleteLanguage}
                className="bg-red-400 hover:bg-red-700 mt-4"
              >
                Xoa
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
