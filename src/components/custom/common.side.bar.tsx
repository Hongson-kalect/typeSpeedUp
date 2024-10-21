"use client";

import Link from "next/link";
import { useParams, usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { BiTrendingUp } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";
import { MdEditNote } from "react-icons/md";

export const CommonSideBar = () => {
  const a = useRouter();
  const b = usePathname();
  console.log(b, "params");

  return (
    <div className="w-60 pt-5">
      <h1 className="font-bold text-xl text-center">
        <span className="text-blue-500">Type</span>
        <span>Speed</span>
        <span className="text-orange-500">Up</span>
      </h1>

      <div className="nav-list mt-5">
        <SideBarItem
          icon={<IoSearchOutline size={22} />}
          title="Speed test"
          href="/speed-test"
        />
        <SideBarItem
          icon={<MdEditNote size={22} />}
          title="Type paragraphs"
          href="/paragraphs"
        />
        <SideBarItem
          icon={<BiTrendingUp size={22} />}
          title="Tranining"
          href="/training"
        />
      </div>
    </div>
  );
};

type SideBarItemProps = {
  icon?: React.ReactNode;
  title: string;
  href: string;
};
const SideBarItem = (props: SideBarItemProps) => {
  const pathName = usePathname();
  const active = React.useMemo(() => pathName.includes(props.href), [pathName]);
  return (
    <Link
      href={props.href}
      className={`block wrapper px-6 relative h-12 duration-300 `}
    >
      {active ? (
        <div className="duration-300 absolute rounded-r-lg top-0 left-0 w-1.5 h-full bg-blue-500"></div>
      ) : null}
      <div
        className={`h-full px-4 rounded-lg  bar-item flex items-center gap-4 ${
          active ? "bg-blue-500 text-white" : "text-gray-800"
        } ${!active ? "hover:bg-blue-50" : ""} cursor-pointer`}
      >
        {props.icon}
        <p className="text-sm font-semibold">{props.title}</p>
      </div>
    </Link>
  );
};
