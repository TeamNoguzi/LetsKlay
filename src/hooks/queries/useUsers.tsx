import { FindUserDto, UpdateUserDto, UpdateUserResponseDto } from "@/dto";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUser, updateMe } from "api";
import { useAuthGuard } from "hooks/useAuthGuard";
import produce from "immer";
import { merge } from "lodash";

const useUser = (initialUser: FindUserDto) => {
  const { data, isError } = useQuery(["users", { id: initialUser.id }], fetchUser, {
    initialData: initialUser,
  });

  return { user: data, isError };
};

const useUserUpdateMeMutation = () => {
  const queryClient = useQueryClient();
  const updateUserGuarded = useAuthGuard(updateMe);

  return useMutation<UpdateUserResponseDto, FindUserDto, UpdateUserDto>(
    (user) => updateUserGuarded({ ...user }),
    {
      onSuccess: (data) => {
        queryClient.setQueryData(["users", { id: +data.id }], (user) =>
          produce(user, (draft) => {
            merge(draft, data);
          })
        );
      },
    }
  );
};

export { useUser, useUserUpdateMeMutation };
