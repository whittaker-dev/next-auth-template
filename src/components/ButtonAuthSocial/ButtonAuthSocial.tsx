import { routerName, searchParamsKeys } from "@/constants";
import { signInSocial } from "@/features/auth/signInSocial";
import { Spinner } from "@nextui-org/react";
import clsx from "clsx";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
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
  const searchParams = useSearchParams();
  const returnUrl = searchParams.get(searchParamsKeys.returnUrl);

  const [loading, setLoading] = useState<boolean>(false);
  const handleAuthSocial = useCallback(async () => {
    try {
      setLoading(true);
      switch (type) {
        case ETypeAuthSocial.Email:
          router.push(
            `${routerName.signUp}?state=${searchParamsKeys.signUp.emailSignUp}`
          );
          break;
        case ETypeAuthSocial.Github:
          await signInSocial("github", returnUrl ?? "/");
          break;
        case ETypeAuthSocial.Google:
          await signInSocial("google", returnUrl ?? "/");
          break;
        case ETypeAuthSocial.Discord:
          await signInSocial("discord", returnUrl ?? "/");
          break;
        case ETypeAuthSocial.Twitter:
          await signInSocial("twitter", returnUrl ?? "/");
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
