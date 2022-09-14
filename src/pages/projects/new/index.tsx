import { useState, useMemo, useCallback } from "react";
import Stepper from "sections/Projects/New/Stepper";
import { Container, Row, Col } from "react-bootstrap";
import Logo from "stories/Logo";
import Navigation from "stories/Layout/Navigation";
import Footer from "stories/Layout/Footer";
import * as S from "./styled";

const ProjectNew = () => {
  const [selected, setSelected] = useState<number>(0);
  const handleSelect = useCallback((idx: number) => setSelected(idx), []);

  const steps = useMemo(
    () => [
      <>
        <S.Circle>1</S.Circle>
        Basics
      </>,
      <>
        <S.Circle>2</S.Circle>
        Pictures
      </>,
      <>
        <S.Circle>3</S.Circle>
        Descriptions
      </>,
      <>
        <S.Circle>4</S.Circle>
        Rewards
      </>,
    ],
    []
  );

  return (
    <Container>
      <header>
        <Logo center />
        <Navigation />
      </header>
      <Row className="mt-4">
        <Col xs={12} md={4} lg={3} as="nav">
          <Stepper steps={steps} selected={selected} onClickItem={handleSelect} />
        </Col>
        <Col xs={12} md={8} lg={9}>
          hi
        </Col>
      </Row>
      <footer>
        <Footer />
      </footer>
    </Container>
  );
};

export async function getServerSideProps() {
  return { props: {} };
}

export default ProjectNew;