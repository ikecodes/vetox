import colors from "@/constants/colors"
import React, { useState } from "react"
import styled from "styled-components"
import Header from "./Header"
import { categories } from "@/constants/categories"
import slugify from "slugify"

const Categories = ({
  categorySlug,
  subCategorySlug,
  setCategorySlug,
  setSubCategorySlug,
}) => {
  const [active, setActive] = useState("")
  function reset(value) {
    setActive(value)
    setCategorySlug("")
    setSubCategorySlug("")
  }
  function onCategoryClick(value) {
    setActive(value)
    setCategorySlug(slugify(value, "-"))
    setSubCategorySlug("")
  }
  function onSubCategoryClick(value) {
    // setActive(value)
    setSubCategorySlug(slugify(value, "-"))
    setCategorySlug("")
  }
  return (
    <Container>
      <Header.h5 color={colors.black} normal>
        Categories
      </Header.h5>
      <div className='mb-3' />
      <h6
        onClick={() => reset("All")}
        style={{
          color:
            !categorySlug && !subCategorySlug ? colors.primary : colors.black,
          cursor: "pointer",
        }}
      >
        All
      </h6>
      {categories.map((value, i) => (
        <Category key={i} className='my-1'>
          <h6
            onClick={() => onCategoryClick(value.category)}
            style={{
              color:
                categorySlug === slugify(value.category, "-")
                  ? colors.primary
                  : colors.black,
            }}
          >
            {value.category}
          </h6>
          <List className={`${active === value.category ? "open" : " "}`}>
            <div>
              {value.subCategory.map((value, i) => (
                <li
                  style={{
                    color:
                      subCategorySlug === slugify(value, "-")
                        ? colors.primary
                        : colors.black,
                  }}
                  onClick={() => onSubCategoryClick(value)}
                  key={i}
                >
                  {value}
                </li>
              ))}
            </div>
          </List>
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

const List = styled.ul`
  list-style: circle;
  display: none;

  &.open {
    display: flex;
  }
`
export default Categories
