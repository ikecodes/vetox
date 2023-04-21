import Image from "next/image"
import React from "react"
import Header from "./Header"
import PrimaryBtn from "./PrimaryBtn"
import styled from "styled-components"
import colors from "@/constants/colors"
import { useRouter } from "next/router"

const EmptyState = ({ image, title, body, route }) => {
  const router = useRouter()
  return (
    <Container>
      <div className='text-center'>
        {image}
        <div className='my-3'>
          <Header.h4 color={colors.black}>{title}</Header.h4>
        </div>
        <Header.h6 normal color={colors.black}>
          {body}
        </Header.h6>

        <div className='my-3 text-center'></div>
        <PrimaryBtn
          primary
          title={"Products"}
          semirounded
          handleClick={() => router.push(route)}
        />
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
