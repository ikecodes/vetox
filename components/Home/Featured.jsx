import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Card } from "react-bootstrap"
import styled from "styled-components"
import Header from "../Header"
import TertiaryBtn from "../TertiaryBtn"
import { useGetFeaturedProducts } from "@/hooks/products.hook"
import colors from "@/constants/colors"
import { motion } from "framer-motion"

// const products = [
//   {
//     title: "Ventilation Accessories",
//     image:
//       "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
//   },
//   {
//     title: "Medical Supply Systems",
//     image:
//       "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
//   },
//   {
//     title: "Patient Monitoring Systems",
//     image:
//       "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
//   },
//   {
//     title: "Neonatal Incubators & Thermoregulation ",
//     image:
//       "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
//   },
//   {
//     title: "Zeiss NC4 OPMI Neuro Spine Surgical Microscope NC-4",
//     image:
//       "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
//   },
//   {
//     title: "Zeiss NC4 OPMI Neuro Spine Surgical Microscope NC-4",
//     image:
//       "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
//   },
// ]
const FeaturedCard = ({ id, title, price, image }) => (
  <CardContainer
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2 }}
    viewport={{ once: true }}
  >
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
          <Link href={`/products/${id}`}>
            <TertiaryBtn title={"Shop"} primary />
          </Link>
        </div>
      </Card.Body>
    </div>
  </CardContainer>
)
const Featured = () => {
  const { data } = useGetFeaturedProducts()
  const products = data?.data?.data ?? []
  return (
    <Container>
      <div>
        <div className='text-center'>
          <Header.h4 color={colors.black}>Featured</Header.h4>
          {/* <Header.h4>Featured</Header.h4> */}
          <div className='mb-3' />
        </div>
        <GridWrapper>
          {products.map((product, i) => (
            <FeaturedCard
              id={product._id}
              key={product._id}
              title={product.name}
              price={product.price}
              image={product.images[0].original}
            />
          ))}
        </GridWrapper>
      </div>
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
  background-color: ${colors.grey1};
  padding: 5rem;
  @media (max-width: 567px) {
    padding: 5rem 0;
  }
`

const CardContainer = styled(motion.div)`
  border-radius: 20px;
  overflow: hidden;
`
export const GridWrapper = styled.section`
  display: grid;
  gap: 1rem;
  justify-content: justifyContent;
  align-items: alignItems;
  grid-template-columns: repeat(5, 1fr);
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media (max-width: 960px) {
    grid-template-columns: repeat(2, 1fr);
  }
  /* @media (max-width: 576px) {
    grid-template-columns: repeat(2, 1fr);
  } */
`
const ImageContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 12rem;
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
