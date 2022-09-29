import RegisterForm from "stories/Forms/RegisterForm";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GetServerSidePropsContext } from "next";
import blockUnauthorized from "utils/blockUnauthorized";
import { Container } from "react-bootstrap";
import * as S from "./styled";

interface RegisterProps {
  isAuthorized: boolean;
}

const Register = ({ isAuthorized }: RegisterProps) => {
  const router = useRouter();

  useEffect(() => {
    if (isAuthorized) router.back();
  }, []);

  return (
    <>
      <S.Background />
      <Container className="d-flex justify-content-center">
        <S.RegisterFormWrapper>
          <RegisterForm isPage prevPage={router.query.prevPage as string} />
        </S.RegisterFormWrapper>
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

export default Register;
