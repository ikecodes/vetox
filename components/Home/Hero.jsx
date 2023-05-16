import React from "react";
import styled from "styled-components";
import { Carousel } from "react-bootstrap";
import Image from "next/image";
import colors from "@/constants/colors"
import { useGetHeros } from "@/hooks/hero.hook"
import Loader from "../Loader"
const Hero = () => {
  const { data, isLoading } = useGetHeros()
  const articles = data?.data?.data ?? []
  // const articles = [
  //   {
  //     title: "Header One",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo deleniti neque, iure",
  //     imageUrl: "https://arbiterz.com/wp-content/uploads/2020/10/medical.jpg",
  //   },
  //   {
  //     title: "Header Two",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo deleniti neque, iure",
  //     imageUrl:
  //       "https://www.heartlandmedical.com/wp-content/uploads/equipment-1200x900.jpg",
  //   },
  //   {
  //     title: "Header Three",
  //     description:
  //       "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo deleniti neque, iure",
  //     imageUrl:
  //       "https://lh5.googleusercontent.com/HiTeuxeQeI7RN1eerliZKTa1ZOZXwgprEtu-5XvgMxN5r9qiYTG-pyRsofN-qS_H_ZkEZkGbOvRq56J4wPjGT_LGzDPdgQYTZlfxWRQmr0LBIPa7b5bzS1CcsWQ8RKAcrtgOgn5I",
  //   },
  // ]

  return (
    <div className='position-relative slider_container'>
      {isLoading ? (
        <LoadingBg>
          <Loader />
        </LoadingBg>
      ) : (
        <>
          <Overlay />
          <Carousel>
            {articles.length > 0 &&
              articles.map((article, i) => (
                <Carousel.Item interval={2000} key={i}>
                  <div className='slider_image_box'>
                    <div className='slider_overlay'></div>
                    <Image
                      className='slider_image'
                      src={article?.image}
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
        </>
      )}
    </div>
  )
}

const Caption = styled.div`
  & h1 {
    font-size: 3rem;
    font-weight: 700;
    text-transform: capitalize;
    @media (max-width: 576px) {
      font-size: 2rem;
    }
  }
  & p {
    font-size: 1.5rem;
    font-weight: 500;
    @media (max-width: 576px) {
      font-size: 1.2rem;
    }
  }
`
const Overlay = styled.div`
  opacity: 0.3;
  background-color: ${colors.primary};
  height: 100%;
  width: 100%;
  position: absolute;
  z-index: 1;
`
const LoadingBg = styled.div`
  height: 80vh;
`

export default Hero;
