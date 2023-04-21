import Categories from "@/components/Categories"
import Header from "@/components/Header"
import Loader from "@/components/Loader"
import colors from "@/constants/colors"
import { useGetAllProducts } from "@/hooks/products.hook"
import { currencyFormatter } from "@/utils/helpers"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import { Card } from "react-bootstrap"
import styled from "styled-components"

const ProductCard = ({ id, title, category, image, price }) => (
  <CardContainer className='mb-3'>
    <Link href={`/products/${id}`}>
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
                {category}
              </Header.h6>
            </div>
            <TextBox>
              <Header.h6 color={colors.black} normal>
                {title}
              </Header.h6>
            </TextBox>
            <Header.h6 color={colors.primary} normal>
              {currencyFormatter(price)}
            </Header.h6>
          </div>
        </Card.Body>
      </div>
    </Link>
  </CardContainer>
)

const Products = () => {
  const { data, isLoading } = useGetAllProducts()

  console.log(data)
  const products = data?.data?.data ?? []

  console.log("///PRODUCTS", products)
  return (
    <div className='d-flex'>
      <CategoryWrapper>
        <Categories />
      </CategoryWrapper>
      <ProductsWrapper>
        <div className='text-center my-5'>
          <Header.h4 color={colors.black}>Products</Header.h4>
        </div>
        {isLoading ? (
          <Loader />
        ) : (
          <div className='row'>
            {products.map((product, i) => (
              <div key={i} className='col-lg-3 col-md-6'>
                <ProductCard
                  id={product._id}
                  image={product.images[0].original}
                  title={product.name}
                  price={product.price}
                  category={product.category}
                />
              </div>
            ))}
          </div>
        )}
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
