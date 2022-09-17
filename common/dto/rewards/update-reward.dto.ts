import { CreateRewardDto, CreateRewardItemDto } from "./create-reward.dto";

interface UpdateRewardItemDto extends CreateRewardItemDto {}

interface UpdateRewardDto extends Partial<CreateRewardDto> {}

export type { UpdateRewardDto, UpdateRewardItemDto };
