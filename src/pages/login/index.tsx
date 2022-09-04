import LoginForm from "sections/Form/LoginForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import blockUnauthorized from "utils/blockUnauthorized";
import { Container } from "react-bootstrap";
import * as S from "./styled";

interface LoginProps {
  isAuthorized: boolean;
}

const Login = ({ isAuthorized }: LoginProps) => {
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) router.back();
  }, []);

  return (
    <>
      <S.Background />
      <Container className="d-flex justify-content-center">
        <S.LoginFormWrapper>
          <LoginForm isPage prevPage={router.query.prevPage as string} />
        </S.LoginFormWrapper>
      </Container>
    </>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const isAuthorized = await blockUnauthorized(context);

  return {
    props: { isAuthorized },
  };
}

export default Login;
