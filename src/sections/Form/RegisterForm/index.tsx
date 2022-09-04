import { Form } from "react-bootstrap";
import Logo from "stories/Logo";
import * as S from "./styled";

const RegisterForm = () => {
  return (
    <Form className="d-flex flex-column align-items-center">
      <Logo />
      <Form.Group className="w-100 mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <S.FormControl type="email" placeholder="Enter email" />
      </Form.Group>

      <S.FormButton variant="primary" type="submit">
        Register With Wallet
      </S.FormButton>
    </Form>
  );
};

export default RegisterForm;
