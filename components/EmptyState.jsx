import Image from "next/image"
import React from "react"
import Header from "./Header"
import PrimaryBtn from "./PrimaryBtn"
import styled from "styled-components"
import colors from "@/constants/colors"

const EmptyState = () => {
  return (
    <Container>
      <div className='text-center'>
        <Image
          src={"/emptyCart.svg"}
          width={200}
          height={200}
          alt='Empty state'
        />
        <div className='my-3'>
          <Header.h4 color={colors.black}>Your Cart is Empty!</Header.h4>
        </div>
        <Header.h6 normal color={colors.black}>
          Browse our categories and find our best offers
        </Header.h6>

        <div className='my-3 text-center'></div>
        <PrimaryBtn primary title={"Products"} semirounded />
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 50vh;
  display: grid;
  place-content: center;
`

export default EmptyState
