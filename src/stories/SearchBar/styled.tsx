import styled from "@emotion/styled";
import { Form, InputGroup } from "react-bootstrap";

interface StyledInputGroupProps {
  height: number;
}

interface InputGroupTextProps {
  width: number;
}

const StyledInputGroup = styled(InputGroup)<StyledInputGroupProps>`
  width: 100%;
  height: ${(props) => props.height}px;
`;

const InputGroupText = styled(InputGroup.Text)<InputGroupTextProps>`
  width: ${(props) => props.width}px;

  background-color: white;
  color: ${(props) => props.theme.colors.secondary};
  font-weight: 100;
  cursor: pointer;
  transition: 0.1s linear;

  &:hover {
    background-color: ${(props) => props.theme.colors.primaryLight};
  }
`;

const SearchInput = styled(Form.Control)`
  && {
    box-shadow: none;

    &:focus {
      border-color: ${(props) => props.theme.colors.primary};
    }
  }
`;

export { StyledInputGroup, SearchInput, InputGroupText };
