import styled from "@emotion/styled";
import { Card as BsCard } from "react-bootstrap";
import { flexBox, ellipsis } from "styles/mixins";

interface CardProps {
  bigSize: boolean;
  height: number;
}

interface CardImageProps {
  bigSize: boolean;
}

const Card = styled(BsCard)<CardProps>`
  ${(props) => flexBox({ direction: props.bigSize ? "column" : "row", middle: false })}

  width: 100%;
  height: ${(props) => props.height}px;
  && {
    border: none;
  }
`;

const CardBody = styled(BsCard.Body)`
  height: 100%;
  width: 100%;
  padding: 10px 15px;
`;

const CardImage = styled(BsCard.Img)<CardImageProps>`
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

const CardTitle = styled(BsCard.Title)`
  font-variation-settings: "wght" 500;
  font-size: 18pt;

  color: ${(props) => props.theme.colors.primary};
`;

const CardText = styled(BsCard.Text)`
  ${ellipsis({ line: 2, lineHeight: 18 })}
`;

export { Card, CardImage, CardTitle, CardBody, CardText };
