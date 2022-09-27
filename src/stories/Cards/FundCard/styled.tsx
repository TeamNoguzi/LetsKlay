import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Card } from "react-bootstrap";
import { ellipsis, flexBox } from "styles/mixins";

interface FundImageWrapperProps {
  large: boolean;
}

interface FundCardTextProps {
  large: boolean;
}

interface FundCardBodyProps {
  large: boolean;
}

interface FundCardProps {
  large: boolean;
  width?: number;
}

const FundCard = styled(Card)<FundCardProps>`
  ${(props) =>
    props.large
      ? css`
          width: 270px;
        `
      : css`
          ${flexBox({ direction: "row" })};
          width: 100%;
        `}
  border: none;
  cursor: pointer;
`;

const FundImageWrapper = styled.div<FundImageWrapperProps>`
  position: relative;
  ${(props) =>
    props.large
      ? css`
          height: 180px;
        `
      : css`
          height: 130px;
          width: 150px;
        `}

  & > img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
`;

const FundCardBody = styled(Card.Body)<FundCardBodyProps>`
  padding: 10px 0 0 0;
`;

const FundCardTitle = styled(Card.Title)``;

const FundCardSubtitle = styled(Card.Subtitle)`
  margin-bottom: 15px;

  font-size: 11pt;
  color: ${(props) => props.theme.colors.blackLight}b0;
`;

const FundCardText = styled(Card.Text)<FundCardTextProps>`
  ${ellipsis({ line: 5, lineHeight: 16 })};
  ${(props) =>
    props.large ||
    css`
      display: none;
    `};
`;

export { FundCard, FundImageWrapper, FundCardBody, FundCardTitle, FundCardSubtitle, FundCardText };
