import { FindRewardResponseDto } from "@/dto";
import RewardCard from "stories/Cards/RewardCard";
import * as S from "./styled";

interface ProjectRewardsProps {
  rewards: FindRewardResponseDto[];
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
