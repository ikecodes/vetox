import colors from "@/constants/colors"
import React from "react"
import styled from "styled-components"
import Slider from "react-slick"
import Image from "next/image"
import Header from "../Header"

const Brand = ({ image }) => {
  return (
    <BrandWrapper>
      <Image src={image} fill alt={"Product"} style={{ objectFit: "cover" }} />
    </BrandWrapper>
  )
}

const brands = [
  {
    image: "https://www.logo.wine/a/logo/Pfizer/Pfizer-Logo.wine.svg",
  },
  {
    image:
      "https://www.gannett-cdn.com/-mm-/64e1963df6c5d336eb3f80c4e94ed39e722d8264/c=77-70-614-374/local/-/media/2016/04/19/Nashville/Nashville/635966691686163960-unh-use.jpg?width=3200&height=1680&fit=crop",
  },
  {
    image:
      "https://cdn.logojoy.com/wp-content/uploads/2018/05/30162403/12_big.png",
  },
  {
    image:
      "https://1000logos.net/wp-content/uploads/2021/09/Medtronic-Logo-1999.png",
  },
  {
    image:
      "https://fyihealthgroup.com/wp-content/uploads/2021/12/v1_OUR-BRANDS_-copy-5-1024x654.png",
  },
]

const BrandsSlider = () => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 2000,
    centerMode: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <Container className='p-5 my-5'>
      <div className='text-center mb-3'>
        <Header.h4 color={colors.black}>Shop by Brands</Header.h4>
        <div className='mb-3' />
      </div>
      <Slider {...settings}>
        {brands.map((brand, i) => {
          return <Brand key={i} image={brand.image} />
        })}
      </Slider>
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
  background-color: ${colors.grey1};
`
const BrandWrapper = styled.div`
  position: relative;
  height: 10rem;
  width: 15rem;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 576px) {
    height: 10rem;
    width: 10rem;
  }
`
export default BrandsSlider
