import { AbiItem } from "caver-js";
import { callTransaction, sendTransaction } from "transactions/base";
import FactoryAbi from "@/klaytn/build/contracts/Factory.json";
import ProjectAbi from "@/klaytn/build/contracts/Project.json";
import { FindRewardResponseDto } from "@/dto";

interface CreateProjectParams {
  rewards: FindRewardResponseDto[];
  projectId: number;
  fundGoal: number;
}

const cancelProject = async (projectId: number) => {
  const address = await callTransaction(
    {
      abi: FactoryAbi.abi as AbiItem[],
      address: process.env.FACTORY_ADDR ?? "",
      method: "getProjectAddress",
    },
    projectId
  );

  await sendTransaction({ abi: ProjectAbi.abi as AbiItem[], address, method: "cancelProject" });
};

const createProject = async ({ rewards, projectId, fundGoal }: CreateProjectParams) => {
  await sendTransaction(
    {
      abi: FactoryAbi.abi as AbiItem[],
      address: process.env.FACTORY_ADDR ?? "",
      method: "createProject",
    },
    rewards.map((reward) => reward.id),
    rewards.map((reward) => reward.price),
    rewards.map((reward) => reward.maxStock),
    fundGoal,
    +projectId
  );
};

export { cancelProject, createProject };
