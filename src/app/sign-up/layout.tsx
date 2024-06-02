import AuthLayout from "@/layouts/AuthLayout";
import WithoutHeaderLayout from "@/layouts/WithoutHeaderLayout";
import { Metadata } from "next";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export const metadata: Metadata = {
  title: "Sign up",
};

const SignUpLayout = ({ children }: Props) => {
  return (
    <WithoutHeaderLayout>
      <AuthLayout>{children}</AuthLayout>
    </WithoutHeaderLayout>
  );
};

export default SignUpLayout;
