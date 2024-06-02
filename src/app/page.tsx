import { auth } from "@/auth";
import HeaderLayout from "@/layouts/HeaderLayout";

type Props = {};

const HomePage = async (props: Props) => {
  const session = await auth();

  return (
    <HeaderLayout>
      HomePage
      {JSON.stringify(session)}
    </HeaderLayout>
  );
};

export default HomePage;
