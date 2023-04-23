import colors from "@/constants/colors"
import Image from "next/image"
import React from "react"
import styled from "styled-components"
import PrimaryBtn from "../PrimaryBtn"
import { useRouter } from "next/router"

const EquipmentBanner = () => {
  const router = useRouter()

  return (
    <Wrapper>
      <ImageBox>
        <Image
          src={"/experiment.svg"}
          alt={"Experiment"}
          fill
          style={{
            objectFit: "cover",
            transform: "translateX(-150px)",
          }}
        />
      </ImageBox>
      <TextBox>
        <h1>EQUIPMENT LIFECYCLE REIMAGINED</h1>
        <div>
          <PrimaryBtn
            semirounded
            title={"View Details"}
            handleClick={() => router.push("/products")}
          />
        </div>
      </TextBox>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  height: 20rem;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${colors.primary};
  & h1 {
    color: ${colors.white};
    font-size: 3rem;
    font-weight: 700;
  }
`
const TextBox = styled.div`
  transform: translateX(-150px);
  @media (max-width: 576px) {
    transform: translateX(0);
    margin-left: 1rem;
  }
`
const ImageBox = styled.div`
  position: relative;
  height: 100%;
  width: 45rem;
  box-sizing: border-box;
  clip-path: polygon(0% 0%, 75% 0%, 50% 50%, 75% 100%, 0% 100%);
  & div {
    text-align: end;
    @media (max-width: 576px) {
      text-align: start;
    }
  }
  @media (max-width: 576px) {
    display: none;
  }
`
export default EquipmentBanner
