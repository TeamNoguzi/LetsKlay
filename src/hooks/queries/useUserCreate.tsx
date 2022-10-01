import { CreateUserResponseDto, CreateUserDto } from "@/dto";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { signup } from "api";
import { toastsAddAtom } from "atoms";
import { AxiosError } from "axios";
import { useAtom } from "jotai";

const useUserCreateMutation = () => {
  const queryClient = useQueryClient();
  const [, addToast] = useAtom(toastsAddAtom);

  return useMutation<CreateUserResponseDto, unknown, Omit<CreateUserDto, "address" | "sign">>(
    (user) => signup({ ...user }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["users", { id: +data.id }], data);
      },
      onError: (err) => {
        const error = err as AxiosError;
        if (error.response?.status === 409)
          addToast({
            icon: faXmark,
            title: "Address is already used",
            body: "The address is used in other account. Please use diffrent address to register.",
          });
      },
    }
  );
};

export { useUserCreateMutation };
