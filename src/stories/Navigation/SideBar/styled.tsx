import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";
import { Offcanvas as BsOffcanvas } from "react-bootstrap";

const Offcanvas = styled(BsOffcanvas)`
  max-width: 75%;
`;

const NavContainer = styled.div`
  ${flexBox({ direction: "column", middle: true })}
  align-items:flex-end;
  gap: 15px 0;

  width: 100%;
`;

const NavItem = styled.div`
  width: 100%;
  height: 50px;

  font-size: 16pt;
  font-weight: 600;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryLight};
  }
  & > a {
    ${flexBox({ direction: "column", middle: true })}
    align-items:flex-end;

    width: 100%;
    height: 100%;
    padding-right: 20px;

    color: ${(props) => props.theme.colors.black};
    text-decoration: none;
  }
`;

export { Offcanvas, NavContainer, NavItem };
