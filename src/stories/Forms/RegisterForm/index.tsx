import { modalCloseAtom } from "atoms";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { Form } from "react-bootstrap";
import Logo from "stories/Logo";
import { SubmitHandler, useForm } from "react-hook-form";
import { useUserCreateMutation } from "hooks/queries/useUserCreate";
import * as S from "./styled";

interface RegisterFormProps {
  isPage: boolean;
  prevPage?: string;
}

interface RegisterFormValues {
  name: string;
  email: string;
}

const RegisterForm = ({ isPage, prevPage }: RegisterFormProps) => {
  const { register, handleSubmit } = useForm<RegisterFormValues>();
  const mutation = useUserCreateMutation();
  const router = useRouter();
  const [, closeModal] = useAtom(modalCloseAtom);

  const handleRegister: SubmitHandler<RegisterFormValues> = async (data, event) => {
    event?.preventDefault();

    await mutation.mutateAsync(data, {
      onSuccess: () => {
        if (isPage) router.replace(prevPage ?? "/");
        else closeModal();
      },
    });
  };

  return (
    <Form
      className="d-flex flex-column align-items-center w-100"
      onSubmit={handleSubmit(handleRegister)}
    >
      <Logo />
      <Form.Group className="w-100 mb-3">
        <Form.Label>Username</Form.Label>
        <S.FormControl type="text" placeholder="Enter username" {...register("name")} />
      </Form.Group>

      <Form.Group className="w-100 mb-3">
        <Form.Label>Email address</Form.Label>
        <S.FormControl type="email" placeholder="Enter email" {...register("email")} />
      </Form.Group>

      <S.FormButton variant="primary" type="submit">
        Register With Wallet
      </S.FormButton>
    </Form>
  );
};

export default RegisterForm;
