import React from "react";
import { SWRConfig } from "swr";

type Props = {
  children: React.ReactNode;
};

const SwrProvider = ({ children }: Props) => {
  return <SWRConfig value={{}}>{children}</SWRConfig>;
};

export default SwrProvider;
