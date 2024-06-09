import { routerName, searchParamsName } from "@/constants";
import { signInSocial } from "@/features/auth/signInSocial";
import { Spinner } from "@nextui-org/react";
import clsx from "clsx";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";

export enum ETypeAuthSocial {
  Google = "Google",
  Github = "Github",
  Twitter = "Twitter",
  Discord = "Discord",
  Email = "Email",
}

type Props = {
  type: ETypeAuthSocial;
  title: string;
  icon: string;
};

const ButtonAuthSocial = React.memo(({ title, icon, type }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const handleAuthSocial = useCallback(async () => {
    try {
      setLoading(true);
      switch (type) {
        case ETypeAuthSocial.Email:
          router.push(
            `${routerName.signUp}?state=${searchParamsName.signUp.emailSignUp}`
          );
          break;
        case ETypeAuthSocial.Github:
          await signInSocial("github");
          break;
        case ETypeAuthSocial.Google:
          await signInSocial("google");
          break;
        case ETypeAuthSocial.Discord:
          await signInSocial("discord");
          break;
        case ETypeAuthSocial.Twitter:
          await signInSocial("twitter");
          break;
        default:
          break;
      }
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  }, [router, type]);
  return (
    <div
      className={clsx(
        "group bg-green-primary-600 size-full block rounded-md transition-all",
        loading ? "opacity-70" : ""
      )}
    >
      <div
        onClick={handleAuthSocial}
        className="flex items-center justify-between cursor-pointer w-full p-3 lg:p-4 bg-white rounded-md -translate-y-1 group-active:translate-y-0"
      >
        <div className="relative w-6 lg:w-8 h-6 lg:h-8">
          <Image src={icon} alt="icon-social" fill />
        </div>
        <p className="text-sm lg:text-base font-medium text-dark-primary">
          {title}
        </p>

        {loading ? (
          <Spinner
            size="md"
            classNames={{
              circle1: "border-b-green-primary",
              circle2: "border-b-green-primary",
            }}
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
});

ButtonAuthSocial.displayName = "ButtonAuthSocial";
export default ButtonAuthSocial;
