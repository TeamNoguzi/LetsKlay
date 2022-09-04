import styled from "@emotion/styled";
import { Card } from "react-bootstrap";
import { flexBox, ellipsis } from "styles/mixins";

interface ItemCardProps {
  bigSize: boolean;
  height: number;
}

interface ItemCardImageProps {
  bigSize: boolean;
}

const ItemCard = styled(Card)<ItemCardProps>`
  ${(props) => flexBox({ direction: props.bigSize ? "column" : "row", middle: false })}

  width: 100%;
  height: ${(props) => props.height}px;
  && {
    border: none;
  }
`;

const ItemCardBody = styled(Card.Body)`
  height: 100%;
  width: 100%;
  padding: 10px 15px;
`;

const ItemCardImage = styled(Card.Img)<ItemCardImageProps>`
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
  object-fit: cover;
`;

const ItemCardTitle = styled(Card.Title)`
  font-variation-settings: "wght" 500;
  font-size: 18pt;
`;

const ItemCardText = styled(Card.Text)`
  ${ellipsis({ line: 2, lineHeight: 18 })}
`;

export { ItemCard, ItemCardImage, ItemCardTitle, ItemCardBody, ItemCardText };
