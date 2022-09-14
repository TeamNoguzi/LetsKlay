import styled from "@emotion/styled";

const NavTitle = styled.h6`
  padding-left: 20px;
  margin-bottom: 20px;

  color: ${(props) => props.theme.colors.secondaryBold};
  font-size: 18pt;
  font-weight: bold;
  line-height: 18pt;
  vertical-align: middle;
`;

const Circle = styled.span`
  display: inline-block;

  width: 30px;
  height: 30px;

  border-radius: 50%;
  border: 3px solid ${(props) => props.theme.colors.primary};

  color: ${(props) => props.theme.colors.primaryBold};
  font-weight: bold;
  text-align: center;
`;

export { NavTitle, Circle };
