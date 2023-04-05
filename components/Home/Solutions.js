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
    <Container className='p-5'>
      <div className='container'>
        <Header>More intensive care solutions</Header>
        <div className='row'>
          {products.map((product, i) => (
            <div key={i} className='col-lg-3 col-md-6 mb-3'>
              <SolutionsCard title={product.title} image={product.image} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  background-color: ${colors.grey1};
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
