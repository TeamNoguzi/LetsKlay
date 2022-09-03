/* eslint-disable jsx-a11y/anchor-is-valid */
import { Offcanvas } from "react-bootstrap";
import * as S from "./styled";

interface SideBarProps {
  show: boolean;
  onHide: () => void;
}

function SideBar({ show, onHide }: SideBarProps) {
  return (
    <S.Offcanvas show={show} onHide={onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Menu</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <S.NavContainer>
          <S.NavItem>
            <a href="#">hi</a>
          </S.NavItem>
          <S.NavItem>
            <a href="#">hi</a>
          </S.NavItem>
        </S.NavContainer>
      </Offcanvas.Body>
    </S.Offcanvas>
  );
}

export default SideBar;
