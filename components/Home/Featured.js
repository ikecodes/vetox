import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Card } from "react-bootstrap"
import styled from "styled-components"
import Header from "../Header"
import TertiaryBtn from "../TertiaryBtn"

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
  {
    title: "Zeiss NC4 OPMI Neuro Spine Surgical Microscope NC-4",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
  },
  {
    title: "Zeiss NC4 OPMI Neuro Spine Surgical Microscope NC-4",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
  },
]
const FeaturedCard = ({ title, image }) => (
  <CardContainer>
    <div className='border-0 p-2'>
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
          <TextBox className='my-1'>
            <h6 className='text-capitalize text-secondary'>{title}</h6>
          </TextBox>
          <Link href={`/`}>
            <TertiaryBtn title={"Shop"} primary />
          </Link>
        </div>
      </Card.Body>
    </div>
  </CardContainer>
)
const Featured = () => {
  return (
    <div className='p-5'>
      <div>
        <div className='text-center'>
          <Header.h4>Featured</Header.h4>
        </div>
        <div className='row'>
          {products.map((product, i) => (
            <div key={i} className='col-lg-2 col-md-4 mb-3'>
              <FeaturedCard title={product.title} image={product.image} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

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
const TextBox = styled.div`
  height: 60px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`

export default Featured
