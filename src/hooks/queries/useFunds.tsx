import { useQuery } from "@tanstack/react-query";
import { fetchFundsPaged } from "api";

const useFunds = (page: number) => {
  const { data, isError } = useQuery(["funds", page], () => fetchFundsPaged(page), {
    keepPreviousData: true,
  });

  return { funds: data, isError };
};

export { useFunds };
