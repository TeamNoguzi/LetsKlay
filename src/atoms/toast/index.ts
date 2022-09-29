import { IconProp } from "@fortawesome/fontawesome-svg-core";
import produce from "immer";
import { atom } from "jotai";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

interface Toast {
  id: string;
  visible: boolean;
  title: string;
  date: string;
  body: string;
  icon: IconProp | null;
}

type ToastsAtom = Toast[];

const toastsAtom = atom<ToastsAtom>([]);

const toastsAddAtom = atom<null, Omit<Toast, "date" | "visible" | "id">>(
  null,
  (get, set, update) => {
    set(toastsAtom, [
      ...get(toastsAtom),
      { ...update, date: moment().format("hh:mm:ss"), visible: true, id: uuidv4() },
    ]);
  }
);

const toastsCloseAtom = atom<null, string>(null, (get, set, update) => {
  set(
    toastsAtom,
    produce(get(toastsAtom), (draft) => {
      const found = draft.find((v) => v.id === update);
      if (!found) return;
      // eslint-disable-next-line no-param-reassign
      found.visible = false;
    })
  );
});

const toastsPopAtom = atom(null, (get, set) => {
  set(
    toastsAtom,
    produce(get(toastsAtom), (draft) => {
      draft.shift();
    })
  );
});

export { toastsAtom, toastsAddAtom, toastsCloseAtom, toastsPopAtom };
