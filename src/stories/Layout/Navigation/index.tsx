import { useState } from "react";
import { IconButton } from "stories/Buttons/IconButton";
import { faBars, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { useBreakpoint } from "styled-breakpoints/react-emotion";
import { down } from "styled-breakpoints";
import Link from "next/link";
import { useRouter } from "next/router";
import SearchBar from "stories/SearchBar";
import { createProject } from "api";
import { useAuthGuard } from "hooks";
import SideBar from "../SideBar";
import * as S from "./styled";

interface NavigationProps {
  footer?: boolean;
}

function Navigation({ footer }: NavigationProps) {
  const router = useRouter();
  const mobile = useBreakpoint(down("md"));
  const [showMobile, setShowMobile] = useState<boolean>(false);
  const createProjectGuarded = useAuthGuard(createProject);

  const handleOpenMobile = () => setShowMobile(true);
  const handleCloseMobile = () => setShowMobile(false);

  const handleClickPlus = async () => {
    const result = await createProjectGuarded(undefined);
    if (result) router.push(`/projects/${result.id}/modify`);
  };
  const handleClickProfile = () => router.push("/profile");

  return (
    <>
      <SideBar show={showMobile} onHide={handleCloseMobile} />
      <S.Navigation>
        {mobile && <IconButton icon={faBars} width={48} onClick={handleOpenMobile} />}
        {!mobile && (
          <>
            <S.NavItem>
              <S.NavLink>
                <Link href="/">Home</Link>
              </S.NavLink>
            </S.NavItem>
            <S.NavItem>
              <S.NavLink>
                <Link href="/">Items</Link>
              </S.NavLink>
            </S.NavItem>
          </>
        )}
        <S.Placeholder />
        {!mobile && (
          <S.SearchBarWrapper>
            <SearchBar height={50} />
          </S.SearchBarWrapper>
        )}
        {!footer && (
          <>
            <IconButton icon={faPlus} onClick={handleClickPlus} />
            <IconButton icon={faUser} onClick={handleClickProfile} />
          </>
        )}
      </S.Navigation>
    </>
  );
}

export default Navigation;
