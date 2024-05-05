import Image from "next/image";
import React, { useCallback } from "react";
import { useRouter } from "next/navigation";
import { routerName, searchParamsName } from "@/constant";

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

        default:
          break;
      }
    } catch (error) {
      console.log({ error });
    }
  }, [type]);
  return (
    <div className="group bg-green-primary-600 size-full block rounded-md transition-all">
      <div
        onClick={handleAuthSocial}
        className="flex items-center justify-between cursor-pointer w-full p-4 bg-white rounded-md -translate-y-1 group-active:translate-y-0"
      >
        <div className="relative w-8 h-8">
          <Image src={icon} alt="icon-social" fill />
        </div>
        <p className="text-base font-medium text-dark-primary">{title}</p>
        <div></div>
      </div>
    </div>
  );
});

ButtonAuthSocial.displayName = "ButtonAuthSocial";
export default ButtonAuthSocial;
