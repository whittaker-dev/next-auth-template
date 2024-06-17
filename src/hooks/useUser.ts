import { _fetch } from "@/app/api/actions";
import { apiClient } from "@/app/api/axios";
import { IUser } from "@/features/apis/interfaces";
import useSWR from "swr";
export const useUser = () => {
  const fetcher = async (url: string) => {
    const _data: { user: IUser } = await apiClient.get("/auth/get-user");
    return _data.user;
  };
  const { data, error, isLoading, mutate } = useSWR(
    `/auth/get-user`,
    fetcher,
    {}
  );
  return { user: data, error, isLoading, mutate };
};
