import styled from "@emotion/styled";
import { Button as BsButton } from "react-bootstrap";

const PrimaryButton = styled(BsButton)`
  &&& {
    background-color: ${(props) => props.theme.colors.primaryLight};
    border-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.secondary};

    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
      color: white;
    }
  }
`;

const OutlineButton = styled(BsButton)`
  &&& {
    background-color: white;
    border-color: ${(props) => props.theme.colors.secondary};
    color: ${(props) => props.theme.colors.secondary};

    &:hover {
      background-color: ${(props) => props.theme.colors.secondaryLight};
      color: white;
    }
  }
`;

export { PrimaryButton, OutlineButton };
