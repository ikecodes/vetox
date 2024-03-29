import CartItem from "@/components/CartItem"
import EmptyState from "@/components/EmptyState"
import Header from "@/components/Header"
import Loader from "@/components/Loader"
import colors from "@/constants/colors"
import { useGetCarts } from "@/hooks/cart.hook"
import { setCartNumber } from "@/slices/userSlice"
import { currencyFormatter } from "@/utils/helpers"
import Image from "next/image"
import React, { useEffect, useMemo, useState } from "react"
import { useDispatch } from "react-redux"
import styled from "styled-components"

const Cart = () => {
  const dispatch = useDispatch()
  const { data, isLoading } = useGetCarts()
  const [cartItems, setCartItems] = useState([])

  useEffect(() => {
    if (data && data?.data?.data.length > 0) {
      setCartItems(data?.data?.data)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    loadCartNumber()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartItems])

  function loadCartNumber() {
    dispatch(setCartNumber(cartItems.length))
  }
  const totalPrice = useMemo(() => {
    return cartItems.reduce((acc, cur) => {
      acc = acc + cur.product.price * cur.quantity
      return acc
    }, 0)
  }, [cartItems])
  return (
    <div className='container mt-5'>
      {isLoading ? (
        <div className='my-5'>
          <Loader />
        </div>
      ) : (
        <div>
          {cartItems.length > 0 && (
            <div className='text-center my-5'>
              <Header.h4 color={colors.black}>Your Cart</Header.h4>
            </div>
          )}
          {cartItems.length === 0 ? (
            <EmptyState
              btn
              image={
                <Image
                  src={"/emptyCart.svg"}
                  width={200}
                  height={200}
                  alt='Empty state'
                />
              }
              title={"Your Cart is Empty!"}
              body={"Browse our categories and find our best offers"}
              route={"/products"}
            />
          ) : (
            <div className='row gap-5 mt-5'>
              <div className='col-lg-8 shadow rounded p-3'>
                {cartItems.length > 0 &&
                  cartItems.map((cartItem) => (
                    <CartItem
                      cartItems={cartItems}
                      setCartItems={setCartItems}
                      key={cartItem._id}
                      cartId={cartItem._id}
                      quantity={cartItem.quantity}
                      product={cartItem.product}
                    />
                  ))}
              </div>
              <div className='col-lg-3 shadow rounded p-3 align-self-start'>
                <div className='border-bottom pb-2'>
                  <Header.h4 normal color={colors.grey3}>
                    Cart ({cartItems?.length})
                  </Header.h4>
                </div>
                <div className='mb-5 mt-3'>
                  <Header.h6 normal color={colors.black}>
                    Total
                  </Header.h6>
                  <div className='mb-1' />
                  <Header.h3 color='#555454'>
                    {currencyFormatter(totalPrice)}
                  </Header.h3>
                </div>
                <CheckoutBtn>Checkout</CheckoutBtn>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

const CheckoutBtn = styled.button`
  cursor: pointer;
  background-color: ${colors.primary};
  width: 100%;
  height: 70px;
  border-radius: 10px;
  color: ${colors.white};
  font-weight: bold;
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.05);
  }
`
export default Cart
