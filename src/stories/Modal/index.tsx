import { useAtom } from "jotai";
import { Modal as BsModal } from "react-bootstrap";
import { modalAtom } from "atoms";
import * as S from "./styled";

function Modal() {
  const [modal, setModal] = useAtom(modalAtom);

  const handleClose = () => setModal({ ...modal, visible: false });

  return (
    <BsModal show={modal.visible} onHide={handleClose}>
      <S.ModalHeader closeButton>
        <BsModal.Title>{modal.title ?? ""}</BsModal.Title>
      </S.ModalHeader>
      <BsModal.Body>{modal.body}</BsModal.Body>
    </BsModal>
  );
}

export default Modal;
