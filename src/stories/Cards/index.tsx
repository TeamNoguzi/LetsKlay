import * as S from "./styled";

interface CardProps {
  bigSize?: boolean;
  title: string;
  body: string;
  height?: number;
}

function Card({ bigSize = false, title, body, height = 300 }: CardProps) {
  return (
    <S.Card bigSize={bigSize ?? false} height={height}>
      <S.CardImage
        bigSize={bigSize ?? false}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
      />
      <S.CardBody>
        <S.CardTitle>{title}</S.CardTitle>
        <S.CardText>{body}</S.CardText>
      </S.CardBody>
    </S.Card>
  );
}

export default Card;
