import { modalOpenAtom } from "atoms";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import LoginForm from "stories/Forms/LoginForm";

const useAuthGuard = <T, P>(api: (params: P) => Promise<T>) => {
  const openModal = useAtom(modalOpenAtom)[1];
  return async (params: P) => {
    try {
      return await api(params);
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 401)
        openModal({ title: "", body: <LoginForm isPage={false} /> });

      throw err;
    }
  };
};

export { useAuthGuard };
