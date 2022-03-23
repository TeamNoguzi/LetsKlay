import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { CreateRewardDto, CreateRewardResponseDto } from "routes/rewards/dto/create-reward.dto";

export class CreateProjectDto{
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

    @ApiPropertyOptional({type: [CreateRewardDto]})
    rewards?: CreateRewardDto[]
}
export class CreateProjectResponseDto {
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

    @ApiProperty({type: [CreateRewardResponseDto]})
    rewards: CreateRewardResponseDto[]
}