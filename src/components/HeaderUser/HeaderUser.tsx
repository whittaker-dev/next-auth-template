"use client";
import { IUser } from "@/features/apis/interfaces";
import Image from "next/image";
import ButtonMain from "../ButtonMain";
import MenuUser from "./components/MenuUser";
import { SWRConfig } from "swr";
import SwrProvider from "@/providers/SwrProvider";

type Props = {};

const HeaderUser = ({}: Props) => {
  return (
    <div className="flex items-center justify-end gap-3">
      <ButtonMain title="Create post" className="p-3" />
      <div className="">
        <div className="relative w-4 h-4">
          <Image src={"/icons/notification.svg"} alt="notification-icon" fill />
        </div>
      </div>
      <SwrProvider>
        <MenuUser />
      </SwrProvider>
    </div>
  );
};

export default HeaderUser;
