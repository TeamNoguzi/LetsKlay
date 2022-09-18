import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import {
  CreateProjectDto as CreateProjectDtoType,
  CreateProjectResponseDto as CreateProjectResponseDtoType,
} from "@/dto";
import { CreateRewardDto, CreateRewardResponseDto } from "routes/rewards/dto/create-reward.dto";

export class CreateProjectDto implements CreateProjectDtoType {
  @ApiPropertyOptional()
  title?: string;

  @ApiPropertyOptional()
  subtitle?: string;

  @ApiPropertyOptional()
  summary?: string;

  @ApiPropertyOptional()
  thumbnailUrl?: string;

  @ApiPropertyOptional()
  mainPictureUrl?: string;

  @ApiPropertyOptional()
  description?: string;

  @ApiPropertyOptional()
  fundGoal?: number;

  @ApiPropertyOptional({ type: [CreateRewardDto] })
  rewards?: CreateRewardDto[];
}
export class CreateProjectResponseDto implements CreateProjectResponseDtoType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  title: string;

  @ApiProperty()
  subtitle: string;

  @ApiProperty()
  summary: string;

  @ApiProperty()
  thumbnailUrl: string;

  @ApiProperty()
  mainPictureUrl: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  fundGoal: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: [CreateRewardResponseDto] })
  rewards: CreateRewardResponseDto[];
}
