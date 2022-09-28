import styled from "@emotion/styled";
import { Dropdown } from "react-bootstrap";

const CustomDropdown = styled(Dropdown)`
  .dropdown-toggle {
    border-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.secondary};
    background-color: ${(props) => props.theme.colors.primaryLight};

    &:hover {
      color: white;
      background-color: ${(props) => props.theme.colors.primaryBold};
    }
  }
  .dropdown-menu {
    border-radius: 0;
  }
  .dropdown-item {
    &:hover {
      background-color: ${(props) => props.theme.colors.secondaryLight}50;
    }
  }
`;

export { CustomDropdown };
