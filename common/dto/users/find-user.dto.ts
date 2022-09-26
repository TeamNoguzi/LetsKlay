interface FindUserDto {
  id: number;
  address: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  profileImgUrl: string;
}

interface FindUserResponseDto extends FindUserDto {}

export { FindUserDto, FindUserResponseDto };
