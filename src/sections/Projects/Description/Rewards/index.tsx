import { Reward } from "@/entities/rewards";
import RewardCard from "stories/Cards/RewardCard";
import * as S from "./styled";

interface ProjectRewardsProps {
  rewards: Reward[];
}

const ProjectRewards = ({ rewards }: ProjectRewardsProps) => {
  return (
    <S.RewardsContainer>
      <S.Slider>
        {rewards.map((reward) => (
          <RewardCard reward={reward} />
        ))}
      </S.Slider>
    </S.RewardsContainer>
  );
};

export default ProjectRewards;
