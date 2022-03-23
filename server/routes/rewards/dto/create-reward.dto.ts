import { ApiProperty } from "@nestjs/swagger";

export class CreateRewardItemDto {
    @ApiProperty()
    name: string;

    @ApiProperty()
    quantity: number;
}

export class CreateRewardDto {
    @ApiProperty({type:[CreateRewardItemDto]})
    items: CreateRewardItemDto[];
    
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
}
