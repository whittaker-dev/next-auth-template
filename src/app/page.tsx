import { routerName } from "@/constants";
import HeaderLayout from "@/layouts/HeaderLayout";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Home page",
};
type Props = {};

const HomePage = (props: Props) => {
  return (
    <HeaderLayout>
      {/* ==== TITLE ==== */}
      <div className="pt-20">
        <div className="text-center text-[60px] font-bold font-montserrat text-dark-primary tracking-[1px]">
          CodeCraft:{" "}
          <span className="text-green-primary"> Mastering Development</span>
        </div>
        <p className="text-center text-xl font-semibold text-dark-primary mt-2">
          Learn, Create, and Innovate: Your Gateway to Technical Mastery
        </p>

        {/* ==== LINKS ==== */}
        <div className="flex items-center justify-center gap-6 mt-14">
          <Link
            href={routerName.subscriptions}
            className="py-3 px-4 rounded-md bg-green-primary border border-green-primary text-white text-base font-bold"
          >
            Started for free
          </Link>
          <Link
            href={routerName.newFeeds}
            className="py-3 px-4 rounded-md bg-transparent border-2 border-green-primary text-gray-charade text-base font-bold"
          >
            Explore news
          </Link>
        </div>
      </div>
    </HeaderLayout>
  );
};

export default HomePage;
