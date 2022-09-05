import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";
import { Nav } from "react-bootstrap";
import { down } from "styled-breakpoints";

const Navigation = styled(Nav)`
  ${flexBox({ direction: "row", middle: true })}
  justify-content:flex-start;
  gap: 0 10px;

  width: 100%;
  height: 60px;
  padding: 0 20px;

  border-top: 1px solid ${(props) => props.theme.colors.black}20;
  border-bottom: 1px solid ${(props) => props.theme.colors.blackLight}20;

  ${down("md")} {
    padding: 0;
  }
`;

const NavItem = styled(Nav.Item)`
  height: 100%;
`;

const NavLink = styled.span`
  & > a {
    ${flexBox({ direction: "column", middle: true })}
    width: 100px;
    height: 100%;
    text-decoration: none;
    color: ${(props) => props.theme.colors.black};
    font-weight: 500;

    &:hover {
      background-color: ${(props) => props.theme.colors.primaryLight};
    }
  }
`;

const Placeholder = styled.div`
  margin: auto;
`;

const SearchBarWrapper = styled.div`
  width: 250px;
  margin-right: 20px;
`;

export { Navigation, NavItem, NavLink, Placeholder, SearchBarWrapper };
