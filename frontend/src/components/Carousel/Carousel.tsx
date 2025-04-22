import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import styles from "./Carousel.module.css";

const images = [
  "https://selectgame.gamehall.com.br/wp-content/uploads/2020/05/Dark-Souls-III-Irithyll-do-Vale-Boreal-Screenshot-04.jpg",
  "https://i.redd.it/zfenq104p4y61.jpg",
  "https://i.redd.it/qfo01nwyo4y61.jpg"
];

const Carousel: React.FC = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className={styles.carouselContainer}>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img src={image} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
