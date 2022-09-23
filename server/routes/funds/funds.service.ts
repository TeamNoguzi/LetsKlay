import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import Caver, { AbiItem } from "caver-js";
import FactoryABI from "@/klaytn/build/contracts/Factory.json";
import { Fund } from "./entities/funds.entity";
import { Repository, DataSource } from "typeorm";
import { InjectRepository, InjectDataSource } from "@nestjs/typeorm";
import { User } from "routes/users/entities/users.entity";
import { ContractEvent } from "@/entities";
import { Reward } from "routes/rewards/entities/reward.entity";
import { Project } from "routes/projects/entities/projects.entity";
import { DeleteTransactionDto } from "./dto/delete-transaction.dto";

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
      .on("data", async (data: ContractEvent<CreateTransactionDto>) => {
        this.createOne(data.returnValues);
      })
      .on("error", console.error);

    contract.events
      .FundCancelEvent()
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("data", async (data: ContractEvent<DeleteTransactionDto>) => {
        this.invalidateOne(data.returnValues);
      })
      .on("error", console.error);
  }

  async createOne({ amount, rewardId, userAddress, fundHashId }: CreateTransactionDto) {
    return this.datasource.manager.transaction(async (_manager) => {
      await this.rewardsRepository
        .createQueryBuilder("reward")
        .update()
        .set({ stock: () => `stock - ${amount}` })
        .where("reward.id = :id", { id: rewardId })
        .execute();

      const reward = await this.rewardsRepository.findOne({
        select: { price: true, projectId: true },
        where: { id: rewardId },
      });

      await this.projectsRepository
        .createQueryBuilder("project")
        .update()
        .set({ fundNow: () => `fundNow + ${reward.price * amount}` })
        .where("project.id = :id", { id: reward.projectId })
        .execute();

      const user = await this.usersRepository.findOne({
        select: { id: true },
        where: { address: userAddress },
      });

      return await this.fundsRepository.save({
        amount,
        hashId: fundHashId,
        reward: { id: rewardId },
        user: { id: user.id },
      });
    });
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number) {
    return `This action updates a #${id} transaction`;
  }

  async invalidateOne({ amount, rewardId, fundHashId }: DeleteTransactionDto) {
    return this.datasource.manager.transaction(async (_manager) => {
      await this.rewardsRepository
        .createQueryBuilder("reward")
        .update()
        .set({ stock: () => `stock + ${amount}` })
        .where("reward.id = :id", { id: rewardId })
        .execute();

      const reward = await this.rewardsRepository.findOne({
        select: { price: true, projectId: true },
        where: { id: rewardId },
      });

      await this.projectsRepository
        .createQueryBuilder("project")
        .update()
        .set({ fundNow: () => `fundNow - ${reward.price * amount}` })
        .where("project.id = :id", { id: reward.projectId })
        .execute();

      return await this.fundsRepository.update({ hashId: fundHashId }, { valid: false });
    });
  }

  async invalidateAll(projectId: number) {
    return this.datasource.manager.transaction(async (_manager) => {
      const subQuery = await this.projectsRepository
        .createQueryBuilder("project")
        .subQuery()
        .select("reward.id")
        .leftJoinAndSelect("project.rewards", "reward")
        .where("project.id := id", { id: projectId })
        .getQuery();

      await this.fundsRepository
        .createQueryBuilder("fund")
        .leftJoin(subQuery, "reward", "reward.id := fund.rewardId")
        .update()
        .set({ valid: false })
        .execute();
    });
  }
}
