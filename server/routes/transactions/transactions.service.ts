import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import Caver, { AbiItem } from "caver-js";
import FactoryABI from "@/klaytn/build/contracts/Factory.json";
import { Transaction } from "./entities/transaction.entity";
import { Repository, DataSource } from "typeorm";
import { InjectRepository, InjectDataSource } from "@nestjs/typeorm";
import { User } from "routes/users/entities/users.entity";
import { ContractEvent } from "@/entities";
import { Reward } from "routes/rewards/entities/reward.entity";
import { Project } from "routes/projects/entities/projects.entity";

@Injectable()
export class TransactionsService implements OnModuleInit {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
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
        this.create(data.returnValues);
      })
      .on("error", console.error);

    contract.events
      .FundCancelEvent()
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("data", async (data) => {
        console.log(data, "cancel");
      });
  }

  async create({ amount, rewardId, userAddress }: CreateTransactionDto) {
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

      return await this.transactionsRepository.save({
        amount,
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

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
