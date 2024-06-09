import HeaderLayout from "@/layouts/HeaderLayout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const layout = ({ children }: Props) => {
  return <HeaderLayout>{children}</HeaderLayout>;
};

export default layout;
