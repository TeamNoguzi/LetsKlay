interface UpdateUserDto {
  email: string;
  role: "user" | "admin";
  isActive: boolean;
  profileImgUrl: string;
}

export { UpdateUserDto };
