import Link from "next/link";
import * as S from "./styled";

interface LogoProps {
  center?: boolean;
  fontSize?: number;
}

const Logo = ({ center, fontSize }: LogoProps) => {
  return (
    <S.LogoText center={center} fontSize={fontSize}>
      <Link href="/">LetsKlay</Link>
    </S.LogoText>
  );
};

export default Logo;
