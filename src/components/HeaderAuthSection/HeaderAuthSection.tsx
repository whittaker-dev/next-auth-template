import { routerName } from "@/constants";
import Link from "next/link";

type Props = {};

const HeaderAuthSection = async (props: Props) => {
  return (
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
  );
};

export default HeaderAuthSection;
