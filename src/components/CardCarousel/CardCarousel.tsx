import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./CardCarousel.module.css";
import ItemCard, { CardProps } from "../ItemCards/ItemCard";

/* 
 https://www.npmjs.com/package/react-multi-carousel
*/
interface CarouselProps {
toRenderCardProps : Array<CardProps>
carouselTitle : string
}

const CardCarousel: React.FC<CarouselProps> = ({toRenderCardProps,carouselTitle = "default carousel title"}) => {
  const process = toRenderCardProps.map(function (iter) {
    //px-3 -> give padding 3 along with x-axis(left,right)
    return (
      <div className="px-3"> 
        <ItemCard
          mode={iter.mode}
          title={iter.title}
          subtitle = {iter.subtitle}
          cardText = {iter.cardText}
          nowPrice= {iter.nowPrice}
          totalPrice= {iter.totalPrice}
        />
      </div>
    );
  });

  const responsive = { //
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 4, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1, // optional, default to 1.
    },
  };
  return (
    <div>
      {carouselTitle}
      <Carousel
        swipeable={true}
        draggable={true}
        responsive={responsive}
        //ssr={false} // means to render carousel on server-side.
        infinite={true}
        autoPlay={false}
        // autoPlaySpeed={3000} // bigger is slower
        // keyBoardControl={true}
        //customTransition="all .1"
        //transitionDuration={1000}
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
export type { CarouselProps };
