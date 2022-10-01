interface FindUserDto {
  id: number;
  name: string;
  address: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  profileImgUrl: string;
}

interface FindUserResponseDto extends FindUserDto {}

export { FindUserDto, FindUserResponseDto };
