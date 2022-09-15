import { FindRewardResponseDto } from "../rewards/find-reward.dto";
import { ProjectStatus } from "../../enums";

interface FindProjectResponseDto {
  title: string;
  subtitle: string;
  summary: string;
  thumbnailUrl: string;
  fundGoal: number;
  fundNow: number;
  status: ProjectStatus;
}
interface FindProjectFullResponseDto extends FindProjectResponseDto {
  mainPictureUrl: string;
  description: string;
  createdAt: Date;
  rewards: FindRewardResponseDto[];
}

export type { FindProjectResponseDto, FindProjectFullResponseDto };
