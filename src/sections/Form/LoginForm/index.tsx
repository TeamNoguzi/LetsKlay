import React from "react";
import { login } from "api";
import { Form } from "react-bootstrap";
import Logo from "stories/Logo";
import { useRouter } from "next/router";
import * as S from "./styled";

interface LoginFormProps {
  isPage: boolean;
  prevPage?: string;
}

const LoginForm = ({ isPage, prevPage }: LoginFormProps) => {
  const router = useRouter();

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    await login();

    if (isPage) router.replace(prevPage ?? "/");
    else window.close();
  };

  return (
    <Form className="d-flex flex-column align-items-center">
      <Logo />
      <S.FormButton className="mt-3" onClick={handleLogin} variant="primary" type="submit">
        Login With Wallet
      </S.FormButton>
    </Form>
  );
};

export default LoginForm;
