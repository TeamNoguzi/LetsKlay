import { ApiProperty } from "@nestjs/swagger";
import {
  FindProjectResponseDto as FindProjectResponseDtoType,
  FindProjectFullResponseDto as FindProjectFullResponseDtoType,
} from "@/dto";
import { FindRewardResponseDto } from "routes/rewards/dto/find-reward.dto";
import { ProjectStatus } from "@/enums";

export class FindProjectResponseDto implements FindProjectResponseDtoType {
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
  fundGoal: number;

  @ApiProperty()
  fundNow: number;

  @ApiProperty()
  status: ProjectStatus;
}
export class FindProjectFullResponseDto
  extends FindProjectResponseDto
  implements FindProjectFullResponseDtoType
{
  @ApiProperty()
  mainPictureUrl: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty({ type: [FindRewardResponseDto] })
  rewards: FindRewardResponseDto[];
}
