import colors from "@/constants/colors";
import React, { useState } from "react";
import { MdArrowDropDown } from "react-icons/md";
import Link from "next/link";
import styled from "styled-components";
const NavItemLg = ({ menu }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      className='position-relative'
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      <NavItem>
        <Link href={menu.path}>{menu.name}</Link>
        {menu.sub.length > 0 && (
          <MdArrowDropDown size={20} color={colors.primary} />
        )}
      </NavItem>
      {menu.sub.length > 0 && (
        <ContainerMenu className={` shadow px-3 py-1 ${show ? "hovered" : ""}`}>
          {menu.sub.map((item) => (
            <ContainerItem className='my-3' key={item.id}>
              <Link href={item.path}>{item.name}</Link>
            </ContainerItem>
          ))}
        </ContainerMenu>
      )}
    </div>
  );
};

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
`;
const ContainerMenu = styled.ul`
  list-style: none;
  position: absolute;
  z-index: 100;
  width: 170px;
  background-color: ${colors.white};
  border-radius: 10px;
  left: -50%;
  visibility: hidden;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.3s ease-in;
  &.hovered {
    visibility: visible;
    opacity: 1;
    transform: translateY(0);
  }
`;
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
    color: ${colors.primary}; // <Thing> when hovered
  }
`;
export default NavItemLg;
