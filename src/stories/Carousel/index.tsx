import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ReactElement, useState } from "react";
import * as S from "./styled";

interface CarouselProps {
  children: ReactElement[];
  gap?: number;
  width: number;
  itemWidth: number;
  count: number;
  division: number;
}

const SLIDER_PADDING = 40;

const Carousel = ({ children, gap = 15, width, itemWidth, count, division }: CarouselProps) => {
  const [page, setPage] = useState<number>(0);
  const totalWidth = (itemWidth + gap) * (count - 1) + itemWidth;

  const handleMoveNext = () => {
    if (page * (totalWidth / division) < totalWidth - width + SLIDER_PADDING)
      setPage((prev) => prev + 1);
  };

  const handleMovePrev = () => {
    if (page > 0) setPage((prev) => prev - 1);
  };

  return (
    <S.CarouselWrapper>
      <S.CarouselLeftButton onClick={handleMovePrev}>
        <FontAwesomeIcon icon={faChevronLeft} />
      </S.CarouselLeftButton>
      <S.CarouselRightButton onClick={handleMoveNext}>
        <FontAwesomeIcon icon={faChevronRight} />
      </S.CarouselRightButton>
      <S.Carousel width={width}>
        <S.CarouselSlider
          page={page}
          gap={gap}
          width={totalWidth}
          division={division}
          visibleWidth={width}
        >
          {children}
        </S.CarouselSlider>
      </S.Carousel>
    </S.CarouselWrapper>
  );
};

export default Carousel;
