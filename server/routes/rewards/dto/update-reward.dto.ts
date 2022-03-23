import { ApiProperty, ApiPropertyOptional, PartialType } from "@nestjs/swagger";
import { CreateRewardDto, CreateRewardItemDto } from "./create-reward.dto";

export class UpdateRewardItemDto extends CreateRewardItemDto {
    @ApiPropertyOptional()
    id?: number;
}

export class UpdateRewardDto extends PartialType(CreateRewardDto) {
    @ApiPropertyOptional({type: [UpdateRewardItemDto]})
    items?: UpdateRewardItemDto[]
}