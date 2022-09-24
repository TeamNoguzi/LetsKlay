interface FindUserDto {
  id: number;
  address: string;
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  profileImgUrl: string;
}

export { FindUserDto };
