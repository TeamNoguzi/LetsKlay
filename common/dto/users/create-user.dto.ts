interface CreateUserDto {
  address: string;
  name: string;
  email: string;
}

interface CreateUserResponseDto {
  id: number;
  address: string;
  name: string;
  email: string;
}

export type { CreateUserDto, CreateUserResponseDto };
