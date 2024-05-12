"use client";
import ButtonAuthSocial from "@/components/ButtonAuthSocial";
import { ETypeAuthSocial } from "@/components/ButtonAuthSocial/ButtonAuthSocial";
import FormSignUpEmail from "@/components/FormSignUpEmail";
import { routerName, searchParamsName } from "@/constant";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

type Props = {};

const SignUp = (props: Props) => {
  const searchParams = useSearchParams();
  const isSignUpEmail =
    searchParams.get("state") === searchParamsName.signUp.emailSignUp;

  return (
    <div className="flex items-center justify-center flex-col bg-green-primary-400 w-full">
      {isSignUpEmail ? (
        <div className="w-full lg:w-[600px]">
          <FormSignUpEmail />
        </div>
      ) : (
        <>
          <div className="flex items-center justify-start gap-4 flex-col mt-10 w-full">
            <ButtonAuthSocial
              title="Sign up with Apple"
              type={ETypeAuthSocial.Apple}
              icon="/icons/apple.svg"
            />
            <ButtonAuthSocial
              title="Sign up with Google"
              type={ETypeAuthSocial.Google}
              icon="/icons/gmail.svg"
            />
            <ButtonAuthSocial
              title="Sign up with Twitter (X)"
              type={ETypeAuthSocial.Twitter}
              icon="/icons/twitter.svg"
            />
            <ButtonAuthSocial
              title="Sign up with Github"
              type={ETypeAuthSocial.Github}
              icon="/icons/github.svg"
            />
            <ButtonAuthSocial
              title="Sign up with Email"
              type={ETypeAuthSocial.Email}
              icon="/icons/email.svg"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default SignUp;
