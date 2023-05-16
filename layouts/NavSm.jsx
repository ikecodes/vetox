import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components"
import { FaTimes } from "react-icons/fa"
import menus from "@/constants/menus"
import colors from "@/constants/colors"
import { TbMenu } from "react-icons/tb"
import { BsCart, BsThreeDotsVertical } from "react-icons/bs"
import { BiLogInCircle } from "react-icons/bi"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { toast } from "react-toastify"
import { setUser } from "@/slices/userSlice"
import { categories } from "@/constants/categories"
import slugify from "slugify"

const NavSm = () => {
  const [active, setActive] = useState("")
  const router = useRouter()
  const dispatch = useDispatch()
  const { value, cartNumber } = useSelector((state) => state.user)
  function logout() {
    dispatch(setUser(null))
    toast.success("Signout successful")
    router.push("/")
  }
  const [isAnimating, setIsAnimating] = useState(false)
  const [showOptions, setShowOptions] = useState(false)

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
    <>
      <div className='position-relative'>
        <MenuIcon onClick={() => setIsAnimating(true)}>
          <TbMenu size={30} color={colors.primary} />
        </MenuIcon>
        <OptionsIcon onClick={() => setShowOptions((prev) => !prev)}>
          <BsThreeDotsVertical size={30} color={colors.primary} />
        </OptionsIcon>
        <OptionsBox
          className={showOptions ? "clicked shadow p-3" : "shadow p-3"}
        >
          <Link href={"/cart"}>
            <div className='mb-4 d-flex align-items-center'>
              <div className='position-relative'>
                <Cart className='bg-danger'>
                  <span>{cartNumber ?? 0}</span>
                </Cart>
                <BsCart size={25} color={colors.primary} />
              </div>
              <h6 className='m-0 ms-2'>Cart</h6>
            </div>
          </Link>

          {value ? (
            <div className='d-flex align-items-center' onClick={logout}>
              <BiLogInCircle size={25} color={colors.primary} />
              <h6 className='m-0 ms-2'>Signout</h6>
            </div>
          ) : (
            <Link href={"/sign-in"}>
              <div className='d-flex align-items-center'>
                <BiLogInCircle size={25} color={colors.primary} />
                <h6 className='m-0 ms-2'>SignIn</h6>
              </div>
            </Link>
          )}
        </OptionsBox>
      </div>

      <AnimatingContainer
        className={isAnimating ? "clicked" : ""}
        onClick={(e) => setIsAnimating(false)}
      >
        <NavContainer onClick={(e) => e.stopPropagation()}>
          {menus.map((menu) => (
            <>
              {menu.name === "products" ? (
                <div className='ms-2' key={menu.id}>
                  <Heading>
                    <Link href={menu.path}>{menu.name}</Link>
                  </Heading>
                  <List className='m-0'>
                    <li>
                      <Link href={"/products"}>All products</Link>
                    </li>
                  </List>
                  <div>
                    {categories.map((value, i) => (
                      <div key={i}>
                        <List>
                          <li
                            onClick={() => {
                              if (value.subCategory.length > 0) {
                                if (active === value.category)
                                  return setActive("")
                                setActive(value.category)
                              } else {
                                navigateWithCategory(value.category)
                              }
                            }}
                          >
                            {value.category}
                          </li>
                        </List>
                        <SubList
                          className={`${
                            active === value.category ? "open" : " "
                          }`}
                        >
                          {value.subCategory.length > 0 &&
                            value.subCategory.map((sub, i) => (
                              <li
                                className='text-wrap'
                                onClick={() => navigateWithSubCategory(sub)}
                                key={i}
                              >
                                {sub}
                              </li>
                            ))}
                        </SubList>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className='ms-4' key={menu.id}>
                  <Heading>
                    <Link href={menu.path}>{menu.name}</Link>
                  </Heading>

                  <List>
                    {menu.sub.length > 0 &&
                      menu.sub.map((item) => (
                        <li key={item.id}>
                          <Link href={item.path}>{item.name} </Link>{" "}
                        </li>
                      ))}
                  </List>
                </div>
              )}
            </>
          ))}

          <CloseIcon onClick={() => setIsAnimating(false)}>
            <FaTimes size={30} color={colors.white} />
          </CloseIcon>
        </NavContainer>
      </AnimatingContainer>
    </>
  )
}

const OptionsIcon = styled.span`
  position: absolute;
  top: 1rem;
  z-index: 100;
  font-weight: 700;
  right: 0.5rem;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`
const MenuIcon = styled.span`
  position: absolute;
  top: 1rem;
  z-index: 100;
  font-weight: 700;
  right: 3.5rem;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`

const OptionsBox = styled.div`
  position: absolute;
  right: 2rem;
  top: 50px;
  border-radius: 10px;
  opacity: 0;
  z-index: 100;
  background-color: ${colors.white};
  transition: all 0.3s ease-in;
  & a {
    text-decoration: none !important;
  }
  & h6 {
    color: ${colors.black};
  }
  &.clicked {
    opacity: 1;
  }
`
const Cart = styled.span`
  position: absolute;
  right: -8px;
  top: -8px;
  height: 18px;
  width: 18px;
  display: grid;
  font-size: 1rem;
  place-content: center;
  color: ${colors.white};
  border-radius: 50%;
`
const CloseIcon = styled.span`
  position: absolute;
  top: 1.5rem;
  z-index: 100;
  right: 6rem;
`

const AnimatingContainer = styled.div`
  display: none;
  position: fixed;
  width: 100%;
  height: 100vh;
  z-index: 100;
  background-color: rgb(0, 0, 0, 0.3);
  transform: translateX(100%);
  transition: all 0.3s ease-in;
  &.clicked {
    transform: translateX(0);
  }
  @media (max-width: 768px) {
    display: block;
  }
`
const NavContainer = styled.div`
  padding-top: 10rem;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background: ${colors.secondary};
  position: absolute;
  color: ${colors.white};
  margin: auto;
  text-transform: capitalize;
  transform: translateX(20%);
  gap: 0.5rem;
  & li {
    margin: 1rem 0;
  }
`
const Heading = styled.h4`
  color: ${colors.primary};
  text-transform: uppercase;
  font-weight: bold;
  margin: 0;
  & a,
  a:link {
    color: ${colors.primary};
    text-decoration: none;
  }
`
const List = styled.ul`
  padding-left: 10px;
  & li {
    font-weight: 500;
    color: ${colors.black};
    text-decoration: none;
    margin: 0.5rem 0;
  }
  & a,
  a:link {
    color: ${colors.black};
    text-decoration: none;
  }
`
const SubList = styled.ul`
  display: none;
  list-style: circle;
  /* padding-left: 40px; */
  & li {
    color: ${colors.black};
    word-break: break-all;
    margin: 0.5rem 0;
  }
  & a,
  a:link {
    color: ${colors.black};
    text-decoration: none;
  }
  &.open {
    display: block;
  }
`
export default NavSm;

  //  <Accordion>
  //    {categories.map((value, i) => (
  //      <Accordion.Item key={i} eventKey={i}>
  //        <Accordion.Header>
  //          <span
  //            onClick={() => {
  //              if (value.subCategory.length > 0) {
  //                return
  //              } else {
  //                navigateWithCategory(value.category)
  //              }
  //            }}
  //          >
  //            {value.category}
  //          </span>
  //        </Accordion.Header>
  //        {value.subCategory.length > 0 &&
  //          value.subCategory.map((sub, i) => (
  //            <Accordion.Body
  //              onClick={() => navigateWithSubCategory(sub)}
  //              key={i}
  //            >
  //              {sub}
  //            </Accordion.Body>
  //          ))}
  //      </Accordion.Item>
  //    ))}
  //  </Accordion>