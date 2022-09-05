import { faFacebookSquare, faInstagram, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { IconButton } from "stories/Buttons/IconButton";
import Logo from "stories/Logo";
import Navigation from "../Navigation";
import * as S from "./styled";

const Footer = () => {
  return (
    <footer className="mt-5">
      <Navigation footer />
      <S.FooterContainer>
        <S.LogoWrapper>
          <Logo fontSize={20} />
          <S.VerticalLine />
          <S.Copyright>© Team Noguzi. All rights reserved</S.Copyright>
        </S.LogoWrapper>
        <S.IconGroup>
          <IconButton icon={faFacebookSquare} width={36} fontSize={24} />
          <IconButton icon={faInstagram} width={36} fontSize={24} />
          <IconButton icon={faTwitter} width={36} fontSize={24} />
        </S.IconGroup>
      </S.FooterContainer>
    </footer>
  );
};

export default Footer;
