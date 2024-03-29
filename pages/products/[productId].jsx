import Header from "@/components/Header"
import Loader from "@/components/Loader"
import PrimaryBtn from "@/components/PrimaryBtn"
import ReviewModal from "@/components/modals/ReviewModal"
import colors from "@/constants/colors"
import { useGetProduct } from "@/hooks/products.hook"
import convertHtmlToPlainText from "@/utils/converHTMLToText"
import { currencyFormatter } from "@/utils/helpers"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { BsCart, BsWhatsapp } from "react-icons/bs"
import { Rating } from "react-simple-star-rating"
import styled from "styled-components"
import ImageGallery from "react-image-gallery"
import { useDispatch, useSelector } from "react-redux"
import { setPrevRoute } from "@/slices/navSlice"
import { toast } from "react-toastify"
import { useCreateCart } from "@/hooks/cart.hook"

const ProductDetails = () => {
  const { query, asPath, push } = useRouter()
  const { mutate, isLoading: loading } = useCreateCart()
  const dispatch = useDispatch()
  const { value } = useSelector((state) => state.user)
  const { data, isLoading } = useGetProduct(query.productId)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const product = data?.data?.data ?? {}

  function addToCart() {
    if (!value) {
      dispatch(setPrevRoute(asPath))
      return push("/sign-in")
    }
    const data = {
      productId: product._id,
    }
    mutate(data, {
      onSuccess: () => {
        toast.success("Successfully added to cart")
        return push("/cart")
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.message ??
            "There was an issue adding item to cart, try again later."
        )
      },
    })
  }
  return (
    <Container className='container mt-5'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className='row'>
            <div className='col-lg-4'>
              {/* <ImageContainer>
                <Image
                  src={product?.images[0].original}
                  fill
                  style={{ objectFit: "cover" }}
                  alt='Solutions Image'
                />
              </ImageContainer> */}
              <ImageContainer>
                {product?.images && (
                  <ImageGallery
                    items={product?.images}
                    thumbnailPosition='bottom'
                    showPlayButton={false}
                    showBullets={true}
                    showIndex={true}
                  />
                )}
              </ImageContainer>
            </div>
            <div className='col-lg-8'>
              <h4 className='text-capitalize'>{product?.name}</h4>
              {/* <Header.h4 normal color={colors.black}></Header.h4> */}
              <div className='mb-3' />
              <div className='my-2 d-flex align-items-center'>
                <Rating
                  readonly
                  initialValue={product.ratingsAverage}
                  size={30}
                />

                <Verified
                  onClick={() => setShowReviewModal(true)}
                  className='m-0 ms-2'
                >
                  (View verified ratings)
                </Verified>
              </div>
              <h2 className='fw-bold' color={colors.black}>
                {currencyFormatter(product?.price)}
              </h2>
              {product?.inStock ? (
                <p className='m-0 my-3 text-secondary'>In stock</p>
              ) : (
                <div className='my-3'>
                  <StockOut className='m-0 p-1 rounded text-white'>
                    Out of Stock
                  </StockOut>
                </div>
              )}

              <PrimaryBtn
                primary
                title={"Add To Cart"}
                semirounded
                loading={loading}
                handleClick={addToCart}
                icon={
                  <BsCart color={colors.white} size={20} className='ms-1' />
                }
              />

              <div className='my-2'>
                <a
                  target='_blank'
                  href={`https://wa.me/+2349167186719?text=${encodeURIComponent(
                    `I would like to make enquiry about ${
                      product.name
                    } selling for ${currencyFormatter(product?.price)}`
                  )}`}
                >
                  <EnquiryBtn>
                    <span>Make Enquiry</span>
                    <span>|</span>
                    <BsWhatsapp
                      color={colors.primary}
                      size={20}
                      className='ms-1'
                    />
                  </EnquiryBtn>
                </a>
              </div>

              <div className='mt-3'>
                <Header.h6 color={colors.black}>Description</Header.h6>
                <div className='border-bottom my-2' />
                <div
                  className='text-secondary'
                  dangerouslySetInnerHTML={{ __html: product?.description }}
                />
                {/* <div className='text-secondary'>
                  {convertHtmlToPlainText(product.description)}
                </div> */}
              </div>
            </div>
          </div>
        </>
      )}

      <ReviewModal
        show={showReviewModal}
        product={product}
        onHide={() => setShowReviewModal(false)}
      />
    </Container>
  )
}

const Container = styled.div`
  & a {
    text-decoration: none;
  }
`
const StockOut = styled.span`
  background-color: ${colors.grey3};
`
const ImageContainer = styled.div`
  display: block;
  min-height: 1px;
  overflow: auto;
  background: ${colors.grey1};
  margin-bottom: 1rem;
`
const Verified = styled.p`
  cursor: pointer;
  color: ${colors.primary};
  transition: all 0.3s ease-out;
  &:hover {
    text-decoration: underline;
    transform: scale(1.02);
  }
`
const EnquiryBtn = styled.div`
  cursor: pointer;
  background-color: ${colors.secondary};
  font-weight: 500;
  height: 50px;
  width: 170px;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  border-radius: 10px;
  color: ${colors.primary};
  justify-content: space-around;
  transition: all 0.3s ease-in;
  text-decoration: none;
  &:hover {
    transform: scale(1.02);
  }
`
export default ProductDetails
