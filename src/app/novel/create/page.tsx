import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useMainStore } from "@/layouts/main.store";
import * as React from "react";
import { BiLeftArrow } from "react-icons/bi";

export default function CreateNovelPage() {
  //keep novel by zustand will be the best

  return (
    <div>
      <div className="flex gap-4 text-gray-600 items-center">
        <BiLeftArrow />
        <h2 className="font-bold cursor-pointer">{"Novel Name"}</h2>
      </div>
      <div className="flex gap-4 pt-1 flex-1 overflow-auto">
        <CreateNovel />
      </div>
    </div>
  );
}

//Add para may have fixed width
const CreateNovel = () => {
  const { userInfo } = useMainStore();

  const [novelInfo, setNovelInfo] = React.useState({
    name: "",
    isPrivate: false,
    desc: "",
  });

  const createNovel = () => {
    alert("Create new novel " + userInfo?.id);
  };

  return (
    <div>
      <h1>Create Novel</h1>
      <div className="flex flex-col gap-3">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="private"
            checked={novelInfo.isPrivate}
            onCheckedChange={(checked) => {
              console.log("checked :>> ", checked);
              setNovelInfo({
                ...novelInfo,
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
          <p>Header:</p>
          <Input
            onChange={(e) =>
              setNovelInfo({ ...novelInfo, name: e.target.value })
            }
          />
        </div>

        <div className="flex gap-2">
          <p>Description:</p>
          <Textarea
            rows={10}
            className="resize-none"
            onChange={(e) =>
              setNovelInfo({ ...novelInfo, desc: e.target.value })
            }
          />
        </div>

        <Button onClick={createNovel}>Add Paragraph</Button>
      </div>
    </div>
  );
};
