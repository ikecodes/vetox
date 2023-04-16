import React, { useEffect } from "react"
import styled from "styled-components"
import Image from "next/image"
import { RiArrowDropDownFill, RiArrowDropRightFill } from "react-icons/ri"
import { useSelector } from "react-redux"
import { handleMenu, resetMenu } from "@/slices/navSlice"
import { useDispatch } from "react-redux"
import { adminMenu } from "@/constants/menus"
import Link from "next/link"
import colors from "@/constants/colors"
import { useRouter } from "next/router"

const Sidebar = () => {
  const dispatch = useDispatch()
  const { asPath } = useRouter()
  const { active, showSub } = useSelector((state) => state.nav)

  useEffect(() => {
    setActive(asPath)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [asPath])

  function setActive(path) {
    dispatch(handleMenu(path.split("/")[2]))
  }

  return (
    <Container>
      <Link href='/admin/dashboard' className='text-decoration-none'>
        <div className='mb-3 mt-1 d-flex align-items-center'>
          <Image src={"/logo2.svg"} height={70} width={70} alt='Vetox logo' />
        </div>
      </Link>
      <Menu>
        {adminMenu.map((item, i) => (
          <>
            <li key={i}>
              {item.sub.length > 0 ? (
                <DropLink
                  className={`${active === item.name ? "active" : ""}`}
                  // onClick={() => dispatch(handleMenu(item.name))}
                  role='button'
                >
                  <div className='d-flex justify-content-between align-items-center'>
                    <div className='d-flex justify-content-start align-items-center'>
                      <span>{item.icon}</span>
                      <span className='mt-1'>{item.name}</span>
                    </div>
                    {showSub && active === item.name ? (
                      <RiArrowDropDownFill size={25} className='mt-1' />
                    ) : (
                      <RiArrowDropRightFill size={25} className='mt-1' />
                    )}
                  </div>
                </DropLink>
              ) : (
                <Link
                  href={item.path}
                  className={`${active === item.name ? "active" : ""}`}
                  // onClick={() => dispatch(handleMenu(item.name))}
                >
                  <div className='d-flex justify-content-start align-items-center'>
                    <span>{item.icon}</span>
                    <span className='mt-1'>{item.name}</span>
                  </div>
                </Link>
              )}
            </li>
            {item.sub.length > 0 && (
              <SubMenu
                className={`gap-2 ${
                  showSub && active === item.name ? "showSub" : ""
                }`}
                length={item.sub.length}
              >
                {item.sub.map((subItem, i) => (
                  <Link
                    key={i}
                    href={subItem.path}
                    // className={({ isActive }) => (isActive ? "active" : "")}
                  >
                    <span className='mt-1' key={subItem.id}>
                      {subItem.name}
                    </span>
                  </Link>
                ))}
              </SubMenu>
            )}
          </>
        ))}
      </Menu>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow-y: scroll;
  &::-webkit-scrollbar-track {
    box-shadow: none;
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    outline: none;
  }
  height: 100vh;
  padding: 2rem 0;
  background-color: ${colors.tertiary};
`
const SubMenu = styled.div`
  display: flex;
  height: 0;
  transform: scaleY(0);
  transform-origin: top;
  flex-direction: column;
  width: 100%;
  margin-left: 3rem;
  transition: all 0.3s ease-in-out;
  &.showSub {
    height: ${(props) => `${props.length * 2.5}rem`};
    transform: scaleY(1);
  }
  & span {
    font-size: 0.8rem;
  }
  & a,
  a:link {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
    padding: 0.3rem;
    width: 100%;
    transition: all 0.3s ease-in;
  }
  & a:hover {
    color: ${colors.white};
  }
  & a.active {
    color: ${colors.white};
  }
`
const DropLink = styled.a``
const Menu = styled.ul`
  color: ${colors.white};
  text-transform: capitalize;
  width: 100%;
  & li {
    position: relative;
    display: flex;
    font-size: 1rem;
    font-weight: 500;
    text-transform: capitalize;
    margin: 0;
    & span {
      margin-left: 1rem;
    }
    & a,
    a:link {
      text-decoration: none;
      color: rgba(255, 255, 255, 0.5);
      padding: 0.6rem;
      width: 100%;
      transition: all 0.3s ease-in;
    }
    & a:hover {
      background-color: ${colors.secondary};
      color: ${colors.white};
    }
    & a.active {
      background-color: ${colors.primary};
      color: ${colors.white};
    }
  }
  & li:not(:last-child) {
    margin-bottom: 0.5rem;
  }
`

export default Sidebar
