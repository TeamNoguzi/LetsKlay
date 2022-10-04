import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import router from "next/router";
import React, { useState } from "react";
import * as S from "./styled";

interface SearchBarProps {
  height?: number;
  placeholder?: string;
}

const SearchBar = ({ height = 60, placeholder = "Search" }: SearchBarProps) => {
  const [searchKey, setSearchKey] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchKey(e.target.value);
  const handleClickSearch = () => {
    router.push(`/projects/search?search=${searchKey}`);
  };

  return (
    <S.StyledInputGroup height={height}>
      <S.InputGroupText width={height} onClick={handleClickSearch}>
        <FontAwesomeIcon icon={faSearch} width={height} />
      </S.InputGroupText>
      <S.SearchInput placeholder={placeholder} onChange={handleInputChange} />
    </S.StyledInputGroup>
  );
};

export default SearchBar;
