import { Module } from '@nestjs/common';
import { RewardsService } from './rewards.service';
import { RewardsController } from './rewards.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reward } from './entities/reward.entity';
import { RewardItem } from './entities/reward-item.entity';
import { ProjectsModule } from 'routes/projects/projects.module';

@Module({
  imports: [
    ProjectsModule,
    TypeOrmModule.forFeature([Reward, RewardItem]),
  ],
  controllers: [RewardsController],
  providers: [RewardsService]
})
export class RewardsModule {}
