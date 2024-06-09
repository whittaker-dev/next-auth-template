import React from "react";
import ButtonMain from "../ButtonMain";
import Image from "next/image";
import { useSession } from "next-auth/react";

type Props = {};

const HeaderUser = (props: Props) => {
  const { data } = useSession();
  console.log("data", data);
  return (
    <div className="flex items-center justify-end gap-3">
      <ButtonMain title="Create post" className="p-3" />
      <div className="">
        <div className="relative w-4 h-4">
          <Image src={"/icons/notification.svg"} alt="notification-icon" fill />
        </div>
      </div>
      <div className="">
        {data?.user.avatar ? (
          <div className="relative w-10 h-10 rounded-full ">
            <Image
              src={data?.user.avatar}
              alt="profile-image"
              fill
              className="rounded-full object-cover"
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

export default HeaderUser;
