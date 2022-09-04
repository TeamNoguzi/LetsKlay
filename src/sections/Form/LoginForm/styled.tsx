import styled from "@emotion/styled";
import { Form } from "react-bootstrap";
import Button from "stories/Buttons/Button";

const FormControl = styled(Form.Control)`
  width: 100%;
  height: 60px;
`;

const FormButton = styled(Button)`
  width: 100%;
  height: 50px;
`;

export { FormControl, FormButton };
