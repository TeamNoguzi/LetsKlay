import { CreateRewardDto, CreateRewardResponseDto } from "../rewards/create-reward.dto";

interface CreateProjectDto {
  title?: string;
  subtitle?: string;
  summary?: string;
  thumbnailUrl?: string;
  mainPictureUrl?: string;
  description?: string;
  fundGoal?: number;
  rewards?: CreateRewardDto[];
}
interface CreateProjectResponseDto {
  title: string;
  subtitle: string;
  summary: string;
  thumbnailUrl: string;
  mainPictureUrl: string;
  description: string;
  fundGoal: number;
  createdAt: Date;
  rewards: CreateRewardResponseDto[];
}

export type { CreateProjectDto, CreateProjectResponseDto };
