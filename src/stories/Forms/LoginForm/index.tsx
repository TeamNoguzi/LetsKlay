import React from "react";
import { login } from "api";
import { Form } from "react-bootstrap";
import Logo from "stories/Logo";
import { useRouter } from "next/router";
import { modalCloseAtom, modalOpenAtom } from "atoms";
import { useAtom } from "jotai";
import RegisterForm from "../RegisterForm";
import * as S from "./styled";

interface LoginFormProps {
  isPage: boolean;
  prevPage?: string;
}

const LoginForm = ({ isPage, prevPage }: LoginFormProps) => {
  const router = useRouter();
  const [, openModal] = useAtom(modalOpenAtom);
  const [, closeModal] = useAtom(modalCloseAtom);

  const handleLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    await login();

    if (isPage) router.replace(prevPage ?? "/");
    else closeModal();
  };

  const handleClickRegister = () => {
    if (isPage) router.replace(`/register?prevPage=${prevPage}`);
    else openModal({ body: <RegisterForm isPage prevPage={prevPage} /> });
  };

  return (
    <Form className="d-flex flex-column align-items-center w-100">
      <Logo />
      <p className="mt-4">Wallet which supports klaytn is essential to login.</p>

      <S.FormButton className="mt-3 mb-2" onClick={handleLogin} variant="primary" type="submit">
        Login With Wallet
      </S.FormButton>
      <S.FormButton className="mb-2" variant="outline" onClick={handleClickRegister}>
        Register
      </S.FormButton>
      <p>
        <a
          href="https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi"
          target="_blank"
          rel="noreferrer"
        >
          Get Wallet &gt;
        </a>
      </p>
    </Form>
  );
};

export default LoginForm;
