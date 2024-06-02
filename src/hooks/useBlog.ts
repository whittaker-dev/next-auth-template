import { _fetch } from "@/app/api/actions";
import useSWR from "swr";
export const useBlog = () => {
  const fetcher = (url: string) => _fetch(url, "GET");
  const { data, error, isLoading, mutate } = useSWR(`/blogs`, fetcher);

  return { data, error, isLoading, mutate };
};
