import styled from "@emotion/styled";
import { Card } from "react-bootstrap";
import { ellipsis } from "styles/mixins";

interface FundCardProps {
  width?: number;
}

const FundCard = styled(Card)<FundCardProps>`
  width: ${(props) => props.width ?? 270}px;
  border: none;
  cursor: pointer;
`;

const FundImageWrapper = styled.div`
  position: relative;
  height: 180px;
`;

const FundCardBody = styled(Card.Body)`
  padding: 10px 0 0 0;
`;

const FundCardTitle = styled(Card.Title)``;

const FundCardSubtitle = styled(Card.Subtitle)`
  margin-bottom: 15px;

  font-size: 11pt;
  color: ${(props) => props.theme.colors.blackLight}b0;
`;

const FundCardText = styled(Card.Text)`
  ${ellipsis({ line: 5, lineHeight: 16 })};
`;

export { FundCard, FundImageWrapper, FundCardBody, FundCardTitle, FundCardSubtitle, FundCardText };
