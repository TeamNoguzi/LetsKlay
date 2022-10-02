import { Offcanvas } from "react-bootstrap";
import Link from "next/link";
import SearchBar from "stories/SearchBar";
import Logo from "stories/Logo";
import * as S from "./styled";

interface SideBarProps {
  show: boolean;
  onHide: () => void;
}

function SideBar({ show, onHide }: SideBarProps) {
  return (
    <S.Offcanvas show={show} onHide={onHide}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <Logo />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <SearchBar height={45} />
        <S.NavContainer className="mt-4">
          <S.NavItem>
            <Link href="/">Home</Link>
          </S.NavItem>
          <S.NavItem>
            <Link href="/">Items</Link>
          </S.NavItem>
          <S.NavItem>
            <Link href="/profile">Profile</Link>
          </S.NavItem>
        </S.NavContainer>
      </Offcanvas.Body>
    </S.Offcanvas>
  );
}

export default SideBar;
