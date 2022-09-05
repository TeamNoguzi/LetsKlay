import * as S from "./styled";

interface LogoProps {
  center: boolean;
}

const Logo = ({ center }: LogoProps) => {
  return <S.LogoText center={center}>LetsKlay</S.LogoText>;
};

export default Logo;
