import { useQuery } from "@tanstack/react-query";
import { fetchFundsCount, fetchFundsPaged } from "api";

const useFunds = (page: number) => {
  const { data, isError } = useQuery(["funds", page], () => fetchFundsPaged(page), {
    keepPreviousData: true,
  });

  return { funds: data, isError };
};

const useFundsPageCount = () => {
  const { data, isError } = useQuery(["funds", "count"], fetchFundsCount);
  return { count: data, isError };
};

export { useFunds, useFundsPageCount };
