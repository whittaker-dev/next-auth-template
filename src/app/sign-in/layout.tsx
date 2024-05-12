import AuthLayout from "@/layouts/AuthLayout";
import WithoutHeaderLayout from "@/layouts/WithoutHeaderLayout";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const SignInLayout = ({ children }: Props) => {
  return (
    <WithoutHeaderLayout>
      <AuthLayout>{children}</AuthLayout>
    </WithoutHeaderLayout>
  );
};

export default SignInLayout;
