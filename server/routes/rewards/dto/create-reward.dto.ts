import { ApiProperty } from "@nestjs/swagger";
import {
  CreateRewardItemDto as CreateRewardItemDtoType,
  CreateRewardDto as CreateRewardDtoType,
  CreateRewardResponseDto as CreateRewardResponseDtoType,
} from "@/dto";

export class CreateRewardItemDto implements CreateRewardItemDtoType {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;
}

export class CreateRewardDto implements CreateRewardDtoType {
  @ApiProperty()
  title: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  description: string;

  @ApiProperty()
  deliveryStart: Date;

  @ApiProperty()
  deliveryEnd: Date;

  @ApiProperty()
  maxStock: number;

  @ApiProperty()
  stock: number;

  @ApiProperty({ type: [CreateRewardItemDto] })
  items: CreateRewardItemDto[];
}

export class CreateRewardResponseDto
  extends CreateRewardDto
  implements CreateRewardResponseDtoType
{
  @ApiProperty()
  id: number;
}
