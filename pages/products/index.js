import Categories from "@/components/Categories"
import Header from "@/components/Header"
import colors from "@/constants/colors"
import { currencyFormatter } from "@/utils/helpers"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Card } from "react-bootstrap"
import styled from "styled-components"

const products = [
  {
    title: "Ventilation Accessories",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
    price: 3000,
  },
  {
    title: "Medical Supply Systems",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
    price: 30000,
  },
  {
    title: "Patient Monitoring Systems",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
    price: 30000,
  },
  {
    title: "Neonatal Incubators & Thermoregulation ",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
    price: 30000,
  },
  {
    title: "Zeiss NC4 OPMI Neuro Spine Surgical Microscope NC-4",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
    price: 30000,
  },
  {
    title: "Zeiss NC4 OPMI Neuro Spine Surgical Microscope NC-4",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
    price: 30000,
  },
]
const ProductCard = ({ title, image, price }) => (
  <CardContainer className='mb-3'>
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
        <div className='text-start'>
          <div className='mt-1'>
            <Header.h6 color={colors.grey5} normal>
              Category
            </Header.h6>
          </div>
          <TextBox>
            <Header.h6 color={colors.black} normal>
              {title}
            </Header.h6>
          </TextBox>
          <Link href={`/`}>
            <Header.h6 color={colors.primary} normal>
              {currencyFormatter(price)}
            </Header.h6>
          </Link>
        </div>
      </Card.Body>
    </div>
  </CardContainer>
)

const Products = () => {
  return (
    <div className='d-flex'>
      <CategoryWrapper>
        <Categories />
      </CategoryWrapper>
      <ProductsWrapper>
        <div className='text-center my-5'>
          <Header.h4 color={colors.black}>Products</Header.h4>
        </div>
        <div className='row'>
          {products.map((product, i) => (
            <div key={i} className='col-lg-3 col-md-6'>
              <ProductCard
                image={product.image}
                title={product.title}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </ProductsWrapper>
    </div>
  )
}

const CategoryWrapper = styled.div`
  width: 300px;
  height: 100vh;
  padding: 1.5rem;

  @media (max-width: 768px) {
    display: none;
  }
`
const ProductsWrapper = styled.div`
  flex: 1;
`

const CardContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;

  & a {
    text-decoration: none;
  }
`
const ImageContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 15rem;
  width: 100%;
`
const TextBox = styled.div`
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
`

export default Products
