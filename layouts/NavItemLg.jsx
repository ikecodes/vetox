import colors from "@/constants/colors";
import React, { useEffect, useState } from "react"
import { MdArrowDropDown } from "react-icons/md"
import Link from "next/link"
import styled from "styled-components"
import { categories } from "@/constants/categories"
import { useRouter } from "next/router"
import slugify from "slugify"
const NavItemLg = ({ menu }) => {
  const router = useRouter()
  const [activeCategory, setActiveCategory] = useState("")
  const [show, setShow] = useState(false)
  const [showSubMenu, setShowSubMenu] = useState(false)
  const [subCategories, setSubCategories] = useState([])

  useEffect(() => {
    getSubCategories()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  function getSubCategories() {
    const foundSubCategory = categories.find(
      (value) => value.category === activeCategory
    )
    if (foundSubCategory && foundSubCategory.subCategory.length > 0) {
      setSubCategories(foundSubCategory.subCategory)
    } else {
      setSubCategories([])
      setActiveCategory("")
    }
  }

  function navigateWithCategory(category) {
    router.push(
      {
        pathname: "/products",
        query: { category: slugify(category, "-") },
      },
      "/products"
    )
  }
  function navigateWithSubCategory(subCategory) {
    router.push(
      {
        pathname: "/products",
        query: { subCategory: slugify(subCategory, "-") },
      },
      "/products"
    )
  }
  return (
    <Wrapper
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {menu.name === "products" ? (
        <>
          <NavItem>
            <Link href={menu.path}>{menu.name}</Link>
            <MdArrowDropDown size={20} color={colors.primary} />
          </NavItem>
          <ContainerMenu
            className={` shadow px-3 py-1 ${show ? "hovered" : ""}`}
          >
            <ContainerItem className='my-3'>
              <a
                onClick={() => router.push("/products")}
                onMouseEnter={() => {
                  setActiveCategory("All")
                  setShowSubMenu(true)
                }}
              >
                View all products
              </a>
            </ContainerItem>
            {categories.map((item, i) => (
              <ContainerItem className='my-3' key={i}>
                <a
                  onClick={() => navigateWithCategory(item.category)}
                  onMouseEnter={() => {
                    setActiveCategory(item.category)
                    setShowSubMenu(true)
                  }}
                >
                  {item.category}
                </a>
              </ContainerItem>
            ))}
            {subCategories.length > 0 && (
              <SubContainerMenu
                onMouseEnter={() => setShow(true)}
                onMouseLeave={() => {
                  setShowSubMenu(false)
                  setShow(false)
                }}
                className={` shadow px-3 py-1 ${showSubMenu ? "hovered" : ""}`}
              >
                {subCategories.map((value, i) => (
                  <ContainerItem className='my-3' key={i}>
                    <a onClick={() => navigateWithSubCategory(value)}>
                      {value}
                    </a>
                  </ContainerItem>
                ))}
              </SubContainerMenu>
            )}
          </ContainerMenu>
        </>
      ) : (
        <>
          <NavItem>
            <Link href={menu.path}>{menu.name}</Link>
            {menu.sub.length > 0 && (
              <MdArrowDropDown size={20} color={colors.primary} />
            )}
          </NavItem>
          {menu.sub.length > 0 && (
            <ContainerMenu
              className={` shadow px-3 py-1 ${show ? "hovered" : ""}`}
            >
              {menu.sub.map((item) => (
                <ContainerItem className='my-3' key={item.id}>
                  <Link href={item.path}>{item.name}</Link>
                </ContainerItem>
              ))}
            </ContainerMenu>
          )}
        </>
      )}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  position: relative;
  height: 100%;

  /* width: 100%; */
`
const NavItem = styled.li`
  font-weight: 500;
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: capitalize;
  cursor: pointer;
  & a {
    color: ${colors.headerColor};
    text-decoration: none;
  }
  & a:hover,
  a:active {
    color: ${colors.primary}; // <Thing> when hovered
  }
  &:hover {
    color: ${colors.primary}; // <Thing> when hovered
  }
`
const ContainerMenu = styled.ul`
  list-style: none;
  position: absolute;
  z-index: 100;
  background-color: ${colors.white};
  border-radius: 10px;
  left: -50%;
  transform: translateY(20px);
  transition: all 0.3s ease-in;
  visibility: hidden;
  opacity: 0;
  &.hovered {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
`
const SubContainerMenu = styled.ul`
  list-style: none;
  position: absolute;
  z-index: 100;
  background-color: ${colors.white};
  border-radius: 10px;
  top: 50px;
  left: 102%;
  transform: translateY(20px);
  transition: all 0.3s ease-in;
  visibility: hidden;
  opacity: 0;
  &.hovered {
    visibility: visible;
    opacity: 1;
    /* transform: translateY(0); */
  }
`
const ContainerItem = styled.li`
  white-space: nowrap;
  font-size: 0.9rem;
  text-transform: capitalize;
  font-weight: 500;
  cursor: pointer;
  & a {
    color: ${colors.black};
    text-decoration: none;
  }
  & a:hover,
  a:active {
    color: ${colors.primary} !important; // <Thing> when hovered
  }
`
export default NavItemLg;
