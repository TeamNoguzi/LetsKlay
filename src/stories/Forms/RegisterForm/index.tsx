import React from "react";
import { login } from "api";
import { modalCloseAtom } from "atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import Logo from "stories/Logo";
import * as S from "./styled";

interface RegisterFormProps {
  isPage: boolean;
  prevPage?: string;
}

const RegisterForm = ({ isPage, prevPage }: RegisterFormProps) => {
  const router = useRouter();
  const [, closeModal] = useAtom(modalCloseAtom);

  const handleRegister = async (e: React.MouseEvent) => {
    e.preventDefault();
    await login();
    if (isPage) router.replace(prevPage ?? "/");
    else closeModal();
  };

  return (
    <Form className="d-flex flex-column align-items-center">
      <Logo />
      <Form.Group className="w-100 mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <S.FormControl type="email" placeholder="Enter email" />
      </Form.Group>

      <S.FormButton variant="primary" type="submit" onClick={handleRegister}>
        Register With Wallet
      </S.FormButton>
    </Form>
  );
};

export default RegisterForm;
