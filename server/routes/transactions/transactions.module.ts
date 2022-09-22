import { Module } from "@nestjs/common";
import { TransactionsService } from "./transactions.service";
import { TransactionsController } from "./transactions.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Transaction } from "./entities/transaction.entity";
import { User } from "routes/users/entities/users.entity";
import { Reward } from "routes/rewards/entities/reward.entity";
import { Project } from "routes/projects/entities/projects.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, User, Reward, Project])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionModule {}
