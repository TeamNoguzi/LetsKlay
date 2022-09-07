import styled from "@emotion/styled";
import { flexBox } from "styles/mixins";

interface CarouselProps {
  width: number;
}

interface CarouselSliderProps {
  page: number;
  gap: number;
  width: number;
  visibleWidth: number;
  division: number;
}

const SLIDER_PADDING = 40;

const CarouselWrapper = styled.div`
  ${flexBox({ direction: "row", middle: true })};
  position: relative;
  width: 100%;
  padding: 0 ${SLIDER_PADDING / 2}px;
`;

const Carousel = styled.div<CarouselProps>`
  position: relative;
  overflow: hidden;
  width: ${(props) => props.width}px;
`;

const CarouselLeftButton = styled.div`
  ${flexBox({ direction: "row", middle: true })};

  position: absolute;
  top: 50%;
  left: 0px;

  z-index: 1;

  width: 35px;
  height: 35px;

  font-size: 18pt;
  color: #3c3c3c50;
  border-radius: 50%;
  background-color: white;
  box-shadow: -2px 0 5px 1px #3c3c3c20;

  &:hover {
  }
`;

const CarouselRightButton = styled.div`
  ${flexBox({ direction: "row", middle: true })};
  position: absolute;
  top: 50%;
  right: 0px;

  z-index: 1;

  width: 35px;
  height: 35px;

  font-size: 18pt;
  color: #3c3c3c50;
  border-radius: 50%;
  background-color: white;
  box-shadow: 3px 0 5px 1px #3c3c3c20;
`;

const CarouselSlider = styled.div<CarouselSliderProps>`
  ${flexBox({ direction: "row", middle: true })};
  gap: 0 ${(props) => props.gap}px;

  width: max-content;
  transform: translateX(
    max(
      -${(props) => (props.width / props.division) * props.page}px,
      -${(props) => props.width - props.visibleWidth + SLIDER_PADDING}px
    )
  );
  transition: 0.15s ease-in-out;
`;

export { CarouselWrapper, Carousel, CarouselSlider, CarouselLeftButton, CarouselRightButton };
