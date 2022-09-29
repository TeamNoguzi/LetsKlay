import { modalOpenAtom } from "atoms";
import { AxiosError } from "axios";
import { useAtom } from "jotai";
import LoginForm from "sections/Form/LoginForm";

const useAuthGuard = <T, P>(api: (params: P) => Promise<T>) => {
  const openModal = useAtom(modalOpenAtom)[1];
  return async (params: P) => {
    let result = null;
    try {
      result = await api(params);
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 401)
        openModal({ title: "", body: <LoginForm isPage={false} /> });
      throw err;
    }
    return result;
  };
};

export { useAuthGuard };
