import { FindRewardResponseDto as FindRewardResponseDtoType } from "@/dto";
import { ApiProperty } from "@nestjs/swagger";
import { CreateRewardResponseDto } from "./create-reward.dto";

export class FindRewardResponseDto
  extends CreateRewardResponseDto
  implements FindRewardResponseDtoType
{
  @ApiProperty()
  projectId: number;
}
