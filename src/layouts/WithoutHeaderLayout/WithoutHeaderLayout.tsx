import React from "react";

type Props = {
  children: React.ReactNode;
};

const WithoutHeaderLayout = ({ children }: Props) => {
  return <div className="without-header-layout h-screen">{children}</div>;
};

export default WithoutHeaderLayout;
