import { FundStatus } from "../../enums";
import { FindProjectFullResponseDto } from "../projects";
import { FindRewardResponseDto } from "../rewards";

interface FindFundResponseDto {
  id: number;
  hashId: string;
  amount: number;
  status: FundStatus;
  userId: number;
  reward: Omit<FindRewardResponseDto, "items"> & { project: FindProjectFullResponseDto };
  createdAt: Date;
}

export type { FindFundResponseDto };
