import { useState } from "react";
import { IconButton } from "stories/Buttons";
import { faBars, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useBreakpoint } from "styled-breakpoints/react-emotion";
import { down } from "styled-breakpoints";
import SearchBar from "stories/SearchBar";
import SideBar from "./SideBar";
import * as S from "./styled";

function Navigation() {
  const mobile = useBreakpoint(down("md"));
  const [showMobile, setShowMobile] = useState<boolean>(false);

  const handleOpenMobile = () => setShowMobile(true);
  const handleCloseMobile = () => setShowMobile(false);

  return (
    <>
      <SideBar show={showMobile} onHide={handleCloseMobile} />
      <S.Navigation>
        {mobile && <IconButton icon={faBars} width={48} onClick={handleOpenMobile} />}
        {!mobile && (
          <>
            <S.NavItem>
              <S.NavLink href="#">Home</S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink href="#">Items</S.NavLink>
            </S.NavItem>
          </>
        )}
        <S.Placeholder />
        {!mobile && (
          <S.SearchBarWrapper>
            <SearchBar height={50} />
          </S.SearchBarWrapper>
        )}
        <IconButton icon={faPlus} />
        <IconButton icon={faUser} />
      </S.Navigation>
    </>
  );
}

export default Navigation;
