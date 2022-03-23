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
    return this.rewardsRepository
    .createQueryBuilder('reward')
    .leftJoinAndSelect('reward.items', 'item')
    .where('reward.projectId = :projectId', {projectId})
    .getMany();
  }

  updateOne(id: number, updateRewardDto: UpdateRewardDto) {
    return this.rewardsRepository.save({...updateRewardDto, id});
  }

  deleteOne(id: number) {
    return this.rewardsRepository.delete({id});
  }
}
