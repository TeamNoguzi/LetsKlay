import { FindRewardResponseDto } from "@/dto";
import RewardCard from "stories/Cards/RewardCard";
import { callTransaction, sendTransaction } from "utils/transactions";
import FactoryAbi from "@/klaytn/build/contracts/Factory.json";
import ProjectAbi from "@/klaytn/build/contracts/Project.json";
import { AbiItem } from "caver-js";
import * as S from "./styled";

interface ProjectRewardsProps {
  projectId: number;
  rewards: FindRewardResponseDto[];
}

const ProjectRewards = ({ rewards, projectId }: ProjectRewardsProps) => {
  const handleClickReward = async (reward: FindRewardResponseDto) => {
    const address = await callTransaction(
      {
        abi: FactoryAbi.abi as AbiItem[],
        address: process.env.FACTORY_ADDR ?? "",
        method: "getProjectAddress",
      },
      projectId
    );

    await sendTransaction(
      { abi: ProjectAbi.abi as AbiItem[], address, method: "addFund", value: reward.price },
      reward.id,
      1
    );
  };
  return (
    <S.RewardsContainer>
      <S.Slider>
        {rewards.map((reward) => (
          <RewardCard reward={reward} onClick={() => handleClickReward(reward)} />
        ))}
      </S.Slider>
    </S.RewardsContainer>
  );
};

export default ProjectRewards;
