import Image from "next/image";
import ButtonMain from "../ButtonMain";
import MenuUser from "./components/MenuUser";

type Props = {};

const HeaderUser = (props: Props) => {
  return (
    <div className="flex items-center justify-end gap-3">
      <ButtonMain title="Create post" className="p-3" />
      <div className="">
        <div className="relative w-4 h-4">
          <Image src={"/icons/notification.svg"} alt="notification-icon" fill />
        </div>
      </div>
      <MenuUser />
    </div>
  );
};

export default HeaderUser;
