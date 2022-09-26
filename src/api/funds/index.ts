import { FindFundResponseDto } from "@/dto";
import axios from "../axios";

const fetchFundsPaged = async (page: number) => {
  const { data } = await axios.get<FindFundResponseDto>(`/funds/all/user/${page}`);
  return data;
};

export { fetchFundsPaged };
