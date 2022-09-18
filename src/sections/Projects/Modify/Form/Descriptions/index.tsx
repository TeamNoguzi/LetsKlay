import { FindProjectFullResponseDto } from "@/dto";
import { Editor } from "@toast-ui/react-editor";
import { useRef, useEffect } from "react";
import { useProjectsUpdateMutation } from "hooks";
import { uploadImage } from "api";
import { debounce } from "lodash";
import Button from "stories/Buttons/Button";

import "@toast-ui/editor/dist/toastui-editor.css";
import * as S from "./styled";

interface FormDescriptionsProps {
  project: FindProjectFullResponseDto;
}

const FormDescriptions = ({ project }: FormDescriptionsProps) => {
  const mutation = useProjectsUpdateMutation(false);
  const ref = useRef<Editor>(null);

  useEffect(() => {
    ref.current?.getInstance().setMarkdown(project.description);
  }, [project.description]);

  const handleSave = debounce(
    () =>
      mutation.mutate({
        project: {
          id: project.id,
          description: ref.current?.getInstance().getMarkdown(),
        },
      }),
    250
  );

  return (
    <>
      <S.FormTitle>Descriptions</S.FormTitle>
      <hr className="mb-5" />
      <Editor
        ref={ref}
        initialEditType="markdown"
        previewStyle="vertical"
        height="500px"
        onKeydown={handleSave}
        hooks={{
          async addImageBlobHook(blob, callback) {
            const split = blob.type.split("/");
            const ext = split[split.length - 1];
            const file = new File([blob], `image.${ext}`);
            const url = await uploadImage(file);
            callback(`/${url.replace(/\\/, "/")}`);
          },
        }}
      />
      <Button type="submit" variant="outline" className="mt-3" onClick={handleSave}>
        Save Changes
      </Button>
    </>
  );
};

export default FormDescriptions;
