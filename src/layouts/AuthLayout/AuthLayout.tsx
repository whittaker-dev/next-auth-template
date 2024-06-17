"use client";
import { appName, routerName } from "@/constants";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useMemo } from "react";
type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const pathname = usePathname();
  const isSignInPage = useMemo(() => {
    return pathname === routerName.signIn;
  }, [pathname]);
  return (
    <div className="flex items-center justify-center flex-col bg-green-primary-400 py-10 lg:py-20">
      <div className="relative w-24 h-12">
        <Image src={"/images/logo-app.jpg"} alt="logo-app" fill />
      </div>
      <h4 className="text-2xl lg:text-3xl font-bold text-dark-primary mt-8 mb-2 text-center">
        Join the TrySomeThign Community
      </h4>
      <p className="text-medium lg:text-lg font-normal text-dark-primary text-center">
        TrySomeThign Community is a community of <br /> 1,446,322 amazing
        developers
      </p>
      <div className="mt-6 w-[90%] md:w-[50%] xl:w-[35%] 2xl:w-[450px]">
        {children}
      </div>

      <div className="mt-12 text-xs lg:text-sm font-medium text-gray-400 italic text-center">
        By signing up, you are agreeing to our <br />{" "}
        <Link href={"#"} className="text-blue-700">
          privacy policy terms of use
        </Link>
        , and{" "}
        <Link href={"#"} className="text-blue-700">
          code of conduct.
        </Link>
      </div>
      <Divider style={{ width: "30%", margin: "20px 0" }} />

      <div className="text-xs lg:text-sm font-medium text-dark-primary">
        {isSignInPage
          ? `New to ${appName} Community?`
          : "Already have an account?"}{" "}
        <Link
          href={isSignInPage ? routerName.signUp : routerName.signIn}
          className="text-blue-700"
        >
          {isSignInPage ? "Create account." : "Log in."}
        </Link>
      </div>
    </div>
  );
};

export default AuthLayout;
