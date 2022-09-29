import styled from "@emotion/styled";
import { Container } from "react-bootstrap";
import { flexBox } from "styles/mixins";

const FooterContainer = styled(Container)`
  ${flexBox({ direction: "row", middle: true })};
  gap: 10px 0;
  flex-wrap: wrap;

  min-height: 80px;
  padding: 10px 15px;
`;

const LogoWrapper = styled.div`
  ${flexBox({ direction: "row", middle: false })};
  gap: 0 30px;

  min-width: 300px;
  margin-right: auto;
`;

const VerticalLine = styled.span`
  display: inline-block;
  border-right: 1px solid #3c3c3c20;
`;

const Copyright = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 11pt;
  color: ${(props) => props.theme.colors.blackLight};
`;

const IconGroup = styled.div`
  ${flexBox({ direction: "row", middle: true })}
  gap: 0 20px;
`;

export { FooterContainer, LogoWrapper, VerticalLine, Copyright, IconGroup };
