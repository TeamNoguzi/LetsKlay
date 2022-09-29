import { UpdateUserDto } from "@/dto";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/users.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  // 인증에 사용됨
  async findOne(address: string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        address: address,
      },
    });
  }

  async findOneWithId(id: number): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async createOne(address: string, email: string): Promise<User> {
    return await this.usersRepository.save({ address, email });
  }

  async updateOne(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    return await this.usersRepository.save({ id, ...updateUserDto });
  }
}
