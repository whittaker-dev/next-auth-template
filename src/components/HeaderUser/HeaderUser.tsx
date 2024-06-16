import Image from "next/image";
import ButtonMain from "../ButtonMain";
import MenuUser from "./components/MenuUser";
import { IUser } from "@/features/apis/interfaces";
import { useSession } from "next-auth/react";

type Props = {};

const HeaderUser = ({}: Props) => {
  const { data } = useSession();
  return (
    <div className="flex items-center justify-end gap-3">
      <ButtonMain title="Create post" className="p-3" />
      <div className="">
        <div className="relative w-4 h-4">
          <Image src={"/icons/notification.svg"} alt="notification-icon" fill />
        </div>
      </div>
      <MenuUser user={data?.user} />
    </div>
  );
};

export default HeaderUser;
