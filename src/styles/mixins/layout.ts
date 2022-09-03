interface FlexBoxProps {
  direction: "row" | "column";
  middle: boolean;
}

const flexBox = ({ direction, middle }: FlexBoxProps) => {
  return `
    display: flex;
    flex-direction: ${direction};
    ${
      middle &&
      `
      justify-content: center;
      align-items: center;
    `
    }
  `;
};

export { flexBox };
