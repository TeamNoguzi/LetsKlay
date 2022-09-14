import { Form } from "react-bootstrap";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "stories/Buttons/Button";
import { Project } from "@/entities";
import { useProjectsUpdateMutation } from "hooks/queries";
import * as S from "./styled";

interface FormInput {
  title: string;
  subtitle: string;
  summary: string;
}

interface FormBasicsProps {
  project: Project;
}

const FormBasics = ({ project }: FormBasicsProps) => {
  const mutation = useProjectsUpdateMutation();
  const { register, handleSubmit } = useForm<FormInput>({
    defaultValues: {
      ...project,
    },
  });

  const handleValidSubmit: SubmitHandler<FormInput> = (data) =>
    mutation.mutate({ project: { ...project, ...data } });

  return (
    <>
      <S.FormTitle>Basics</S.FormTitle>
      <hr className="mb-5" />
      <Form onSubmit={handleSubmit(handleValidSubmit)}>
        <S.FormSubtitle>Title</S.FormSubtitle>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            {...register("title", { required: true })}
            placeholder="Smart Pillow : a helper for good sleep"
          />
          <S.FormDescription> The title is displayed on the item list. </S.FormDescription>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Subtitle</Form.Label>
          <Form.Control
            {...register("subtitle", { required: true, maxLength: 300 })}
            placeholder="A manager pillow which checks sleeping habits and body signals to care your night"
          />
          <S.FormDescription> The subtitle is displayed under the title. </S.FormDescription>
        </Form.Group>

        <hr className="my-5" />
        <S.FormSubtitle>Summary</S.FormSubtitle>
        <Form.Group className="mb-3">
          <Form.Label>Summary</Form.Label>
          <Form.Control
            {...register("summary", { required: true })}
            placeholder="Please describe your project briefly here"
            as="textarea"
            style={{ minHeight: "300px" }}
          />
          <S.FormDescription>hi</S.FormDescription>
        </Form.Group>

        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default FormBasics;
