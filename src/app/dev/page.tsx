import { auth } from "@/auth";
import { getCachedSession } from "@/lib/getCachedSession";

const Page = async () => {
  const session = await getCachedSession();
  return <div>{JSON.stringify(session)}</div>;
};

export default Page;
