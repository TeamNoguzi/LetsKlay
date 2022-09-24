import { FindUserDto } from "@/dto";
import { faImage } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { uploadImage } from "api";
import { useAuthGuard } from "hooks";
import { useUserUpdateMeMutation } from "hooks/queries/useUsers";
import { useRef } from "react";
import * as S from "./styled";

interface MyInfoProps {
  user: FindUserDto;
}

const MyInfo = ({ user }: MyInfoProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const uploadImageGuarded = useAuthGuard(uploadImage);
  const mutation = useUserUpdateMeMutation();

  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleUpload = async () => {
    if (inputRef.current?.files?.[0]) {
      const url = await uploadImageGuarded(inputRef.current.files[0]);
      mutation.mutate({ profileImgUrl: url });
    }
  };

  return (
    <S.MyInfoContainer>
      <S.MyInfoImageWrapper onClick={handleClick}>
        {user.profileImgUrl ? (
          <img src={user.profileImgUrl} alt="hi" />
        ) : (
          <div>
            <FontAwesomeIcon icon={faImage} fontSize={72} />
          </div>
        )}
        <input ref={inputRef} hidden type="file" onChange={handleUpload} />
      </S.MyInfoImageWrapper>
      <S.MyInfoDescription>
        <h3>{user.id}</h3>
        <span>ADDRESS</span>
        <p>{user.address}</p>
        <span>EMAIL</span>
        <p>{user.email}</p>
      </S.MyInfoDescription>
    </S.MyInfoContainer>
  );
};

export default MyInfo;
