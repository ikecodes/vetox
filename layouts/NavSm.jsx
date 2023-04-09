import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
// import { RiMenu4Fill } from "react-icons/ri";
import { FaTimes } from "react-icons/fa";
import menus from "@/constants/menus";
import colors from "@/constants/colors";
import { FiMenu } from "react-icons/fi";
const NavSm = () => {
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <>
      <OpenIcon onClick={() => setIsAnimating(true)}>
        <FiMenu size={40} color={colors.primary} />
      </OpenIcon>
      <AnimatingContainer
        className={isAnimating ? "clicked" : ""}
        onClick={(e) => setIsAnimating(false)}
      >
        <NavContainer onClick={(e) => e.stopPropagation()}>
          {menus.map((menu) => (
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
          ))}

          <CloseIcon onClick={() => setIsAnimating(false)}>
            <FaTimes size={30} color={colors.white} />
          </CloseIcon>
        </NavContainer>
      </AnimatingContainer>
    </>
  );
};

const OpenIcon = styled.span`
  position: absolute;
  top: 1rem;
  z-index: 100;
  font-weight: 700;
  right: 1.5rem;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;
const CloseIcon = styled.span`
  position: absolute;
  top: 1.5rem;
  z-index: 100;
  right: 6rem;
`;

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
`;
const NavContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100vh;
  background: ${colors.tertiary};
  position: absolute;
  color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-transform: capitalize;
  transform: translateX(20%);
  gap: 2rem;
  & li {
    margin: 1rem 0;
  }
`;
const Heading = styled.h6`
  color: ${colors.primary};
  text-transform: uppercase;
  font-weight: bold;
  & a,
  a:link {
    color: ${colors.primary};
    text-decoration: none;
  }
`;
const List = styled.ul`
  & a,
  a:link {
    color: ${colors.white};
    text-decoration: none;
  }
`;
export default NavSm;
