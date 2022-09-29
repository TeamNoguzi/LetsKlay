import { FindRewardResponseDto } from "@/dto";
import RewardCard from "stories/Cards/RewardCard";
import { useAuthGuard, useTransaction } from "hooks";
import { verifySession } from "api";
import { useQueryClient } from "@tanstack/react-query";
import { fundReward } from "transactions";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import * as S from "./styled";

interface ProjectRewardsProps {
  projectId: number;
  rewards: FindRewardResponseDto[];
}

const ProjectRewards = ({ rewards, projectId }: ProjectRewardsProps) => {
  const verifySessionGuarded = useAuthGuard(verifySession);
  const fundRewardTransaction = useTransaction(fundReward);
  const queryClient = useQueryClient();

  const handleClickReward = async (reward: FindRewardResponseDto) => {
    await verifySessionGuarded(undefined);
    await fundRewardTransaction(
      { projectId, rewardId: reward.id, rewardPrice: reward.price },
      {
        title: "Fund successed!",
        body: "The fund has successfully submitted to blockchain.",
        icon: faCheck,
      }
    );
    queryClient.invalidateQueries(["projects", { id: +projectId }]);
  };

  return (
    <S.RewardsContainer>
      <S.Slider>
        {rewards.map((reward) => (
          <RewardCard key={reward.id} reward={reward} onClick={() => handleClickReward(reward)} />
        ))}
      </S.Slider>
    </S.RewardsContainer>
  );
};

export default ProjectRewards;
