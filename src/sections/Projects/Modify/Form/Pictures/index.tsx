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
  mainPictureUrl: string;
  mainPictureImg: File;
}

interface FormPicturesProps {
  project: FindProjectFullResponseDto;
}

const FormPictures = ({ project }: FormPicturesProps) => {
  const mutation = useProjectsUpdateMutation();
  const { register, handleSubmit, setValue, watch } = useForm<FormInput>({
    defaultValues: {
      ...project,
    },
  });

  const handleValidSubmit: SubmitHandler<FormInput> = (data) => {
    mutation.mutate({
      project: {
        id: project.id,
        mainPictureUrl: data.mainPictureUrl,
        thumbnailUrl: data.thumbnailUrl,
      },
    });
  };

  const handleUploadThumbnail = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const url = await uploadImage(e.target.files[0]);
    setValue("thumbnailUrl", url);
  };

  const handleUploadMainPicture = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;

    const url = await uploadImage(e.target.files[0]);
    setValue("mainPictureUrl", url);
  };

  return (
    <>
      <S.FormTitle>Pictures</S.FormTitle>
      <hr className="mb-5" />
      <Form onSubmit={handleSubmit(handleValidSubmit)}>
        <S.FormSubtitle>Main Picture</S.FormSubtitle>
        <Form.Group className="mb-3">
          <Form.Label>Main Picture</Form.Label>
          <Form.Control
            {...register("mainPictureImg", {
              onChange: handleUploadMainPicture,
            })}
            type="file"
          />
        </Form.Group>
        <Form.Label>Preview</Form.Label>
        <S.FormImage src={`/${watch("mainPictureUrl")}`} alt="main" />
        <S.FormDescription> The title is displayed on the item list. </S.FormDescription>

        <hr className="my-5" />

        <S.FormSubtitle>Thumbnail</S.FormSubtitle>
        <Form.Group className="mb-3">
          <Form.Label>Thumbnail</Form.Label>
          <Form.Control
            {...register("thumbnailImg", {
              onChange: handleUploadThumbnail,
            })}
            type="file"
          />
        </Form.Group>
        <Form.Label>Preview</Form.Label>
        <S.FormImage src={`/${watch("thumbnailUrl")}`} alt="thumbnail" />
        <S.FormDescription> The title is displayed on the item list. </S.FormDescription>

        <Button type="submit" variant="primary">
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default FormPictures;
