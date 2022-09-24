import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

const MyInfoContainer = styled.div`
  ${flexBox({ direction: "column", middle: true })};

  width: 100%;
  margin-bottom: 20px;
`;

const MyInfoImageWrapper = styled.div`
  position: relative;
  width: 250px;
  height: 250px;
  overflow: hidden;

  margin-bottom: 20px;
  border: 1px solid #3c3c3c20;
  border-radius: 50%;

  cursor: pointer;
  color: #3c3c3ca0;
  background-color: #3c3c3c20;

  & > img {
    object-fit: cover;
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }
  & > div {
    position: absolute;
    top: 50%;
    left: 50%;

    transform: translate(-50%, -50%);
  }

  &:after {
    ${flexBox({ direction: "column", middle: true })};
    content: "Change Image";
    position: absolute;
    top: 50%;
    left: 50%;

    width: 100%;
    height: 100%;

    background-color: #3c3c3ca0;
    transform: translate(-50%, -50%);
    color: white;
    font-weight: bolder;
    transition: 0.12s linear;
    opacity: 0;
  }

  &:hover {
    &:after {
      opacity: 1;
    }
  }
`;

const MyInfoDescription = styled.div`
  padding: 0 15px;

  & > h3 {
    margin-bottom: 25px;

    font-size: 18pt;
    font-weight: bolder;
    text-align: center;
  }

  & > span {
    text-transform: uppercase;
    font-size: 11pt;
    color: ${(props) => props.theme.colors.blackLight};
  }
  & > p {
    color: ${(props) => props.theme.colors.black};
    margin-bottom: 15px;

    word-break: break-all;
  }
`;

export { MyInfoContainer, MyInfoImageWrapper, MyInfoDescription };
