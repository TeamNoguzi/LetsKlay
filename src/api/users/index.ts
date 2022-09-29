import { FindUserDto, UpdateUserDto, UpdateUserResponseDto } from "@/dto";
import axios from "../axios";

async function fetchUserServerSide(cookie: string) {
  const { data } = await axios.get<FindUserDto>("/users", { headers: { Cookie: cookie } });
  return data;
}

async function fetchUser() {
  const { data } = await axios.get<FindUserDto>("/users");
  return data;
}

async function updateMe(updateUserDto: UpdateUserDto) {
  const { data } = await axios.patch<UpdateUserResponseDto>("/users", { ...updateUserDto });
  return data;
}

export { fetchUserServerSide, fetchUser, updateMe };
