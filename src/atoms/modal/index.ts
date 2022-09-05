import { ReactElement } from "react";
import { atom } from "jotai";

interface ModalAtom {
  visible: boolean;
  title?: string;
  body: string | ReactElement;
}

const modalAtom = atom<ModalAtom>({ visible: false, title: "", body: "" });
const modalToggleAtom = atom(null, (get, set) => {
  const curState = get(modalAtom);
  set(modalAtom, { ...curState, visible: !curState.visible });
});
const modalOpenAtom = atom<null, Omit<ModalAtom, "visible">>(null, (get, set, update) => {
  set(modalAtom, { ...update, visible: true });
});

export { modalAtom, modalToggleAtom, modalOpenAtom };