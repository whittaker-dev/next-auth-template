"use client";
import { apiClient } from "@/app/api/axios";
import { routerName } from "@/constants";
import { signOutAction } from "@/features/auth/signOut";
import { Button, Input } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

type Props = {};

const Header = (props: Props) => {
  const session = useSession();
  return (
    <header className="fixed left-0 right-0 top-0 z-[9999] bg-green-primary-200 px-[5%] lg:px-[10%] py-4 flex items-center justify-between border-b border-solid border-b-slate-200">
      <div className="flex items-center justify-start gap-6">
        <Link href={routerName.init} className="header-logo relative w-16 h-8">
          <Image
            src={"/images/logo-app.png"}
            alt="logo-app"
            fill
            className="object-cover"
          />
        </Link>
        <div className="header-search relative ">
          <Input
            inputMode="search"
            placeholder="Search..."
            classNames={{
              inputWrapper: [
                "w-[400px]",
                "h-[40px]",
                "rounded-md border",
                "border-solid ",
                "border-slate-200",
                "bg-transparent",
                "hover:border-slate-400",
                "data-[hover=true]:bg-transparent ",
                "group-data-[focus=true]:bg-transparent",
                "group-data-[focus-visible=true]:ring-offset-0",
                "group-data-[focus-visible=true]:ring-transparent",
                "transition-all",
              ],
            }}
          />
          <Link
            href={routerName.search}
            className="absolute top-1/2 -translate-y-1/2 translate-x-0 right-1  hover:bg-green-primary-400 h-4/5 aspect-square rounded-md flex items-center justify-center cursor-pointer transition-all"
          >
            <div className="relative w-4 h-4">
              <Image src="/icons/search-black.svg" alt="search-icon" fill />
            </div>
          </Link>
        </div>
      </div>

      <div className="flex items-center justify-end gap-3">
        <Link
          href={routerName.signIn}
          className="text-base text-dark-primary font-medium hover:bg-green-primary-400 px-4 py-2 rounded transition-all text-nowrap"
        >
          Log in
        </Link>
        <Link
          href={routerName.signUp}
          className="group bg-green-primary-600 size-full block rounded-md"
        >
          <span className="block px-3 py-2 rounded-md bg-white border-2 border-solid border-green-primary-600 text-sm font-bold text-green-primary-600 transition-all -translate-y-1 -translate-x-1 group-active:translate-x-0 group-active:translate-y-0">
            Create account
          </span>
        </Link>
      </div>
      {session.status === "authenticated" && (
        <form action={signOutAction}>
          <Button type="submit">Logout</Button>
        </form>
      )}
    </header>
  );
};

export default Header;
