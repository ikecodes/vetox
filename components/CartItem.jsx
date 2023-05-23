import Image from "next/image"
import React from "react"
import Header from "./Header"
import { BsTrashFill } from "react-icons/bs"
import { MdOutlineAddCircle, MdRemoveCircle } from "react-icons/md"
import colors from "@/constants/colors"
import styled from "styled-components"
import Link from "next/link"
import { toast } from "react-toastify"
import { useDeleteCart } from "@/hooks/cart.hook"
import { currencyFormatter } from "@/utils/helpers"

const CartItem = ({ cartItems, setCartItems, cartId, product, quantity }) => {
  const { mutate } = useDeleteCart()

  function increaseQuantity() {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem._id === cartId
        ? { ...cartItem, quantity: quantity + 1 }
        : cartItem
    )
    setCartItems(updatedCart)
  }
  function decreaseQuantity() {
    const updatedCart = cartItems.map((cartItem) =>
      cartItem._id === cartId
        ? { ...cartItem, quantity: quantity === 1 ? quantity : quantity - 1 }
        : cartItem
    )
    setCartItems(updatedCart)
  }

  async function removeCartItem() {
    mutate(cartId, {
      onSuccess: () => {
        toast.success("Successfully removed product from your cart")
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.message ??
            "There was an issue removing your item from your cart, try again later."
        )
      },
    })
  }
  return (
    <Container className='border-bottom pb-2 mb-2'>
      <div className='d-flex align-items-center'>
        <Image
          src={product.images[0].original}
          width={65}
          height={65}
          alt='Cart Item'
        />
        <div className='ms-3'>
          <Link href={`/products/${product._id}`}>
            <Header.h6 color='#757B9C'>{product.name}</Header.h6>
          </Link>
          <div className='mt-2'>
            <Header.h6 color={colors.black} normal>
              {currencyFormatter(product.price)}
            </Header.h6>
          </div>
        </div>
      </div>

      <div className='mt-3 d-flex justify-content-between'>
        <div
          className='text-secondary fw-bold d-flex align-items-center'
          role='button'
          onClick={removeCartItem}
        >
          <BsTrashFill size={20} color={colors.pink} />
          {/* <span className='m-0'>Remove</span> */}
        </div>
        <div className='text-secondary fw-bold d-flex align-items-center'>
          <span className='m-0' role='button' onClick={decreaseQuantity}>
            <MdRemoveCircle size={25} color={colors.secondary} />
          </span>
          <span className='m-0 mx-2'>{quantity}</span>
          <span className='m-0' role='button' onClick={increaseQuantity}>
            <MdOutlineAddCircle size={25} color={colors.primary} />
          </span>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  transition: all 0.3s ease-in;
  & a {
    text-decoration: none;
  }
  & h6:hover {
    color: ${colors.primary};
    transform: scale(1.02);
  }
  /* & :not(:last-child) {
    border-bottom: 1px solid ${colors.grey3};
  } */
`
export default CartItem
