import WithoutHeaderLayout from "@/layouts/WithoutHeaderLayout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const SignUpLayout = ({ children }: Props) => {
  return <WithoutHeaderLayout>{children}</WithoutHeaderLayout>;
};

export default SignUpLayout;
