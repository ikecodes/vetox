import colors from "@/constants/colors";
import Image from "next/image";
import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import styled from "styled-components";
import Header from "../Header";
import PrimaryBtn from "../PrimaryBtn";

const services = [
  {
    name: "Fast Delivery",
    image: "/services/fastDelivery.png",
  },
  {
    name: "Staff Training",
    image: "/services/staffTraining.png",
  },
  {
    name: "Affordable Prices",
    image: "/services/affordablePrices.png",
  },
]
const Service = ({ name, image }) => (
  <ServiceWrapper>
    <Image
      src={image}
      fill
      style={{
        objectFit: "cover",
      }}
      alt={"Services"}
    />
    <ServiceOverlay />
    <ServiceText>{name}</ServiceText>
  </ServiceWrapper>
)
const Services = () => {
  return (
    <div className='container p-5 mt-5'>
      <div className='row'>
        <div className='col-lg-6 mb-3'>
          <Header.h1>Our Services</Header.h1>
          <div className='mb-3' />

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
            officia pariatur impedit itaque nulla placeat laborum, omnis in,
            totam praesentium neque enim vero quasi debitis iure aspernatur
            laudantium tempora sint? Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Pariatur repellendus nam sequi totam asperiores
            molestiae fuga in, unde assumenda, culpa accusantium, vel omnis eum
            fugit deleniti iste nesciunt deserunt? Aspernatur.
          </p>
          <PrimaryBtn
            title={"Learn more"}
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
        <div className='col-lg-6 d-flex gap-2 justify-content-center align-items-center flex-wrap'>
          {services.map((services, i) => (
            <Service key={i} name={services.name} image={services.image} />
          ))}
        </div>
      </div>
    </div>
  )
}

const ServiceWrapper = styled.div`
  position: relative;
  height: 25rem;
  width: 11rem;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 567px) {
    width: 80%;
  }
  /* & div {
    transform: translateY(50px);
    @media (max-width: 567px) {
      transform: translateY(0);
    }
  } */
  &:nth-child(2) {
    transform: translateY(-50px);
    @media (max-width: 567px) {
      transform: translateY(0);
    }
  }
`
const ServiceOverlay = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    360deg,
    #4262ff 16.81%,
    rgba(217, 217, 217, 0) 51.29%
  );
`;
const ServiceText = styled.h5`
  position: absolute;
  color: ${colors.white};
  z-index: 1000;
  bottom: 10px;
  left: 5px;
  font-weight: 900;
  text-transform: capitalize;
  width: 20px;
`;

export default Services;
