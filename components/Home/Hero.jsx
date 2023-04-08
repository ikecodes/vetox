import React from "react";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
const Hero = () => {
  const articles = [
    {
      title: "Header One",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo deleniti neque, iure, tenetur alias commodi placeat deserunt fugit autem corrupti aliquam officiis? Rem officia necessitatibus accusantium voluptate molestias temporibus nostrum.",
      imageUrl: "https://arbiterz.com/wp-content/uploads/2020/10/medical.jpg",
    },
    {
      title: "Header Two",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo deleniti neque, iure, tenetur alias commodi placeat deserunt fugit autem corrupti aliquam officiis? Rem officia necessitatibus accusantium voluptate molestias temporibus nostrum.",
      imageUrl:
        "https://www.heartlandmedical.com/wp-content/uploads/equipment-1200x900.jpg",
    },
    {
      title: "Header Three",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo deleniti neque, iure, tenetur alias commodi placeat deserunt fugit autem corrupti aliquam officiis? Rem officia necessitatibus accusantium voluptate molestias temporibus nostrum.",
      imageUrl:
        "https://lh5.googleusercontent.com/HiTeuxeQeI7RN1eerliZKTa1ZOZXwgprEtu-5XvgMxN5r9qiYTG-pyRsofN-qS_H_ZkEZkGbOvRq56J4wPjGT_LGzDPdgQYTZlfxWRQmr0LBIPa7b5bzS1CcsWQ8RKAcrtgOgn5I",
    },
  ];

  return (
    <div className='position-relative slider_container'>
      <Carousel>
        {articles.length > 0 &&
          articles.map((article) => (
            <Carousel.Item interval={2000} key={article?.id}>
              <div className='slider_image_box'>
                <div className='slider_overlay'></div>
                <Image
                  className='slider_image'
                  src={article?.imageUrl}
                  alt='Second slide'
                  fill
                />
              </div>
              <Caption>
                <Carousel.Caption>
                  <h1 className='text-start'>{article?.title}</h1>
                  <p className='text-start'>{article?.description}</p>
                </Carousel.Caption>
              </Caption>
            </Carousel.Item>
          ))}
      </Carousel>
    </div>
  );
};

const Caption = styled.div`
  & h1 {
    font-size: 3rem;
    font-weight: 700;
    text-transform: capitalize;
    @media (max-width: 576px) {
      font-size: 1.5rem;
    }
  }
`;

export default Hero;
