import { forwardRef, Ref } from "react";
import { toastsPopAtom, toastsAtom, toastsCloseAtom } from "atoms";
import { useAtom } from "jotai";
import { Toast, ToastContainer, Fade, FadeProps } from "react-bootstrap";
import { Transition } from "react-transition-group";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as S from "./styled";

const CustomFade = (props: FadeProps & { ref: Ref<any> }) => {
  const [, popToast] = useAtom(toastsPopAtom);
  return (
    <Fade
      {...props}
      onExited={popToast}
      transitionClasses={{ entering: "showing", exiting: "showing show" }}
    />
  );
};

const forwardCustomFade = forwardRef<Transition<any>, FadeProps>((props, ref) => (
  <CustomFade {...props} ref={ref} />
));

const GlobalToast = () => {
  const [toasts] = useAtom(toastsAtom);
  const [, closeToast] = useAtom(toastsCloseAtom);

  return (
    <ToastContainer css={S.ToastContainerStyle}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          transition={forwardCustomFade}
          autohide
          show={toast.visible}
          onClose={() => closeToast(toast.id)}
        >
          <Toast.Header>
            {toast.icon && <FontAwesomeIcon icon={toast.icon} width={28} fontSize={18} />}
            <strong className="me-auto">{toast.title}</strong>
            <small>{toast.date}</small>
          </Toast.Header>
          <Toast.Body>{toast.body}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default GlobalToast;
