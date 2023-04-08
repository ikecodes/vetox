import Header from "@/components/Header"
import PrimaryBtn from "@/components/PrimaryBtn"
import ReviewModal from "@/components/modals/ReviewModal"
import colors from "@/constants/colors"
import { currencyFormatter } from "@/utils/helpers"
import Image from "next/image"
import React, { useState } from "react"
import { BsCart } from "react-icons/bs"
import { Rating } from "react-simple-star-rating"
import styled from "styled-components"
const ProductDetails = () => {
  const [showReviewModal, setShowReviewModal] = useState(false)
  return (
    <Container className='container mt-5'>
      <div className='row'>
        <div className='col-lg-4'>
          <ImageContainer>
            <Image
              src={
                "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg"
              }
              fill
              style={{ objectFit: "cover" }}
              alt='Solutions Image'
            />
          </ImageContainer>
        </div>
        <div className='col-lg-8'>
          <Header.h4 normal color={colors.black}>
            Universal Patient Monitor IntelliVue MP60 and MP70
          </Header.h4>
          <div className='mb-3' />
          <div className='my-2 d-flex align-items-center'>
            <Rating onClick={() => {}} readonly initialValue={3.5} size={30} />
            <Verified
              onClick={() => setShowReviewModal(true)}
              className='m-0 ms-2'
            >
              (45 verified ratings)
            </Verified>
          </div>
          <Header.h4 color={colors.black}>{currencyFormatter(4000)}</Header.h4>
          <p className='m-0 my-1 text-secondary'>In stock</p>
          <PrimaryBtn
            primary
            title={"Add To Cart"}
            semirounded
            icon={<BsCart color={colors.white} size={20} className='ms-1' />}
          />
          <div className='mt-3'>
            <Header.h6 color={colors.black}>Description</Header.h6>
            <div className='border-bottom my-2' />
            <div className='text-secondary'>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
                ut natus beatae repudiandae provident dolor aliquam quo
                quibusdam impedit neque! Laboriosam iste magnam repellendus
                adipisci porro officiis itaque blanditiis amet. Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Iste obcaecati
                recusandae, error ex voluptatibus nesciunt enim incidunt ipsum
                provident vero, nulla modi deleniti! Laborum recusandae quos
                nobis ex aut illo.
              </p>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla
                ut natus beatae repudiandae provident dolor aliquam quo
                quibusdam impedit neque! Laboriosam iste magnam repellendus
                adipisci porro officiis itaque blanditiis amet. Lorem ipsum,
                dolor sit amet consectetur adipisicing elit. Iste obcaecati
                recusandae, error ex voluptatibus nesciunt enim incidunt ipsum
                provident vero, nulla modi deleniti! Laborum recusandae quos
                nobis ex aut illo.
              </p>
            </div>
          </div>
        </div>
      </div>
      <ReviewModal
        show={showReviewModal}
        onHide={() => setShowReviewModal(false)}
      />
    </Container>
  )
}

const Container = styled.div`
  /* background-color: ${colors.grey1}; */
`

const ImageContainer = styled.div`
  position: relative;
  overflow: hidden;
  height: 20rem;
  width: 100%;
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
export default ProductDetails
