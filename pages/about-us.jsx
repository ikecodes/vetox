import Header from "@/components/Header";
import colors from "@/constants/colors";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

const AboutUs = () => {
  return (
    <div className="container">
      <div className="text-center my-5">
        <Header.h4 color={colors.black}>
          About Vetox Global Medical Services
        </Header.h4>
      </div>
      <ImageContainer>
        <Image
          src={"https://wallpaper.dog/large/10993881.jpg"}
          fill
          alt="Article Image"
          style={{
            objectFit: "cover",
          }}
        />
      </ImageContainer>

      <div className="row my-5 flex-lg-row-reverse">
        <div className="col-lg-6 mb-3 ">
          <Header.h4 color={colors.black}>What we do</Header.h4>
          <div className="mb-3" />
          <p>
            Vetox Global Medical is a private professional medical company
            locally owned and entrusted with an international franchise to
            engage in importation, distribution, and marketing of best quality
            medical and pharmaceutical equipment as well as hospital
            consumables. Vetox Global Medical provides a combination of
            excellent distribution and marketing of the best medical and
            pharmaceutical equipment at value pricing, with a smart national
            distribution and delivery network, excellent packaging and
            standardized product quality. We feature a modern platform, an
            elegant channel with comfortable and easy to access places for
            everything, hospital equipment consumables, furniture&apos;s, and
            pharmaceutical equipment. We are the perfect place to shop for
            trusted brands of medical and pharmaceutical equipment and have
            peace of mind for safe and timely delivery at a value for money rate
            across the country and Africa. We are the answer to an increasing
            demand for reliable and standardized medical and pharmaceutical
            equipment.
          </p>
        </div>
        <div className="col-lg-6 mb-3">
          <ImageWrapper>
            <Image
              src={
                "https://www.afro.who.int/sites/default/files/2020-06/Virtual%20training%203.jpg"
              }
              fill
              alt="Article Image"
              style={{
                objectFit: "cover",
              }}
            />
          </ImageWrapper>
        </div>
      </div>
      <div className="row my-5">
        <div className="col-lg-6 mb-3">
          <Header.h4 color={colors.black}>Our Mission</Header.h4>
          <div className="mb-3" />
          <p>
            Our concept combines variety, ambience, reliability,and a superior
            staff skill to create a sense of &apos;place&apos; in order to reach
            our goal of overall value in medical and pharmaceutical equipment
            supplies.. We strive to promote the steady progress of the
            enterprise not just with civilized management and scientific
            development but also by creating new situations for international
            development. Since the establishment of our company, we are
            constantly increasing the pace of integration, and our business
            continues to grow at a high speed. We will provide you with
            &quot;high quality, low price and high efficiency&quot; service with
            the concept of &quot;quality first, then credit&quot;. Only by
            casting excellent quality can we forge ahead in the fierce
            competition
          </p>
        </div>
        <div className="col-lg-6 mb-3">
          <ImageWrapper>
            <Image
              src={
                "https://www.undp.org/sites/g/files/zskgke326/files/migration/cn/f7ad68b10e23eddccb861364f12a204c3aa37073f6d79604bfb83f730119e976.JPG"
              }
              // src={
              //   "https://postgraduateeducation.hms.harvard.edu/sites/default/files/media/4.21.22_When%20working%20with.jpg"
              // }
              fill
              alt="Article Image"
              style={{
                objectFit: "cover",
              }}
            />
          </ImageWrapper>
        </div>
      </div>
    </div>
  );
};

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  border-radius: 20px;
  overflow: hidden;
`;
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;
  border-radius: 20px;
  overflow: hidden;
`;
export default AboutUs;
