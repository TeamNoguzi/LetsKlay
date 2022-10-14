import { FindProjectFullResponseDto } from "../projects";
import { FindRewardResponseDto } from "../rewards";

interface FindFundResponseDto {
  id: number;
  hashId: string;
  amount: number;
  valid: boolean;
  userId: number;
  reward: Omit<FindRewardResponseDto, "items"> & { project: FindProjectFullResponseDto };
  createdAt: Date;
}

export type { FindFundResponseDto };
