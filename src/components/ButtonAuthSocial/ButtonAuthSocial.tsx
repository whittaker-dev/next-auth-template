import { signIn } from "@/auth";
import { routerName, searchParamsName } from "@/constant";
import { signInSocial } from "@/feature/auth/signInSocial";
import { DEFAULT_LOGIN_REDIRECT } from "@/router";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";

export enum ETypeAuthSocial {
  Google = "Google",
  Github = "Github",
  Twitter = "Twitter",
  Apple = "Apple",
  Email = "Email",
}

type Props = {
  type: ETypeAuthSocial;
  title: string;
  icon: string;
};

const ButtonAuthSocial = React.memo(({ title, icon, type }: Props) => {
  const router = useRouter();
  const handleAuthSocial = useCallback(() => {
    try {
      switch (type) {
        case ETypeAuthSocial.Email:
          router.push(
            `${routerName.signUp}?state=${searchParamsName.signUp.emailSignUp}`
          );
          break;
        case ETypeAuthSocial.Github:
          signInSocial("github");
          break;
        case ETypeAuthSocial.Google:
          signInSocial("google");
          break;
        default:
          break;
      }
    } catch (error) {
      console.log({ error });
    }
  }, [router, type]);

  return (
    <div className="group bg-green-primary-600 size-full block rounded-md transition-all">
      <div
        onClick={handleAuthSocial}
        className="flex items-center justify-between cursor-pointer w-full p-3 lg:p-4 bg-white rounded-md -translate-y-1 group-active:translate-y-0"
      >
        <div className="relative w-6 lg:w-8 h-6 lg:h-8">
          <Image src={icon} alt="icon-social" fill />
        </div>
        <p className="text-sm lg:text-base font-medium text-dark-primary">{title}</p>
        <div></div>
      </div>
    </div>
  );
});

ButtonAuthSocial.displayName = "ButtonAuthSocial";
export default ButtonAuthSocial;
