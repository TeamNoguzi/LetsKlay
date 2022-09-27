import React from "react";
import * as S from "./styled";

interface ItemCardProps {
  large?: boolean;
  title: string;
  body: string;
  imageHeight?: number;
  onClick?: (e: React.MouseEvent) => unknown;
  className?: string;
  imgSrc: string;
}

function ItemCard({
  imgSrc,
  large = false,
  title,
  body,
  imageHeight = 300,
  className = "",
  onClick,
}: ItemCardProps) {
  return (
    <S.ItemCard className={className} large={large} onClick={onClick}>
      <S.ItemCardImageWrapper large={large} height={imageHeight}>
        <img src={imgSrc} alt="item thumbnail" loading="lazy" />
      </S.ItemCardImageWrapper>
      <S.ItemCardBody large={large}>
        <S.ItemCardTitle large={large}>{title}</S.ItemCardTitle>
        <S.ItemCardText>{body}</S.ItemCardText>
      </S.ItemCardBody>
    </S.ItemCard>
  );
}

export default ItemCard;
