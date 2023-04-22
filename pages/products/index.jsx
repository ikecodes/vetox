import React, { useEffect, useState } from "react"
import Categories from "@/components/Categories"
import Header from "@/components/Header"
import Loader from "@/components/Loader"
import PaginationDefault from "@/components/PaginationDefault"
import colors from "@/constants/colors"
import { useGetAllProducts } from "@/hooks/products.hook"
import { productsPagination } from "@/jotai/products.state"
import { currencyFormatter } from "@/utils/helpers"
import { useAtom } from "jotai"
import Image from "next/image"
import Link from "next/link"
import { Card } from "react-bootstrap"
import styled from "styled-components"
import EmptyState from "@/components/EmptyState"

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
  const [productFilter, setproductFilter] = useAtom(productsPagination)
  const { data, isLoading, isFetching } = useGetAllProducts()
  const products = data?.data?.data?.products ?? []
  const [categorySlug, setCategorySlug] = useState("")
  const [subCategorySlug, setSubCategorySlug] = useState("")

  const handlePageClick = (event) => {
    setproductFilter((prev) => ({ ...prev, page: event.selected + 1 }))
  }

  useEffect(() => {
    setproductFilter((prev) => ({
      ...prev,
      categorySlug,
      subCategorySlug,
    }))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categorySlug, subCategorySlug])
  return (
    <div className='d-flex'>
      <CategoryWrapper>
        <Categories
          setCategorySlug={setCategorySlug}
          setSubCategorySlug={setSubCategorySlug}
        />
      </CategoryWrapper>

      <ProductsWrapper>
        <div className='text-center my-5'>
          <Header.h4 color={colors.black}>Products</Header.h4>
        </div>
        {isLoading || isFetching ? (
          <LoadingBox>
            <Loader />
          </LoadingBox>
        ) : (
          <>
            {products.length === 0 ? (
              <EmptyState
                image={
                  <Image
                    src={"/emptyProduct.svg"}
                    width={200}
                    height={200}
                    alt='Empty state'
                  />
                }
                title={"No products found!"}
                body={"No products found on this category"}
                route={"/products"}
              />
            ) : (
              <GridWrapper>
                {products.map((product) => (
                  <ProductCard
                    key={product._id}
                    id={product._id}
                    image={product.images[0].original}
                    title={product.name}
                    price={product.price}
                    category={
                      product.subCategory
                        ? product.subCategory
                        : product.category
                    }
                  />
                ))}
              </GridWrapper>
            )}
          </>
        )}
        <div className='d-flex justify-content-center'>
          {products.length > 0 && (
            <PaginationDefault
              onPageChange={handlePageClick}
              pageCount={data?.data?.data?.totalPage}
            />
          )}
        </div>
      </ProductsWrapper>
    </div>
  )
}

//  <div key={i} className='col-lg-3 col-md-6'>
//    <ProductCard
//      id={product._id}
//      image={product.images[0].original}
//      title={product.name}
//      price={product.price}
//      category={product.category}
//    />
//  </div>
const CategoryWrapper = styled.div`
  width: 300px;
  padding: 1.5rem;
  @media (max-width: 768px) {
    display: none;
  }
`
const LoadingBox = styled.div`
  margin-top: 10rem;
`
const ProductsWrapper = styled.div`
  flex: 1;
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
  @media (max-width: 576px) {
    grid-template-columns: repeat(1, 1fr);
  }
`

const CardContainer = styled.div`
  border-radius: 20px;
  height: 100%;
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
