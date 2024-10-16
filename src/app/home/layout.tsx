import * as React from "react";

export interface IHomeLayoutProps {
  children: React.ReactNode;
}

export default function HomeLayout(props: IHomeLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <div className="flex flex-1 ">
        <SideBar />
        <div className="flex-1 flex justify-center">{props.children}</div>
      </div>
      <Footer />
    </div>
  );
}

const Header = () => {
  return (
    <div className="bg-black text-white flex items-center justify-center">
      this is header
    </div>
  );
};

const Footer = () => {
  return (
    <div className="bg-black text-white flex items-center justify-center">
      this is footer
    </div>
  );
};

const SideBar = () => {
  return (
    <div className="h-full w-48 bg-red-400">
      <div className="w-48">navbar header</div>
    </div>
  );
};
