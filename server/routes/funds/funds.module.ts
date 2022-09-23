import { Module } from "@nestjs/common";
import { FundsService } from "./funds.service";
import { FundsController } from "./funds.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Fund } from "./entities/funds.entity";
import { User } from "routes/users/entities/users.entity";
import { Reward } from "routes/rewards/entities/reward.entity";
import { Project } from "routes/projects/entities/projects.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Fund, User, Reward, Project])],
  controllers: [FundsController],
  providers: [FundsService],
  exports: [FundsService],
})
export class FundsModule {}
