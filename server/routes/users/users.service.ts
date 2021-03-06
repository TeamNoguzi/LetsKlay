import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async findOne(address:string): Promise<User> {
    return await this.usersRepository.findOne({
      where: {
        address:address
      }
    });
  }

  async createOne(address:string, email:string): Promise<User> {
    return await this.usersRepository.save({address, email})
  }
}
