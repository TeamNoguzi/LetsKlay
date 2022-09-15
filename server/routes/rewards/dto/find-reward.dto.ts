import { FindRewardResponseDto as FindRewardResponseDtoType } from "@/dto";
import { CreateRewardResponseDto } from "./create-reward.dto";

export class FindRewardResponseDto
  extends CreateRewardResponseDto
  implements FindRewardResponseDtoType {}
