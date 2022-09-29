import { AbiItem } from "caver-js";
import { callTransaction, sendTransaction } from "transactions/base";
import FactoryAbi from "@/klaytn/build/contracts/Factory.json";
import ProjectAbi from "@/klaytn/build/contracts/Project.json";

interface CancelFundParams {
  projectId: number;
  fundHashId: string;
}

interface FundRewardParams {
  projectId: number;
  rewardId: number;
  rewardPrice: number;
}

const cancelFund = async ({ projectId, fundHashId }: CancelFundParams) => {
  const address = await callTransaction(
    {
      abi: FactoryAbi.abi as AbiItem[],
      address: process.env.FACTORY_ADDR ?? "",
      method: "getProjectAddress",
    },
    projectId
  );

  await sendTransaction(
    { abi: ProjectAbi.abi as AbiItem[], address, method: "cancelFund" },
    fundHashId
  );
};

const fundReward = async ({ projectId, rewardId, rewardPrice }: FundRewardParams) => {
  const address = await callTransaction(
    {
      abi: FactoryAbi.abi as AbiItem[],
      address: process.env.FACTORY_ADDR ?? "",
      method: "getProjectAddress",
    },
    projectId
  );
  await sendTransaction(
    { abi: ProjectAbi.abi as AbiItem[], address, method: "addFund", value: rewardPrice },
    rewardId,
    1
  );
};

export { cancelFund, fundReward };
