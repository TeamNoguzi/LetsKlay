import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

const Background = styled.div`
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;

  background-color: ${(props) => props.theme.colors.primaryLight}20;
`;

const RegisterFormWrapper = styled.div`
  ${flexBox({ direction: "column", middle: true })}
  width: 400px;

  margin-top: 40px;
  padding: 20px 30px;
  border: 1px solid ${(props) => props.theme.colors.blackLight}50;
  background-color: white;
`;

export { Background, RegisterFormWrapper };
