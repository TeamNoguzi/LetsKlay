import { FindRewardResponseDto } from "@/dto";
import numeral from "numeral";
import moment from "moment";
import * as S from "./styled";

interface RewardCardProps {
  reward: FindRewardResponseDto;
  onClick?: () => void;
}

const RewardCard = ({ reward, onClick }: RewardCardProps) => {
  return (
    <S.RewardCard onClick={onClick}>
      <S.RewardCardMask>select this reward</S.RewardCardMask>
      <h1>{numeral(reward.price).format("0,0")} KLAY</h1>
      <h2>{reward.title}</h2>
      <p>{reward.description}</p>
      <S.Label>Includes:</S.Label>
      <ol type="A">
        {reward.items &&
          reward.items.map((item) => (
            <li key={item.id}>
              {item.name} x {item.quantity}
            </li>
          ))}
      </ol>
      <S.Label>Estimated Delievery</S.Label>
      <p>
        {moment(reward.deliveryStart).format("YYYY/MM/DD")}~
        {moment(reward.deliveryEnd).format("YYYY/MM/DD")}
      </p>
      <S.Label>In Stock</S.Label>
      <p>
        {reward.stock} left out of {reward.maxStock}
      </p>
    </S.RewardCard>
  );
};

export default RewardCard;
