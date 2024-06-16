import { routerName } from "@/constants";
import { signOutAction } from "@/features/auth/signOut";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Skeleton from "react-loading-skeleton";

type Props = {};

const MenuUser = (props: Props) => {
  const pathname = usePathname();
  const { data, status } = useSession();

  const items = [
    {
      key: `dashboard`,
      label: "Dashboard",
      url: routerName.dashboard,
      shortcut: "⌘D",
    },
    {
      key: `profile`,
      label: "My profile",
      url: routerName.dev,
      shortcut: "⌘P",
    },
    {
      key: `reading-list`,
      label: "Reading list",
      url: routerName.readingList,
      shortcut: "⌘R",
    },
    {
      key: `settings`,
      label: "Settings",
      url: routerName.settings,
      shortcut: "⌘S",
    },
    {
      key: `billing`,
      label: "Billing",
      url: routerName.billing,
      shortcut: "⌘B",
    },
    {
      key: `logout`,
      label: "Logout",
      shortcut: "⌘Esc",
    },
  ];
  return (
    <Dropdown>
      <DropdownTrigger className="cursor-pointer">
        {status !== "loading" ? (
          <div className="relative w-10 h-10 rounded-full ">
            <Image
              src={data?.user?.avatar ?? ""}
              alt="profile-image"
              fill
              className="rounded-full object-cover"
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full">
            <Skeleton className="size-full !rounded-full !leading-inherit" />
          </div>
        )}
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Static Actions"
        items={items}
        itemClasses={{
          base: [
            "data-[hover=true]:bg-green-primary-400",
            "data-[hover=true]:text-dark-primary",
          ],
        }}
      >
        {(item) => (
          <DropdownItem
            shortcut={item.shortcut}
            key={item.key}
            className={clsx("p-3 text-dark-primary")}
          >
            {item.key === "logout" ? (
              <form action={signOutAction.bind(null, pathname.split("/")[1])}>
                <button
                  type="submit"
                  className="text-sm font-normal hover:text-red-500"
                >
                  {item.label}
                </button>
              </form>
            ) : (
              <Link href={item?.url ?? "/"} className="block text-sm font-normal">
                {item.label}
              </Link>
            )}
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuUser;
