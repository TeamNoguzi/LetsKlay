import { BaseSyntheticEvent, ReactNode } from "react";
import { Dropdown } from "react-bootstrap";
import * as S from "./styled";

interface CustomDropdownProps {
  text: string;
  children: ReactNode;
  onSelect?: (eventKey: any, event: BaseSyntheticEvent) => void;
}

const CustomDropdown = ({ text, children, onSelect }: CustomDropdownProps) => {
  return (
    <S.CustomDropdown align="end" onSelect={onSelect}>
      <Dropdown.Toggle>{text}</Dropdown.Toggle>
      <Dropdown.Menu>{children}</Dropdown.Menu>
    </S.CustomDropdown>
  );
};

export default CustomDropdown;
