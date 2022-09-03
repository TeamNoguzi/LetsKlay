import styled from "@emotion/styled";
import { Dropdown } from "react-bootstrap";

const DropdownToggle = styled(Dropdown.Toggle)`
  &&&& {
    background-color: ${(props) => props.theme.colors.secondary};
    border-color: ${(props) => props.theme.colors.secondaryBold};

    &:hover,
    &:active {
      background-color: ${(props) => props.theme.colors.secondaryBold};
    }

    &:focus {
      box-shadow: none;
    }
  }
`;

export { DropdownToggle };
