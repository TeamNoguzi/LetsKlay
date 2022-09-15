interface CreateRewardItemDto {
  id: number;
  name: string;
  quantity: number;
}

interface CreateRewardDto {
  title: string;
  price: number;
  description: string;
  deliveryStart: Date;
  deliveryEnd: Date;
  maxStock: number;
  stock: number;
  items: CreateRewardItemDto[];
}

interface CreateRewardResponseDto extends CreateRewardDto {
  id: number;
}

export type { CreateRewardDto, CreateRewardItemDto, CreateRewardResponseDto };
