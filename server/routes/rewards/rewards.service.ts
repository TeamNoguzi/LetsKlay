import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateRewardDto } from './dto/create-reward.dto';
import { UpdateRewardDto } from './dto/update-reward.dto';
import { Reward } from './entities/reward.entity';

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardsRepository:Repository<Reward>
  ) {}
  
  createOne(projectId: number, createRewardDto: CreateRewardDto) {
    return this.rewardsRepository.save({
      ...createRewardDto,
      project:{
        id:projectId,
      },
    });
  }

  findAll(projectId: number) {
    return this.rewardsRepository.find({
      where: {
        project: {id: projectId}
      }
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} reward`;
  }

  update(id: number, updateRewardDto: UpdateRewardDto) {
    return `This action updates a #${id} reward`;
  }

  remove(id: number) {
    return `This action removes a #${id} reward`;
  }
}
