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
    <div className="flex items-center justify-center flex-col bg-green-primary-400 py-20">
      {isSignUpEmail ? (
        <FormSignUpEmail />
      ) : (
        <>
          <div className="relative w-24 h-12">
            <Image src={"/images/logo-app.png"} alt="logo-app" fill />
          </div>
          <h4 className="text-3xl font-bold text-dark-primary mt-8 mb-2">
            Join the TrySomeThign Community
          </h4>
          <p className="text-lg font-normal text-dark-primary text-center">
            TrySomeThign Community is a community of <br /> 1,446,322 amazing
            developers
          </p>

          <div className="flex items-center justify-start gap-4 flex-col mt-10 w-[30%]">
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

      <div className="mt-12 text-sm font-medium text-gray-400 italic w-[30%] text-center">
        By signing up, you are agreeing to our{" "}
        <Link href={"#"} className="text-blue-700">
          privacy policy terms of use
        </Link>
        , and{" "}
        <Link href={"#"} className="text-blue-700">
          code of conduct.
        </Link>
      </div>
      <Divider style={{ width: "30%", margin: "20px 0" }} />

      <div className="text-sm font-medium text-dark-primary">
        Already have an account? {" "}
        <Link href={routerName.signIn} className="text-blue-700">
          Log in.
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
