"use client";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { PiPlus } from "react-icons/pi";
import { useNovelStore } from "../_utils/store";

export const Header = () => {
  const [date, setDate] = React.useState(new Date());
  const [isRange, setIsRange] = React.useState(false);
  const { novelFilter, setNovelFilter } = useNovelStore();

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
        <p className="font-medium text-lg">Sort:</p>

        <Select
          defaultValue="createdAt"
          value={novelFilter.sort}
          onValueChange={(e) => setNovelFilter({ sort: e })}
        >
          <SelectTrigger className="w-32 border-none outline-none !ring-0 text-sm">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="createdAt">Time Release</SelectItem>
            <SelectItem value="like">Liked Count</SelectItem>
            <SelectItem value="favorite">Follow Count</SelectItem>
          </SelectContent>
        </Select>

        <Select
          defaultValue="desc"
          value={novelFilter.order}
          onValueChange={(e) => setNovelFilter({ order: e })}
        >
          <SelectTrigger className="w-20 border-none outline-none !ring-0 text-sm">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="desc">desc</SelectItem>
            <SelectItem value="asc">asc</SelectItem>
          </SelectContent>
        </Select>
        {/* <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[120px] justify-start text-left text-xs",
                !date && "text-muted-foreground"
              )}
            >
              {}
              {date ? (
                date.getFullYear() +
                "-" +
                date.getMonth().toString().padStart(2, "0") +
                "-" +
                date.getDate()
              ) : (
                <span>Pick a date</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(date) => date && setDate(date)}
              initialFocus
            />
          </PopoverContent>
        </Popover> */}
      </div>
      <div>
        <Link href="/paragraphs/add">
          <Button className="bg-blue-600 hover:bg-blue-800">
            <PiPlus /> <p>Add novel</p>
          </Button>
        </Link>
      </div>
    </div>
  );
};
