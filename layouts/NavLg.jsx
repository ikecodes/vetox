import React from "react";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import NavItemLg from "./NavItemLg";
import menus from "@/constants/menus";
import colors from "@/constants/colors";
import { MdOutlineArrowRightAlt } from "react-icons/md"
import PrimaryBtn from "@/components/PrimaryBtn"
import SecondaryBtn from "@/components/SecondaryBtn"
import {
  RiLoginCircleFill,
  RiLogoutCircleRFill,
  RiShoppingCartFill,
} from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/slices/userSlice"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import NavContact from "./NavContact"

const NavbarLg = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { value } = useSelector((state) => state.user)
  function logout() {
    dispatch(setUser(null))
    toast.success("Signout successful")
    router.push("/")
  }
  return (
    <NavContainer className='py-2'>
      <NavContact />
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
                {value ? (
                  <SecondaryBtn
                    primary
                    title={"Signout"}
                    handleClick={logout}
                    icon={
                      <RiLogoutCircleRFill
                        color={colors.primary}
                        size={25}
                        className='me-1'
                      />
                    }
                  />
                ) : (
                  <Link href={"/sign-in"}>
                    <SecondaryBtn
                      primary
                      title={"Login"}
                      icon={
                        <RiLoginCircleFill
                          color={colors.primary}
                          size={25}
                          className='me-1'
                        />
                      }
                    />
                  </Link>
                )}
                {value ? (
                  <Link href={"/cart"}>
                    <PrimaryBtn
                      primary
                      title={"Your Cart"}
                      icon={
                        <RiShoppingCartFill
                          color={colors.white}
                          size={20}
                          className='ms-1'
                        />
                      }
                    />
                  </Link>
                ) : (
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
                )}
              </ul>
            </NavMenu>
          </div>
        </div>
      </div>
      <div className='border-bottom mx-5'></div>
    </NavContainer>
  )
}

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
