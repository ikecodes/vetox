import colors from "@/constants/colors"
import React from "react"
import styled from "styled-components"
import Header from "./Header"

const Categories = () => {
  return (
    <Container>
      <Header.h5 color={colors.black} normal>
        Categories
      </Header.h5>
      <div className='mb-3' />

      <Category className='my-1'>
        <Header.h6 color={colors.primary} normal>
          Medical Consumables
        </Header.h6>
        <ul>
          <li>Accident & Emergency</li>
          <li>Anesthesiology</li>
          <li>Cardiology</li>
          <li>Cryosurgery</li>
          <li>Dental Unit</li>
          <li>Dermatology</li>
          <li>Cryosurgery</li>
        </ul>
      </Category>
      <Category className='my-1'>
        <Header.h6 color={colors.primary} normal>
          Medical Furniture
        </Header.h6>
        <ul>
          <li>Bed</li>
          <li>Wheel chair</li>
          <li>Cardiology</li>
          <li>Cryosurgery</li>
          <li>Dental Unit</li>
          <li>Dermatology</li>
          <li>Stretcher</li>
        </ul>
      </Category>
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
  background-color: ${colors.secondary};
  width: 100%;
  height: 100%;
  border-radius: 20px;
`
const Category = styled.div`
  & ul {
    list-style: disc;
  }
  & li {
    cursor: pointer;
    margin: 0.5rem 0;
    transition: all 0.5s ease-out;
    &:hover {
      color: ${colors.primary};
      transform: scale(1.02);
    }
  }
`

export default Categories
