import Image from "next/image"
import React from "react"
import Header from "./Header"
import { BsTrashFill } from "react-icons/bs"
import { MdOutlineAddCircle, MdRemoveCircle } from "react-icons/md"
import colors from "@/constants/colors"
import styled from "styled-components"

const CartItem = () => {
  return (
    <Container className='border-bottom pb-2 mb-2'>
      <div className='d-flex align-items-center'>
        <Image
          src={
            "https://ae01.alicdn.com/kf/H1aa80e9e8d7a46fba3831d790800b64ce/Portable-Single-Head-Stethoscope-Professional-Cardiology-Stethoscope-Doctor-Medical-Equipment-Student-Vet-Nurse-Medical-Device.jpg"
          }
          width={65}
          height={65}
          alt='Cart Item'
        />
        <div className='ml-2'>
          <Header.h6 color='#757B9C'>
            Universal Patient Monitor IntelliVue MP60 and MP70
          </Header.h6>
        </div>
      </div>

      <div className='mt-3 d-flex justify-content-between'>
        <div
          className='text-secondary fw-bold d-flex align-items-center'
          role='button'
        >
          <BsTrashFill size={20} color='#FF5454' />
          <span className='m-0'>Remove</span>
        </div>
        <div className='text-secondary fw-bold d-flex align-items-center'>
          <span className='m-0' role='button'>
            <MdRemoveCircle size={25} color={colors.secondary} />
          </span>
          <span className='m-0 mx-2'>1</span>
          <span className='m-0' role='button'>
            <MdOutlineAddCircle size={25} color={colors.primary} />
          </span>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  /* & :not(:last-child) {
    border-bottom: 1px solid ${colors.grey3};
  } */
`
export default CartItem
