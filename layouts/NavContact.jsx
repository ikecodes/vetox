import colors from "@/constants/colors"
import React from "react"
import { BsTelephoneFill, BsWhatsapp } from "react-icons/bs"
import styled from "styled-components"

const NavContact = () => {
  return (
    <Wrapper className=' mx-4 d-flex justify-content-end align-items-center flex-wrap'>
      <a href='tel:+2348170990461'>
        <span>
          <BsTelephoneFill size={12} />
          <span className='ms-1'>(+234) 817 099 0461</span>
        </span>
      </a>
      <Separator className='mx-2'>|</Separator>
      <a href='tel:+2348096434005'>
        <span>
          <BsTelephoneFill size={12} />
          <span className='ms-1'>(+234) 809 643 4005</span>
        </span>
      </a>

      <Separator className='mx-2'>|</Separator>
      <a
        target='_blank'
        href={`https://wa.me/+2349167186719?text=I would like to make enquiry about a product`}
      >
        <Whatsapp>
          <BsWhatsapp size={18} color={colors.primary} />
          <span className='ms-1'>Whatsapp Us</span>
        </Whatsapp>
      </a>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin-top: 0.5rem;
  & a {
    color: ${colors.primary};
    font-size: 0.9rem;
  }
  @media (max-width: 768px) {
    margin-top: 2.5rem;
  }
`

const Whatsapp = styled.span`
  font-size: 0.9rem;
  display: flex;
  align-items: center;
`
const Separator = styled.span`
  color: ${colors.primary};
`
export default NavContact
