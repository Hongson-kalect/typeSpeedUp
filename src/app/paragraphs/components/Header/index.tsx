import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PiPlus } from "react-icons/pi";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParagraphStore } from "../../_utils/store";

export const Header = () => {
  const { filter, setFilter } = useParagraphStore();
  return (
    <div
      id="para-header"
      className="bg-white rounded-lg p-4 py-2 flex justify-between"
    >
      <div className="language flex gap-2 items-center">
        <p className="font-medium text-lg">Language:</p>
        <Select defaultValue="vi">
          <SelectTrigger className="w-32 border-none outline-none !ring-0 text-sm">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="vi">Viet Nam</SelectItem>
            <SelectItem value="dark">Dark</SelectItem>
            <SelectItem value="system">System</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center justify-center gap-2">
        <p className="font-medium text-lg">Time:</p>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[120px] justify-start text-left text-xs",
                !filter.date && "text-muted-foreground"
              )}
            >
              {/* <CalendarIcon className="mr-2 h-4 w-4" /> */}
              {filter.date ? (
                filter.date.getFullYear() +
                "-" +
                filter.date.getMonth().toString().padStart(2, "0") +
                "-" +
                filter.date.getDate()
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={filter.date}
              onSelect={(date) => date && setFilter({ ...filter, date })}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Link href="/paragraphs/add">
          <Button className="bg-blue-600 hover:bg-blue-800">
            <PiPlus /> <p>Add paragraphs</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};
