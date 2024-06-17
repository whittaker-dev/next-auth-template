import { routerName } from "@/constants";
import { signOutAction } from "@/features/auth/signOut";
import { useUser } from "@/hooks/useUser";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Skeleton from "react-loading-skeleton";

type Props = {};

const MenuUser = ({}: Props) => {
  const { user, isLoading, error } = useUser();
  const pathname = usePathname();

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
        {isLoading ? (
          <div className="w-10 h-10 rounded-full ">
            <Skeleton className="size-full !rounded-full" />
          </div>
        ) : (
          <div className="relative w-10 h-10 rounded-full ">
            <Image
              src={user?.avatar ?? ""}
              alt="profile-image"
              fill
              className="rounded-full object-cover"
            />
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
            className={clsx("p-0 pr-3 text-dark-primary")}
          >
            <div className="p-3">
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
                <Link
                  href={item?.url ?? "/"}
                  className="block text-sm font-normal"
                >
                  {item.label}
                </Link>
              )}
            </div>
          </DropdownItem>
        )}
      </DropdownMenu>
    </Dropdown>
  );
};

export default MenuUser;
