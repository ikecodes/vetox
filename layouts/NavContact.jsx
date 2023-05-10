import colors from "@/constants/colors"
import React from "react"
import { BsTelephoneFill } from "react-icons/bs"
import styled from "styled-components"

const NavContact = () => {
  return (
    <Wrapper className='mt-2 me-4 d-flex justify-content-end align-items-center'>
      <Phone>
        <BsTelephoneFill size={12} />
        <span className='ms-1'>(+234) 817 099 0461</span>
      </Phone>
      <Separator className='mx-2'>|</Separator>
      <Phone>
        <BsTelephoneFill size={12} />
        <span className='ms-1'>(+234) 809 643 4005</span>
      </Phone>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  /* @media (max-width: 768px) {
    display: none;
    opacity: 0;
  } */
`
const Phone = styled.span`
  font-size: 0.9rem;
  color: ${colors.primary};
  cursor: pointer;
`
const Separator = styled.span`
  color: ${colors.primary};
`
export default NavContact
