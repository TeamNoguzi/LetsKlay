import { FindFundResponseDto as FindFundResponseDtoType } from "@/dto";
import { ApiProperty } from "@nestjs/swagger";
import { FindRewardResponseDto } from "routes/rewards/dto/find-reward.dto";

class FindFundResponseDto implements FindFundResponseDtoType {
  @ApiProperty()
  id: number;
  @ApiProperty()
  hashId: string;
  @ApiProperty()
  amount: number;
  @ApiProperty()
  valid: boolean;
  @ApiProperty()
  userId: number;
  @ApiProperty()
  reward?: Omit<FindRewardResponseDto, "items">;
}

export { FindFundResponseDto };
