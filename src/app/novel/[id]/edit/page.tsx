import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import { BiLeftArrow } from "react-icons/bi";
import { useNovelStore } from "../../_utils/store";
import { Checkbox } from "@/components/ui/checkbox";

export default function EditParagraph() {
  //keep novel by zustand will be the best

  return (
    <div>
      <div className="flex gap-4 text-gray-600 items-center">
        <BiLeftArrow />
        <h2 className="font-bold cursor-pointer">{"Novel Name"}</h2>
      </div>
      <div className="flex gap-4 pt-1 flex-1 overflow-auto">
        <EditPara />
      </div>
    </div>
  );
}

//Edit para may have fixed width
const EditPara = () => {
  const { selectedNovel, setSelectedNovel } = useNovelStore();

  if (!selectedNovel)
    return (
      <div>
        <h1>Edit Paragraph</h1>
      </div>
    );

  return (
    <div>
      <h1>Edit Paragraph</h1>
      <div className="flex flex-col gap-3">
        {/* <div className="flex gap-2">
        <p>Chapter:</p>
        <Input type="number" value={selectedNovel.} />
      </div> */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="private"
            checked={selectedNovel.isPrivate}
            onCheckedChange={(checked) => {
              console.log("checked :>> ", checked);
              setSelectedNovel({
                ...selectedNovel,
                isPrivate: !!checked,
              });
            }}
          />
          <label
            htmlFor="private"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Private this novel
          </label>
        </div>

        <div className="flex gap-2">
          <p>Name:</p>
          <Input
            value={selectedNovel.name}
            onChange={(e) =>
              setSelectedNovel({ ...selectedNovel, name: e.target.value })
            }
          />
        </div>

        <div className="flex gap-2">
          <p>Description:</p>
          <Textarea
            rows={10}
            value={selectedNovel.desc}
            onChange={(e) =>
              setSelectedNovel({ ...selectedNovel, desc: e.target.value })
            }
            className="resize-none"
          />
        </div>

        <Button>Update Paragraph</Button>
      </div>
    </div>
  );
};
