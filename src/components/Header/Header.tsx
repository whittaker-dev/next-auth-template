import { auth } from "@/auth";
import { routerName } from "@/constants";
import { Input } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import HeaderAuthSection from "../HeaderAuthSection";
import MenuUser from "../HeaderUser";

type Props = {};

const Header = async (props: Props) => {
  const session = await auth();
  return (
    <header className="fixed left-0 right-0 top-0 z-[9999] bg-green-primary-200 px-[5%] lg:px-[10%] py-4 flex items-center justify-between border-b border-solid border-b-slate-200">
      <div className="flex items-center justify-start gap-6">
        <Link href={routerName.init} className="header-logo relative w-12 h-12">
          <Image
            src={"/images/logo-trysomethign.png"}
            alt="logo-app"
            fill
            className="object-contain"
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

      {session && <MenuUser />}
      {!session && <HeaderAuthSection />}
    </header>
  );
};

export default Header;
