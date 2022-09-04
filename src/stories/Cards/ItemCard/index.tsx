import React from "react";
import * as S from "./styled";

interface ItemCardProps {
  bigSize?: boolean;
  title: string;
  body: string;
  height?: number;
  onClick?: (e: React.MouseEvent) => unknown;
}

function ItemCard({ bigSize = false, title, body, height = 300, onClick }: ItemCardProps) {
  return (
    <S.ItemCard bigSize={bigSize ?? false} height={height} onClick={onClick}>
      <S.ItemCardImage
        bigSize={bigSize ?? false}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png"
      />
      <S.ItemCardBody>
        <S.ItemCardTitle>{title}</S.ItemCardTitle>
        <S.ItemCardText>{body}</S.ItemCardText>
      </S.ItemCardBody>
    </S.ItemCard>
  );
}

export default ItemCard;
