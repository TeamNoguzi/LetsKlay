import { FindRewardResponseDto } from "@/dto";
import RewardCard from "stories/Cards/RewardCard";
import { callTransaction, sendTransaction } from "utils/transactions";
import FactoryAbi from "@/klaytn/build/contracts/Factory.json";
import ProjectAbi from "@/klaytn/build/contracts/Project.json";
import { AbiItem } from "caver-js";
import { useAuthGuard } from "hooks";
import { verifySession } from "api";
import { useQueryClient } from "@tanstack/react-query";
import * as S from "./styled";

interface ProjectRewardsProps {
  projectId: number;
  rewards: FindRewardResponseDto[];
}

const ProjectRewards = ({ rewards, projectId }: ProjectRewardsProps) => {
  const verifySessionGuarded = useAuthGuard(verifySession);
  const queryClient = useQueryClient();

  const handleClickReward = async (reward: FindRewardResponseDto) => {
    await verifySessionGuarded(undefined);
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
    queryClient.invalidateQueries(["projects", { id: +projectId }]);
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
