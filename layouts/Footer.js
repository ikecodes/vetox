import React from "react";
import { FaLinkedinIn, FaTwitterSquare } from "react-icons/fa"
import { Form } from "react-bootstrap"
import styled from "styled-components"
import Link from "next/link"
import colors from "@/constants/colors"
import Image from "next/image"
import PrimaryBtn from "@/components/PrimaryBtn"
const Footer = () => {
  return (
    <Container>
      <div className='container'>
        <div className='row gap-4 gap-md-0'>
          <div className='col-lg-3'>
            <div>
              <Link href='/'>
                <div className='d-flex align-items-center'>
                  <Image
                    src='/logo2.svg'
                    alt='Vetox medical logo'
                    height='150'
                    width='150'
                  />
                  <LogoWrite className='ms-1'>
                    <h5 className='fw-bold'>Vetox Global</h5>
                    <h6 className='fw-light'>Medical Services </h6>
                  </LogoWrite>
                </div>
              </Link>
            </div>
            <p className='pt-4'>
              Our Medical Experts have tremendous experience with wide range of
              diseases to serve the needs of our clients.
            </p>
            <div>
              <div>
                <Link href={"/"}>
                  <FaLinkedinIn
                    size={30}
                    color={colors.white}
                    className='me-3'
                  />
                </Link>
                <Link href={"/"}>
                  <FaTwitterSquare size={30} color={colors.white} />
                </Link>
              </div>
              <p className='pt-4'>
                3 Grace Ave, Ajah, Lekki 479211, P.O.Box 8196 Lagos, Nigeria
                info@halomedicals.com
              </p>
            </div>
          </div>
          <div className='col-lg-3'>
            <List className='text-capitalize list-style-none'>
              <li className='mb-3 fw-bold'>products</li>
              <li className='mb-2'>
                <Link href='/about'>Laboratory Equipment</Link>
              </li>
              <li className='mb-2'>
                <Link href='/contact-us'>Operating Equipment</Link>
              </li>
              <li className='mb-2'>
                <Link href='/about'>Laboratory Equipment</Link>
              </li>
              <li className='mb-2'>
                <Link href='/contact-us'>Operating Equipment</Link>
              </li>
              <li className='mb-2'>
                <Link href='/about'>Laboratory Equipment</Link>
              </li>
              <li className='mb-2'>
                <Link href='/contact-us'>Operating Room/Theatre Equipment</Link>
              </li>
            </List>
          </div>
          <div className='col-lg-3'>
            <List className='text-capitalize'>
              <li className='mb-3 fw-bold'>Company</li>
              <li className='mb-2'>
                <Link href='/about'>About us</Link>
              </li>
              <li className='mb-2'>
                <Link href='/contact-us'>Careers 🚀</Link>
              </li>
              <li className='mb-2'>
                <Link href='/about'>Company Overview</Link>
              </li>
              <li className='mb-2'>
                <Link href='/contact-us'>Our Vision</Link>
              </li>
            </List>
          </div>
          <div className='col-lg-3'>
            <h5 className='p-0 m-0 mb-1'>Subscribe to our newsletter</h5>
            <div className='d-flex'>
              <Form.Control
                type='email'
                placeholder='Enter email address'
                className='rounded w-100 d-block'
                aria-describedby='Input your email'
              />
            </div>
            <div className='text-end mt-1'>
              <PrimaryBtn title='subscribe' primary semirounded />
            </div>
          </div>
        </div>
      </div>
      <div className='text-center text-capitalize border-top mx-5'>
        <p className='m-0 pt-5 pb-2 text-capitalize'>
          Vetox Global Medical Services &copy;2023
        </p>
      </div>
    </Container>
  )
}

const Container = styled.footer`
  margin-top: 4rem;
  padding-top: 5rem;
  color: ${colors.white};
  background-color: ${colors.tertiary};
  background-image: linear-gradient(
    to top right,
    ${colors.tertiary},
    ${colors.primary} 200%
  );

  & a,
  a:link {
    color: ${colors.white};
    text-decoration: none;
  }
  & a:hover,
  a:active {
    color: ${colors.primary};
  }
`;

const LogoWrite = styled.div`
  h5,
  h6 {
    color: ${colors.white};
    margin: 0;
    padding: 0;
  }
`;

const List = styled.ul`
  list-style: none;

  li {
    padding: 0;
    margin: 0;
  }
`;

export default Footer;
