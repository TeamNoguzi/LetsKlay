import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./CardCarousel.module.css";
import ItemCard from "../CardComponent/ItemCard";

/* 
 N개가 입력되고, 흠 4개를 보여줄 거임..
*/
interface _CarouselProps {}

const CardCarousel: React.FC<_CarouselProps> = () => {
  const array = ["First", "Second", "Third", "Fourth", "Fifth"];
  const process = array.map(function (iter) {
    return (
      <div className="px-3  ㅍ">
          ""ㅏㅏㅣㅣ::ㅣㅣ"""ㅏㅏㅏㅏㅏ""ㅏㅏ":ㅣㅏㅣ:"":ㅣ
        <ItemCard
          mode="Default"
          _title={iter}
          _subtitle="adsf"
          _cardText="asdf"
          price={1000}
          progress={{ percent: 50, totalPrice: 100 }}
        />
      </div>
    );
  });

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div>
      Weekly Popular
      <Carousel
        swipeable={false}
        draggable={false}
        showDots={true}
        responsive={responsive}
        ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={3000} // bigger is slower
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={1000}
        removeArrowOnDeviceType={["tablet", "mobile"]}
        //deviceType={this.props.deviceType}
        // dotListClass="custom-dot-list-style"
        // containerClass={styles["custom-item"]}
        itemClass={styles["custom-item"]}
        centerMode={false}
      >
        {process}
      </Carousel>
    </div>
  );
};

export default CardCarousel;
export type { _CarouselProps };
