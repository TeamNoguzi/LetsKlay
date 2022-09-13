import { useState, useMemo } from "react";
import { Collapse } from "react-bootstrap";
import { down } from "styled-breakpoints";
import { useBreakpoint } from "styled-breakpoints/react-emotion";
import { v4 as uuidv4 } from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons";
import * as S from "./styled";

interface StepperProps {
  steps: (JSX.Element | string)[];
  selected: number;
  onClickItem: (idx: number) => void;
}

const Stepper = ({ steps, selected, onClickItem }: StepperProps) => {
  const isMobile = useBreakpoint(down("md"));
  const [openStepper, setOpenStepper] = useState<boolean>(false);

  const toggleStepper = () => setOpenStepper((prev) => !prev);

  const stepperItems = useMemo(() => {
    return (
      <>
        {steps.map((step, idx) => (
          <S.StepperItem
            key={uuidv4()}
            onClick={() => onClickItem(idx)}
            selected={idx === selected}
          >
            {step}
          </S.StepperItem>
        ))}
      </>
    );
  }, [onClickItem, selected, steps]);

  return (
    <>
      <S.StepperTitle onClick={toggleStepper}>
        Steps
        {isMobile && (
          <FontAwesomeIcon
            icon={openStepper ? faCaretUp : faCaretDown}
            style={{ float: "right" }}
            fontSize={16}
          />
        )}
      </S.StepperTitle>
      <S.StepperContainer>
        {isMobile ? (
          <Collapse in={openStepper}>
            <div className="w-100">{stepperItems}</div>
          </Collapse>
        ) : (
          stepperItems
        )}
      </S.StepperContainer>
    </>
  );
};

export default Stepper;
