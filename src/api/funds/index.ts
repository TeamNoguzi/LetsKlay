import { FindFundResponseDto } from "@/dto";
import axios from "../axios";

const fetchFundsPaged = async (page: number) => {
  const { data } = await axios.get<FindFundResponseDto[]>(`/funds/all/user/${page}`);
  return data;
};

const fetchFundsCount = async () => {
  const { data } = await axios.get<number>(`/funds/all/user/count`);
  return data;
};

export { fetchFundsPaged, fetchFundsCount };
