import React from "react";
import { FaLinkedinIn, FaTwitterSquare } from "react-icons/fa"
import { Form } from "react-bootstrap"
import styled from "styled-components"
import Link from "next/link"
import colors from "@/constants/colors"
import Image from "next/image"
import PrimaryBtn from "@/components/PrimaryBtn"
import { categories } from "@/constants/categories"
import { useRouter } from "next/router"
import slugify from "slugify"
const Footer = () => {
  const router = useRouter()

  function navigateWithCategory(category) {
    router.push(
      {
        pathname: "/products",
        query: { category: slugify(category, "-") },
      },
      "/products"
    )
  }

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
                info@vetoxmedicals.com
              </p>
            </div>
          </div>
          <div className='col-lg-3'>
            <List className='text-capitalize list-style-none'>
              <li className='mb-3 fw-bold'>products</li>
              {categories.map((value, i) => (
                <li key={i} className='mb-2'>
                  <span onClick={() => navigateWithCategory(value.category)}>
                    {value.category}
                  </span>
                </li>
              ))}
              {/* 
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
              </li> */}
            </List>
          </div>
          <div className='col-lg-3'>
            <List className='text-capitalize'>
              <li className='mb-3 fw-bold'>Company</li>
              <li className='mb-2'>
                <Link href='/about-us'>About Vetox Medical Global</Link>
              </li>
              <li className='mb-2'>
                <Link href='/contact-us'>Contact Us 👋</Link>
              </li>
            </List>
          </div>
          <Subscribe className='col-lg-3 col-sm-6 mb-5'>
            <h5 className='p-0 m-0 mb-1'>Subscribe to our newsletter</h5>
            <div className='d-flex'>
              <Form.Control
                type='email'
                placeholder='Enter email address'
                className='rounded w-100 d-block'
                aria-describedby='Input your email'
              />
            </div>
            <ButtonWrapper className='mt-1'>
              <PrimaryBtn title='subscribe' primary semirounded />
            </ButtonWrapper>
          </Subscribe>
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

  & span {
    cursor: pointer;
  }
  & span:hover {
    color: ${colors.primary};
  }

  & a,
  a:link {
    color: ${colors.white};
    text-decoration: none;
  }

  & a:hover,
  a:active {
    color: ${colors.primary};
  }
`

const LogoWrite = styled.div`
  h5,
  h6 {
    color: ${colors.white};
    margin: 0;
    padding: 0;
  }
`

const List = styled.ul`
  list-style: none;

  @media (max-width: 768px) {
    padding: 0;
  }

  li {
    padding: 0;
    margin: 0;
  }
`
const ButtonWrapper = styled.div`
  text-align: end;
  @media (max-width: 768px) {
    text-align: start;
  }
`
const Subscribe = styled.div`
  @media (max-width: 768px) {
    width: 70%;
  }
`

export default Footer;
