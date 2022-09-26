import { CreateRewardResponseDto } from "./create-reward.dto";

interface FindRewardResponseDto extends CreateRewardResponseDto {
  projectId: number;
}

export type { FindRewardResponseDto };
