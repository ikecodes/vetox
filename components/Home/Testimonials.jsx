import React from "react";
import styled from "styled-components";
import { AiFillStar } from "react-icons/ai";
import { Carousel } from "react-bootstrap";
import colors from "@/constants/colors";
// import ProfileImg from "../../assets/images/p3.jpg"

const Testimonials = () => {
  return (
    <Container>
      <div className="container">
        <h1 className="text-capitalize my-5 text-center">
          here what our customers say about us
        </h1>

        <SliderContainer>
          <SliderBox>
            <Carousel style={{ maxWidth: "100%", width: "100%" }}>
              <Carousel.Item>
                <Avatar
                  src={
                    "https://www.seekpng.com/png/detail/316-3166470_fastcash-expanding-opportunities-black-man-headshot-white-background.png"
                  }
                  alt="Reviewer"
                />
                <figure className="position-relative">
                  <Quote className="my-3">
                    Offers one of the best services
                  </Quote>
                  <figcaption>
                    <div className="text-uppercase">
                      <p className="text-capitalize mt-4">John Williams</p>
                      <div>
                        <AiFillStar size={20} />
                        <AiFillStar size={20} />
                        <AiFillStar size={20} />
                        <AiFillStar size={20} />
                        <AiFillStar size={20} />
                      </div>
                      <p>&nbsp;</p>
                    </div>
                  </figcaption>
                </figure>
              </Carousel.Item>
            </Carousel>
          </SliderBox>
        </SliderContainer>
      </div>
    </Container>
  );
};
const Container = styled.div`
  padding: 2rem 0;
  background-color: ${colors.primary};
  border-radius: 50px;
  overflow: hidden;
  margin: 5rem 10rem;
  color: ${colors.white};

  @media (max-width: 992px) {
    margin: 0;
    border-radius: 0px;
  }
`;

const SliderContainer = styled.div``;
const SliderBox = styled.div`
  text-align: center;
  padding: 2rem 2rem;
`;

const Quote = styled.blockquote`
  z-index: 200;
`;
const Avatar = styled.img`
  height: 5rem;
  width: 5rem;
  border-radius: 50%;
`;
export default Testimonials;
