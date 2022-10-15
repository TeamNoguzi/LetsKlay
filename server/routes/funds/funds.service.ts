import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreateFundDto } from "./dto/create-fund.dto";
import Caver, { AbiItem } from "caver-js";
import FactoryABI from "@/klaytn/build/contracts/Factory.json";
import { Fund } from "./entities/funds.entity";
import { Repository, DataSource } from "typeorm";
import { InjectRepository, InjectDataSource } from "@nestjs/typeorm";
import { User } from "routes/users/entities/users.entity";
import { ContractEvent } from "@/entities";
import { Reward } from "routes/rewards/entities/reward.entity";
import { Project } from "routes/projects/entities/projects.entity";
import { DeleteFundDto } from "./dto/delete-fund.dto";
import { FundStatus } from "@/enums";

@Injectable()
export class FundsService implements OnModuleInit {
  constructor(
    @InjectRepository(Fund)
    private readonly fundsRepository: Repository<Fund>,
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    @InjectRepository(Reward)
    private readonly rewardsRepository: Repository<Reward>,
    @InjectRepository(Project)
    private readonly projectsRepository: Repository<Project>,
    @InjectDataSource()
    private datasource: DataSource
  ) {}

  onModuleInit() {
    const provider = new Caver.providers.WebsocketProvider("wss://api.baobab.klaytn.net:8652/", {
      timeout: 10000,
      clientConfig: {
        keepalive: true,
        keepaliveInterval: 6000,
      },
      reconnect: {
        auto: true,
        delay: 1000,
        // @ts-ignore
        maxAttempts: 10,
        onTimeout: false,
      },
    });

    const caver = new Caver(provider);
    const contract = new caver.contract(FactoryABI.abi as AbiItem[], process.env.FACTORY_ADDR);

    contract.events
      .FundResolveEvent()
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("data", async (data: ContractEvent<CreateFundDto>) => {
        this.createOne(data.returnValues);
      })
      .on("error", console.error);

    contract.events
      .FundCancelEvent()
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("data", async (data: ContractEvent<DeleteFundDto>) => {
        this.invalidateOne(data.returnValues);
      })
      .on("error", console.error);
  }

  async createOne({ amount, rewardId, userAddress, fundHashId }: CreateFundDto) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .withRepository(this.rewardsRepository)
        .createQueryBuilder("reward")
        .update()
        .set({ stock: () => `stock - ${amount}` })
        .where("reward.id = :id", { id: rewardId })
        .execute();

      const reward = await queryRunner.manager.withRepository(this.rewardsRepository).findOne({
        select: { price: true, projectId: true },
        where: { id: rewardId },
      });

      await queryRunner.manager
        .withRepository(this.projectsRepository)
        .createQueryBuilder("project")
        .update()
        .set({ fundNow: () => `fundNow + ${reward.price * amount}` })
        .where("project.id = :id", { id: reward.projectId })
        .execute();

      const user = await queryRunner.manager.withRepository(this.usersRepository).findOne({
        select: { id: true },
        where: { address: userAddress },
      });

      const result = await queryRunner.manager.withRepository(this.fundsRepository).save({
        amount,
        hashId: fundHashId,
        reward: { id: rewardId },
        user: { id: user.id },
      });

      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  findAll() {
    return `This action returns all Fund`;
  }

  async findAllWithUserCount(userId: number) {
    const count = await this.fundsRepository.countBy({ userId });
    return Math.floor(count / 10) + (count % 10 ? 1 : 0);
  }

  async findAllWithUserPaged(userId: number, page: number) {
    return this.fundsRepository
      .createQueryBuilder("fund")
      .select()
      .leftJoinAndSelect("fund.reward", "reward")
      .leftJoinAndSelect("reward.project", "project")
      .where("fund.userId = :userId", { userId })
      .take(10)
      .skip(page * 10)
      .orderBy("fund.createdAt", "DESC")
      .getMany();
  }

  findOne(id: number) {
    return `This action returns a #${id} Fund`;
  }

  update(id: number) {
    return `This action updates a #${id} Fund`;
  }

  async invalidateOne({ amount, rewardId, fundHashId }: DeleteFundDto) {
    const queryRunner = this.datasource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      await queryRunner.manager
        .withRepository(this.rewardsRepository)
        .createQueryBuilder("reward")
        .update()
        .set({ stock: () => `stock + ${amount}` })
        .where("reward.id = :id", { id: rewardId })
        .execute();

      const reward = await queryRunner.manager.withRepository(this.rewardsRepository).findOne({
        select: { price: true, projectId: true },
        where: { id: rewardId },
      });

      await queryRunner.manager
        .withRepository(this.projectsRepository)
        .createQueryBuilder("project")
        .update()
        .set({ fundNow: () => `fundNow - ${reward.price * amount}` })
        .where("project.id = :id", { id: reward.projectId })
        .execute();

      const result = await queryRunner.manager
        .withRepository(this.fundsRepository)
        .update({ hashId: fundHashId }, { status: FundStatus.refunded });

      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      console.error(err);
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  async invalidateAll(projectId: number) {
    const subQuery = this.datasource
      .createQueryBuilder()
      .select("reward.id", "rewardId")
      .from(Reward, "reward")
      .where(`reward.projectId = ${projectId}`)
      .getQuery();

    const result = await this.datasource
      .createQueryBuilder()
      .update(Fund)
      .set({ status: FundStatus.cancelled })
      .where(`fund.rewardId IN (${subQuery})`)
      .execute();

    return result;
  }
}
