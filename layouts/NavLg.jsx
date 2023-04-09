import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import NavItemLg from "./NavItemLg";
import menus from "@/constants/menus";
import colors from "@/constants/colors";
import { MdOutlineArrowRightAlt } from "react-icons/md";
import { FiShoppingCart, FiLogOut } from "react-icons/fi";
import PrimaryBtn from "@/components/PrimaryBtn";
import SecondaryBtn from "@/components/SecondaryBtn";
import { FaShoppingCart } from "react-icons/fa";

const NavbarLg = () => {
  return (
    <NavContainer className='py-2'>
      <div className='container'>
        <div className='row align-items-center'>
          <div className='col-lg-8 d-flex align-items-center'>
            <Link href='/'>
              <div className='d-flex align-items-center'>
                <Image
                  src='/logo1.svg'
                  alt='Vetox medical logo'
                  height='100'
                  width='100'
                />
                <LogoWrite className='ms-1'>
                  <h5 className='fw-bold'>Vetox Global</h5>
                  <h6 className='fw-light'>Medical Services </h6>
                </LogoWrite>
              </div>
            </Link>

            <NavMenu className='ms-5'>
              <ul className='d-flex gap-5 align-items-center'>
                {menus.map((menu) => (
                  <NavItemLg key={menu.id} menu={menu} />
                ))}
              </ul>
            </NavMenu>
          </div>
          <div className='col-lg-4'>
            <NavMenu>
              <ul className='d-flex justify-content-end gap-5 align-items-center'>
                <Link href={"/login"}>
                  <SecondaryBtn
                    primary
                    title={"sign-in"}
                    icon={
                      <FiShoppingCart
                        color={colors.headerColor}
                        size={20}
                        className='me-1'
                      />
                    }
                  />
                </Link>
                <Link href={"/sign-up"}>
                  <PrimaryBtn
                    primary
                    title={"Signup free"}
                    icon={
                      <MdOutlineArrowRightAlt
                        color={colors.white}
                        size={20}
                        className='ms-1'
                      />
                    }
                  />
                </Link>
              </ul>
            </NavMenu>
          </div>
        </div>
      </div>
      <div className='border-bottom mx-5'></div>
    </NavContainer>
  )
};

const NavContainer = styled.nav`
  width: 100%;
  z-index: 90;
  a {
    text-decoration: none;
  }
`;
const NavMenu = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;
const LogoWrite = styled.div`
  h5,
  h6 {
    color: ${colors.primary};
    margin: 0;
    padding: 0;
  }
`;

export default NavbarLg;
