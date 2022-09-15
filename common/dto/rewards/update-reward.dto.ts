import { CreateRewardDto, CreateRewardItemDto } from "./create-reward.dto";

interface UpdateRewardItemDto extends CreateRewardItemDto {
  id?: number;
}

interface UpdateRewardDto extends Partial<CreateRewardDto> {
  items?: UpdateRewardItemDto[];
}

export type { UpdateRewardDto, UpdateRewardItemDto };
