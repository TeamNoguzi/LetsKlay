import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";
import { down } from "styled-breakpoints";

const SearchWrapper = styled.div`
  ${flexBox({ direction: "column" })};
  align-items: center;

  width: 100%;
`;

const SearchResultContainer = styled.div`
  ${flexBox({ direction: "row" })};
  justify-content: center;
  flex-wrap: wrap;

  gap: 50px 45px;

  ${down("md")} {
    gap: 20px 45px;
  }
`;

const SearchForm = styled.form`
  ${flexBox({ direction: "row", middle: true })};
  width: 600px;
  max-width: 90%;
  height: 60px;

  margin-bottom: 45px;
  border-bottom: 1px solid #3c3c3ca0;

  line-height: 60px;
  font-size: 20pt;

  & > input {
    width: 100%;
    padding: 0;
    outline: none;
    border: none;
  }
`;

const Divider = styled.span`
  width: 100%;
  border-bottom: 1px solid #3c3c3c20;
`;

export { SearchWrapper, SearchResultContainer, SearchForm, Divider };
