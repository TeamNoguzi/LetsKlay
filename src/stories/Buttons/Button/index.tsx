import React from "react";
import * as S from "./styled";

interface ButtonProps {
  children: string;
  variant: "primary" | "outline";
  onClick?: (e: React.MouseEvent) => unknown;
  [key: string]: unknown;
}

const Button = ({ children, variant, onClick, ...props }: ButtonProps) => {
  if (variant === "primary")
    return (
      <S.PrimaryButton onClick={onClick} {...props}>
        {children}
      </S.PrimaryButton>
    );
  return (
    <S.OutlineButton onClick={onClick} {...props}>
      {children}
    </S.OutlineButton>
  );
};

export default Button;
