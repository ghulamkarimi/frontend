"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";


 const CarouselItem = [
    {
      id: 1,
      title: "Slide 1",
      description: "Description 1",
      image: "/reifenCar.png",
    },
    {
      id: 2,
      title: "Slide 2",
      description: "Description 2",
      image: "/reifenCarousel.png",
    },
    {
      id: 3,
      title: "Slide 3",
      description: "Description 3",
      image: "/werkzeug.jpeg",
    },
 ]
 
 
 const HomeCarouselHero = () => {
  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  return (
    <div className="w-full pt-10"> {/* 'pt-20' für mehr Abstand oben */}
      <Carousel
        responsive={responsive}
        swipeable={true}
        className="w-full h-[600px]"
        showDots={true}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all .5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {CarouselItem.map((item) => (
          <div key={item.id}>
            <img className="w-full h-[600px] " src={item.image} alt={item.title} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default HomeCarouselHero;
