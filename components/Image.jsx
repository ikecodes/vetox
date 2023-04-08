import React from "react";
import styled from "styled-components";

const Image = ({ src, h, unit, alt, rounded }) => {
  return (
    <ImageContainer h={h} unit={unit}>
      <Img src={src} alt={alt} rounded={rounded} />
    </ImageContainer>
  );
};
const ImageContainer = styled.div`
  height: ${(props) => `${props.h}${props.unit}`};
  width: 100%;
`;
const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: ${(props) => (props.rounded ? "2rem" : "0")};
`;
export default Image;
