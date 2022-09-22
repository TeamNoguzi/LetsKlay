/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, OnModuleInit } from "@nestjs/common";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import Caver, { AbiItem } from "caver-js";
import FactoryABI from "@/klaytn/build/contracts/Factory.json";

@Injectable()
export class TransactionService implements OnModuleInit {
  onModuleInit() {
    const caver = new Caver("wss://api.baobab.klaytn.net:8652/");
    const contract = new caver.contract(FactoryABI.abi as AbiItem[], process.env.FACTORY_ADDR);

    contract.events
      .FundResolveEvent()
      .on("connected", function (subscriptionId) {
        console.log(subscriptionId);
      })
      .on("data", async (data) => {
        console.log(data, "resolve");
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

  create(createTransactionDto: CreateTransactionDto) {
    return "This action adds a new transaction";
  }

  findAll() {
    return `This action returns all transaction`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionDto: UpdateTransactionDto) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
