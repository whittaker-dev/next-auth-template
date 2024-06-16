import { auth } from "@/auth";
import HeaderLayout from "@/layouts/HeaderLayout";
import { getCachedSession } from "@/lib/getCachedSession";

type Props = {};

const HomePage = async (props: Props) => {
  const session = await getCachedSession();

  return (
    <HeaderLayout>
      HomePage
      {JSON.stringify(session)}
    </HeaderLayout>
  );
};

export default HomePage;
