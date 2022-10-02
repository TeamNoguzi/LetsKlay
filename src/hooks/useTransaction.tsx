import { faCancel, faXmark } from "@fortawesome/free-solid-svg-icons";
import { toastsAddAtom, ToastAddParams } from "atoms";
import { useAtom } from "jotai";

const useTransaction = <T, P>(transaction: (params: P) => Promise<T>) => {
  const [, addToast] = useAtom(toastsAddAtom);

  return async (params: P, successToast?: ToastAddParams) => {
    try {
      const result = await transaction(params);
      if (successToast) addToast(successToast);

      return result;
    } catch (err: any) {
      if ((err.message as string).includes("User denied transaction signature"))
        addToast({
          title: "Transaction cancelled",
          body: "Transaction is canceled by user",
          icon: faXmark,
        });
      else {
        addToast({
          title: "Unexpected error occurred",
          body: "Unexpected error has occurred. Please contact administrator.",
          icon: faCancel,
        });
        throw err;
      }
      return null;
    }
  };
};

export { useTransaction };
