import styled from "@emotion/styled";
import { Card } from "react-bootstrap";
import { flexBox, ellipsis } from "styles/mixins";
import { css } from "@emotion/react";

interface ItemCardProps {
  bigSize: boolean;
}

interface ItemCardBodyProps {
  bigSize: boolean;
}

interface ItemCardImageWrapperProps {
  bigSize: boolean;
  height: number;
}

interface ItemCardTitleProps {
  bigSize: boolean;
}

const ItemCard = styled(Card)<ItemCardProps>`
  ${(props) => flexBox({ direction: props.bigSize ? "column" : "row", middle: false })};

  width: 100%;
  cursor: pointer;
  && {
    border: none;
  }
`;

const ItemCardBody = styled(Card.Body)<ItemCardBodyProps>`
  height: 100%;
  width: 100%;

  ${(props) =>
    props.bigSize
      ? css`
          padding: 10px 0;
        `
      : css`
          padding: 0 10px;
        `}
`;

const ItemCardImageWrapper = styled.div<ItemCardImageWrapperProps>`
  position: relative;
  height: ${(props) => props.height}px;

  & > img {
    object-fit: cover;
    max-height: 100%;
    width: 100%;
  }

  ${(props) =>
    props.bigSize
      ? `
      max-height:70%;
      width:100%;
    `
      : `
    max-height:100%;
    width:200px;
    `}
`;

const ItemCardTitle = styled(Card.Title)<ItemCardTitleProps>`
  font-variation-settings: "wght" 500;
  font-size: ${(props) => (props.bigSize ? "18pt" : "16pt")};
`;

const ItemCardText = styled(Card.Text)`
  ${ellipsis({ line: 2, lineHeight: 16 })}
`;

export { ItemCard, ItemCardImageWrapper, ItemCardTitle, ItemCardBody, ItemCardText };
