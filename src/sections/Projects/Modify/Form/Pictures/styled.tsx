import styled from "@emotion/styled";

const FormTitle = styled.h2`
  font-weight: bold;
  font-size: 18pt;
`;

const FormSubtitle = styled.h3`
  font-weight: bold;
  font-size: 16pt;
`;

const FormDescription = styled.p`
  margin-top: 10px;
  margin-bottom: 20px;
`;

const FormImage = styled.img`
  display: block;
  min-height: 100px;
  &:before {
    content: "Please upload image.";
    display: block;
    position: absolute;
    height: 100px;
    width: 200px;
    background-color: white;
  }
`;

export { FormTitle, FormSubtitle, FormDescription, FormImage };
