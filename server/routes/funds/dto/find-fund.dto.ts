import { FindFundResponseDto as FindFundResponseDtoType } from "@/dto";
import { FundStatus } from "@/enums";
import { ApiProperty } from "@nestjs/swagger";
import { FindProjectFullResponseDto } from "routes/projects/dto/find-project.dto";
import { FindRewardResponseDto } from "routes/rewards/dto/find-reward.dto";

class FindFundResponseDto implements FindFundResponseDtoType {
  @ApiProperty()
  id: number;
  @ApiProperty()
  hashId: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  status: FundStatus;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  reward: Omit<FindRewardResponseDto, "items"> & { project: FindProjectFullResponseDto };
  @ApiProperty()
  createdAt: Date;
}

export { FindFundResponseDto };
