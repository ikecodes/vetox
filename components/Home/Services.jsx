import colors from "@/constants/colors";
import Image from "next/image";
import React from "react";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import styled from "styled-components";
import Header from "../Header";
import PrimaryBtn from "../PrimaryBtn";
import { useRouter } from "next/router";

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
];
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
);
const Services = () => {
  const router = useRouter();
  return (
    <div className="container p-5 mt-5">
      <div className="row">
        <div className="col-lg-6 mb-3">
          <Header.h1>Our Services</Header.h1>
          <div className="mb-3" />

          <p>
            At VGM, our passion for excellence drives us to redefine the
            healthcare landscape by providing top-quality medical equipment to
            healthcare facilities nationwide.
          </p>
          <p>
            We understand that delivering exceptional patient care requires
            cutting-edge technology and reliable support, which is why we strive
            to be the trusted partner you can rely on.
          </p>
          <p>
            By working closely with industry professionals, we have a
            comprehensive range of medical devices that cater to the specific
            needs of each facility, ensuring optimal patient care and
            streamlined workflows.
          </p>
          <PrimaryBtn
            title={"Learn more"}
            primary
            icon={
              <MdOutlineArrowRightAlt
                color={colors.white}
                size={20}
                className="ms-1"
              />
            }
            handleClick={() => router.push("/about-us")}
          />
        </div>
        <Box className="col-lg-6 d-flex gap-2 justify-content-center align-items-center flex-wrap">
          {services.map((services, i) => (
            <Service key={i} name={services.name} image={services.image} />
          ))}
        </Box>
      </div>
    </div>
  );
};

const ServiceWrapper = styled.div`
  position: relative;
  height: 25rem;
  width: 11rem;
  border-radius: 20px;
  overflow: hidden;
  @media (max-width: 567px) {
    width: 100%;
    margin-bottom: 2rem;
  }

  &:nth-child(2) {
    transform: translateY(-50px);
    @media (max-width: 567px) {
      transform: translateY(0);
    }
  }
`;
const Box = styled.div`
  @media (max-width: 567px) {
    padding: 0;
  }
`;
const ServiceOverlay = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  /* background: linear-gradient(
    360deg,
    #30d5c8 16.81%,
    rgba(217, 217, 217, 0) 51.29%
  ); */
  background: linear-gradient(
    360deg,
    rgba(255, 132, 167, 0.44) 16.81%,
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
