import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { FindRewardResponseDto } from "routes/rewards/dto/find-reward.dto";
import { ProjectStatus } from "../projects.enum";

export class FindProjectResponseDto{
    @ApiProperty()
    title: string;

    @ApiProperty()
    subtitle: string;
  
    @ApiProperty()
    summary: string;
  
    @ApiProperty()
    thumbnailUrl: string;

    @ApiProperty()
    fundGoal: number;

    @ApiProperty()
    fundNow: number;

    @ApiProperty()
    status: ProjectStatus;
}
export class FindProjectFullResponseDto extends FindProjectResponseDto{
    @ApiProperty()
    mainPictureUrl: string;
  
    @ApiProperty()
    description: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty({type: [FindRewardResponseDto]})
    rewards: FindRewardResponseDto[]
}