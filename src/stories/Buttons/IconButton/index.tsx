import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as S from "./styled";

interface IconButtonProps {
  icon: IconProp;
  width?: number;
  fontSize?: number;
  onClick?: () => void;
}

const IconButton = ({ icon, width = 32, fontSize = 16, onClick }: IconButtonProps) => {
  return (
    <S.IconButtonContainer width={width} onClick={onClick}>
      <FontAwesomeIcon icon={icon} fontSize={fontSize} />
    </S.IconButtonContainer>
  );
};

export { IconButton };
