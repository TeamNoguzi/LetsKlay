import { ChangeEvent } from "react";
import { FindProjectFullResponseDto } from "@/dto";
import { SubmitHandler, useForm } from "react-hook-form";
import { Form } from "react-bootstrap";
import Button from "stories/Buttons/Button";
import { uploadImage } from "api/images";
import { useProjectsUpdateMutation } from "hooks";
import * as S from "./styled";

interface FormInput {
  thumbnailImg: File;
  thumbnailUrl: string;
}

interface FormPicturesProps {
  project: FindProjectFullResponseDto;
}

const FormPictures = ({ project }: FormPicturesProps) => {
  const mutation = useProjectsUpdateMutation();
  const { register, handleSubmit, setValue } = useForm<FormInput>({
    defaultValues: {
      ...project,
    },
  });

  const handleValidSubmit: SubmitHandler<FormInput> = (data) => {
    mutation.mutate({ project: { ...project, thumbnailUrl: data.thumbnailUrl } });
  };

  return (
    <>
      <S.FormTitle>Pictures</S.FormTitle>
      <hr className="mb-5" />
      <Form onSubmit={handleSubmit(handleValidSubmit)}>
        <S.FormSubtitle>Thumbnail</S.FormSubtitle>
        <Form.Group className="mb-3">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control
            {...register("thumbnailImg", {
              required: true,
              onChange: async (e: ChangeEvent<HTMLInputElement>) => {
                if (!e.target.files || !e.target.files[0]) return;

                const url = await uploadImage(e.target.files[0]);
                setValue("thumbnailUrl", url);
              },
            })}
            type="file"
          />

          <img src={`/${project.thumbnailUrl}`} alt="hi" />
          <S.FormDescription> The title is displayed on the item list. </S.FormDescription>
        </Form.Group>

        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default FormPictures;
