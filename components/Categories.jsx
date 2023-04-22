import colors from "@/constants/colors"
import React from "react"
import styled from "styled-components"
import Header from "./Header"
import { categories } from "@/constants/categories"

const Categories = () => {
  return (
    <Container>
      <Header.h5 color={colors.black} normal>
        Categories
      </Header.h5>
      <div className='mb-3' />

      {categories.map((value, i) => (
        <Category key={i} className='my-1'>
          <h6>{value.category}</h6>
          <ul>
            {value.subCategory.map((value, i) => (
              <li key={i}>{value}</li>
            ))}
          </ul>
        </Category>
      ))}
    </Container>
  )
}

const Container = styled.div`
  padding: 1rem;
  background-color: ${colors.grey4};
  width: 100%;
  border-radius: 10px;
`
const Category = styled.div`
  & ul {
    list-style: circle;
  }
  & h6 {
    cursor: pointer;
    transition: all 0.5s ease-out;
    &:hover {
      color: ${colors.primary};
      transform: scale(1.02);
    }
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
