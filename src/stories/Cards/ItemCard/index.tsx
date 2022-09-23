import React from "react";
import * as S from "./styled";

interface ItemCardProps {
  bigSize?: boolean;
  title: string;
  body: string;
  imageHeight?: number;
  onClick?: (e: React.MouseEvent) => unknown;
  className?: string;
  imgSrc: string;
}

function ItemCard({
  imgSrc,
  bigSize = false,
  title,
  body,
  imageHeight = 300,
  className = "",
  onClick,
}: ItemCardProps) {
  return (
    <S.ItemCard className={className} bigSize={bigSize} onClick={onClick}>
      <S.ItemCardImageWrapper bigSize={bigSize} height={imageHeight}>
        <img src={imgSrc} alt="item thumbnail" loading="lazy" />
      </S.ItemCardImageWrapper>
      <S.ItemCardBody bigSize={bigSize}>
        <S.ItemCardTitle bigSize={bigSize}>{title}</S.ItemCardTitle>
        <S.ItemCardText>{body}</S.ItemCardText>
      </S.ItemCardBody>
    </S.ItemCard>
  );
}

export default ItemCard;
