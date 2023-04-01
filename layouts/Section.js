import colors from "@/constants/colors";
import React from "react";
import styled from "styled-components";
const Section = ({ children }) => {
  return <Container className='container'>{children}</Container>;
};
const Container = styled.section`
  color: ${colors.textColor};
`;
export default Section;
