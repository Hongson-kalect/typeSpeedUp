"use client";

import { useIsMounted } from "@/hooks/useIsMounted";
import React from "react";
import ReactQuill from "react-quill";

interface QuillProps {
  value: string;
  onChange: (value: string) => void;
}

function Editor({ value, onChange }: QuillProps) {
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ size: [] }],
      [{ font: [] }],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "image"],
      [{ color: ["red", "#785412"] }],
      [{ background: ["red", "#785412"] }],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "color",
    "image",
    "background",
    "align",
    "size",
    "font",
  ];
  const handleProcedureContentChange = (content, delta, source, editor) => {
    onChange(content);
  };
  const isMounted = useIsMounted();

  return isMounted() ? (
    <ReactQuill
      theme="snow"
      modules={modules}
      formats={formats}
      value={value}
      onChange={handleProcedureContentChange}
    />
  ) : null;
}

export default Editor;

// render(<Editor />, document.getElementById("root"));
