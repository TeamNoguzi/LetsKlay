import { ApiProperty, PartialType } from "@nestjs/swagger";

export class CreateRewardItemDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    quantity: number;
}

export class CreateRewardDto {
    @ApiProperty()
    title: string;

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

    @ApiProperty({type:[CreateRewardItemDto]})
    items: CreateRewardItemDto[];
}

export class CreateRewardResponseDto extends CreateRewardDto {
    @ApiProperty()
    id: number;
}