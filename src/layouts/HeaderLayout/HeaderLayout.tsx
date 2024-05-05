import Header from "@/components/Header";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const HeaderLayout = ({ children }: Props) => {
  return (
    <div className="header-layout mt-header-desktop h-[calc(100vh-73px)]">
      <Header />
      {children}
    </div>
  );
};

export default HeaderLayout;
