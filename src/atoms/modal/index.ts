import { ReactNode } from "react";
import { atom } from "jotai";

interface ModalAtom {
  visible: boolean;
  title?: string;
  body: ReactNode;
}

const modalAtom = atom<ModalAtom>({ visible: false, title: "", body: "" });
const modalCloseAtom = atom(null, (get, set) => {
  const curState = get(modalAtom);
  set(modalAtom, { ...curState, visible: false });
});
const modalOpenAtom = atom<null, Omit<ModalAtom, "visible">>(null, (get, set, update) => {
  set(modalAtom, { ...update, visible: true });
});

export { modalAtom, modalCloseAtom, modalOpenAtom };
