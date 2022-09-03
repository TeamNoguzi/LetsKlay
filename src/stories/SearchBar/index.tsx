import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import * as S from "./styled";

interface SearchBarProps {
  height?: number;
  placeholder?: string;
}

const SearchBar = ({ height = 60, placeholder = "Search" }: SearchBarProps) => {
  return (
    <S.StyledInputGroup height={height}>
      <S.InputGroupText width={height}>
        <FontAwesomeIcon icon={faSearch} width={height} />
      </S.InputGroupText>
      <S.SearchInput placeholder={placeholder} />
    </S.StyledInputGroup>
  );
};

export default SearchBar;
