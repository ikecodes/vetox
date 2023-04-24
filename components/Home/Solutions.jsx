import colors from "@/constants/colors"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Card } from "react-bootstrap"
import styled from "styled-components"
import Header from "../Header"
import PrimaryBtn from "../PrimaryBtn"

const products = [
  {
    title: "Ventilation Accessories",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
  },
  {
    title: "Medical Supply Systems",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
  },
  {
    title: "Patient Monitoring Systems",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
  },
  {
    title: "Neonatal Incubators & Thermoregulation ",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
  },
]
const SolutionsCard = ({ title, image }) => (
  <CardContainer className='shadow'>
    <Card className='border-0 p-2'>
      <ImageContainer>
        <Image
          src={image}
          fill
          style={{ objectFit: "cover" }}
          alt='Solutions Image'
        />
      </ImageContainer>

      <Card.Body>
        <div className='text-center'>
          <TextHeight className='text-capitalize text-secondary'>
            {title}
          </TextHeight>
          <Link href={`/`}>
            <PrimaryBtn title={"Learn more"} primary semirounded />
          </Link>
        </div>
      </Card.Body>
    </Card>
  </CardContainer>
)
const Solutions = () => {
  return (
    <Container>
      <div className='container'>
        <Header>More intensive care solutions</Header>
        <div className='mb-3' />
        <div className='row'>
          <GridWrapper>
            {products.map((product, i) => (
              <SolutionsCard
                key={1}
                title={product.title}
                image={product.image}
              />
            ))}
          </GridWrapper>
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${colors.grey1};
`

export const GridWrapper = styled.section`
  display: grid;
  gap: 1rem;
  justify-content: justifyContent;
  align-items: alignItems;
  grid-template-columns: repeat(4, 1fr);
  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  /* @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  } */
`
const CardContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
`
const ImageContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 15rem;
  width: 100%;
`
const TextHeight = styled.h6`
  min-height: 45px;
`
export default Solutions
