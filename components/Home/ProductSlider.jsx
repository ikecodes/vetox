import colors from "@/constants/colors";
import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import styled from "styled-components";
import PrimaryBtn from "../PrimaryBtn";
import Slider from "react-slick";
import Image from "next/image";
import { categories } from "@/constants/categories"
import { useRouter } from "next/router"
import slugify from "slugify"

const Product = ({ image, category }) => {
  const router = useRouter()
  function navigateWithCategory(category) {
    router.push(
      {
        pathname: "/products",
        query: { category: slugify(category, "-") },
      },
      "/products"
    )
  }
  return (
    <ProductWrapper onClick={() => navigateWithCategory(category)}>
      <Image src={image} fill alt={"Product"} style={{ objectFit: "cover" }} />
      <Overlay />
      <Text>{category}</Text>
    </ProductWrapper>
  )
}

const ProductSlider = () => {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    speed: 1500,
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
    <div className='py-5'>
      <div className='text-center mb-3'>
        <PrimaryBtn
          title={"Products"}
          primary
          icon={
            <MdOutlineArrowRightAlt
              color={colors.white}
              size={20}
              className='ms-1'
            />
          }
        />
      </div>

      <Container className='p-5'>
        <Slider {...settings}>
          {categories.map((category, i) => {
            return (
              <Product
                key={i}
                image={category.imagePath}
                category={category.category}
              />
            )
          })}
        </Slider>
      </Container>
    </div>
  )
}

const Container = styled.div`
  overflow: hidden;
  /* background-color: ${colors.primary}; */
`
const ProductWrapper = styled.div`
  cursor: pointer;
  position: relative;
  height: 14rem;
  width: 14rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  overflow: hidden;
  @media (max-width: 576px) {
    height: 10rem;
    width: 10rem;
  }
`
const Overlay = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    360deg,
    #4262ff 20%,
    rgba(217, 217, 217, 0) 51.29%
  );
`
const Text = styled.h5`
  position: absolute;
  color: ${colors.white};
  z-index: 1000;
  bottom: 10px;
  left: 20px;
  transform: translate(50);
  font-weight: 900;
  text-transform: capitalize;
  width: 20px;
`

export default ProductSlider;
