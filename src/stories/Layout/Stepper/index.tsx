import { ReactElement, useState } from "react";
import * as S from "./styled";

interface StepperProps {
  steps: (ReactElement | string)[];
}

const Stepper = ({ steps }: StepperProps) => {
  const [selected, setSelected] = useState<number>(0);

  const handleClickItem = (idx: number) => {
    setSelected(idx);
  };

  return (
    <S.StepperContainer>
      {steps.map((step, idx) => (
        <S.StepperItem
          key={step.toString()}
          onClick={() => handleClickItem(idx)}
          selected={idx === selected}
        >
          {step}
        </S.StepperItem>
      ))}
    </S.StepperContainer>
  );
};

export default Stepper;
