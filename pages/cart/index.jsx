import CartItem from "@/components/CartItem"
import EmptyState from "@/components/EmptyState"
import Header from "@/components/Header"
import colors from "@/constants/colors"
import { currencyFormatter } from "@/utils/helpers"
import Image from "next/image"
import React, { useState } from "react"
import { BsTrashFill } from "react-icons/bs"
import { MdOutlineAddCircle, MdRemoveCircle } from "react-icons/md"
import styled from "styled-components"

const Cart = () => {
  const [cart, setCart] = useState(["1"])
  return (
    <div className='container mt-5'>
      <div>
        {cart.length > 0 && (
          <div className='text-center my-5'>
            <Header.h4 color={colors.black}>Your Cart</Header.h4>
          </div>
        )}
        {cart.length === 0 ? (
          <EmptyState />
        ) : (
          <div className='row gap-5 mt-5'>
            <div className='col-lg-8 shadow rounded p-3'>
              <CartItem />
              <CartItem />
            </div>
            <div className='col-lg-3 shadow rounded p-3'>
              <div className='border-bottom pb-2'>
                <Header.h4 normal color={colors.grey3}>
                  Cart (3)
                </Header.h4>
              </div>
              <div className='mb-5 mt-3'>
                <Header.h6 normal color={colors.black}>
                  Total
                </Header.h6>
                <div className='mb-1' />
                <Header.h3 color='#555454'>
                  {currencyFormatter(50000)}
                </Header.h3>
              </div>
              <CheckoutBtn>Checkout</CheckoutBtn>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

const CheckoutBtn = styled.button`
  cursor: pointer;
  background-color: ${colors.primary};
  padding: 20px 100px;
  border-radius: 10px;
  color: ${colors.white};
  font-weight: bold;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.05);
  }
`
export default Cart
