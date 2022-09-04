import LoginForm from "sections/Form/LoginForm";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();

  return <LoginForm isPage prevPage={router.query.prevPage as string} />;
};

export async function getServerSideProps() {
  return {
    props: {},
  };
}

export default Login;
