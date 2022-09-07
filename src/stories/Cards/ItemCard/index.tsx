import React from "react";
import Image from "next/image";
import * as S from "./styled";

interface ItemCardProps {
  bigSize?: boolean;
  title: string;
  body: string;
  imageHeight?: number;
  onClick?: (e: React.MouseEvent) => unknown;
  className?: string;
}

function ItemCard({
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
        <Image src="/Landscape-Color.jpg" layout="fill" objectFit="cover" />
      </S.ItemCardImageWrapper>
      <S.ItemCardBody bigSize={bigSize}>
        <S.ItemCardTitle bigSize={bigSize}>{title}</S.ItemCardTitle>
        <S.ItemCardText>{body}</S.ItemCardText>
      </S.ItemCardBody>
    </S.ItemCard>
  );
}

export default ItemCard;
