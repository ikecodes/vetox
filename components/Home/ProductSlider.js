import colors from "@/constants/colors";
import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import styled from "styled-components";
import PrimaryBtn from "../PrimaryBtn";
import Slider from "react-slick";
import Image from "next/image";

const Product = () => {
  return (
    <ProductWrapper>
      <Image
        src={
          "https://ae01.alicdn.com/kf/H1aa80e9e8d7a46fba3831d790800b64ce/Portable-Single-Head-Stethoscope-Professional-Cardiology-Stethoscope-Doctor-Medical-Equipment-Student-Vet-Nurse-Medical-Device.jpg"
        }
        fill
        // width={100}
        // height={100}
        alt={"Product"}
        style={{ objectFit: "cover" }}
      />
    </ProductWrapper>
  );
};

const products = [
  {
    name: "Product1",
  },
  {
    name: "Product2",
  },
  {
    name: "Product3",
  },
  {
    name: "Product4",
  },
  {
    name: "Product5",
  },
];

const ProductSlider = () => {
  const settings = {
    dots: false,
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
  };
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
          {products.map((product, i) => {
            return <Product key={i} name={product.name} />;
          })}
        </Slider>
      </Container>
    </div>
  );
};

const Container = styled.div`
  overflow: hidden;
  background-color: ${colors.primary};
`;
const ProductWrapper = styled.div`
  position: relative;
  height: 14rem;
  width: 14rem;
  background-color: ${colors.primary};
  border: 2px solid #dde3ff;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 576px) {
    height: 10rem;
    width: 10rem;
  }
`;
export default ProductSlider;
