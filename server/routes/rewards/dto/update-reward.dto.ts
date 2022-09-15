import { ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import {
  UpdateRewardItemDto as UpdateRewardItemDtoType,
  UpdateRewardDto as UpdateRewardDtoType,
} from "@/dto";
import { CreateRewardDto, CreateRewardItemDto } from "./create-reward.dto";

export class UpdateRewardItemDto extends CreateRewardItemDto implements UpdateRewardItemDtoType {
  @ApiPropertyOptional()
  id?: number;
}

export class UpdateRewardDto extends PartialType(CreateRewardDto) implements UpdateRewardDtoType {
  @ApiPropertyOptional({ type: [UpdateRewardItemDto] })
  items?: UpdateRewardItemDto[];
}
