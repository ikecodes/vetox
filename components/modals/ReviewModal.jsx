import React, { useState } from "react"
import { Form, Modal } from "react-bootstrap"
import Header from "../Header"
import styled from "styled-components"
import { Rating } from "react-simple-star-rating"
import SecondaryBtn from "../SecondaryBtn"
import PrimaryBtn from "../PrimaryBtn"
import {
  useCreateReview,
  useDeleteReview,
  useGetReviews,
} from "@/hooks/reviews.hook"
import Loader from "../Loader"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import { setPrevRoute } from "@/slices/navSlice"
import { FaTrash } from "react-icons/fa"

const ReviewModal = (props) => {
  const dispatch = useDispatch()
  const { asPath, push } = useRouter()
  const { value } = useSelector((state) => state.user)
  const { data, isLoading } = useGetReviews(props?.product?._id)
  const { mutate, isLoading: loading } = useCreateReview()
  const { mutate: remove } = useDeleteReview()
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)
  const reviews = data?.data?.data ?? []

  async function addReview() {
    if (!value) {
      toast.error("You have to login to rate products")
      dispatch(setPrevRoute(asPath))
      return push("/sign-in")
    }
    if (rating === 0) return toast.info("Please rate the product")
    if (!message) return toast.info("Please add a review message")
    if (!title) return toast.info("Please add a title to your review")
    const data = {
      title,
      message,
      rating,
      productId: props.product._id,
    }
    mutate(data, {
      onSuccess: () => {
        toast.success("Successfully added review")
        setRating(0)
        setMessage("")
        setTitle("")
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.message ??
            "There was an issue adding your review, try again later."
        )
      },
    })
  }
  async function removeReview() {
    remove(props.product._id, {
      onSuccess: () => {
        toast.success("Successfully removed your review")
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.message ??
            "There was an issue removing your review, try again later."
        )
      },
    })
  }
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {props?.product.ratingsAverage > 0 && (
          <div className='d-flex align-items-end'>
            <Header.h1 color='#f6b01e'>
              {props?.product.ratingsAverage}/5
            </Header.h1>
            <p className='m-0 ms-1 text-secondary'>
              (Ratings from verified customers)
            </p>
          </div>
        )}

        {reviews.length === 0 && (
          <div>
            <p className='text-secondary'>
              This product currently has no reviews, be the first!
            </p>
          </div>
        )}

        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className='my-4'>
              {reviews.map((review, i) => (
                <div key={i} className='my-1 border-top py-2'>
                  <Rating
                    onClick={() => {}}
                    readonly
                    initialValue={3.5}
                    size={20}
                  />
                  <p className='m-0 fw-bold'>{review.title}</p>
                  <Text className='m-0'>{review.message}</Text>
                  <Text className='m-0 mt-1 text-secondary'>
                    29-12-2021 by{" "}
                    {`${review.user.firstName} ${review.user.lastName}`}
                  </Text>
                  {value._id === review.user._id && (
                    <FaTrash
                      size={15}
                      className='text-danger'
                      role='button'
                      onClick={removeReview}
                    />
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        <div className='mb-2'>
          <Header.h4>Add a review</Header.h4>
        </div>
        <div className='row'>
          <div className='mb-3'>
            <Rating
              onClick={(val) => setRating(val)}
              initialValue={rating}
              size={50}
            />
          </div>

          <Form.Group className='mb-3 col-lg-6"'>
            <Form.Control
              type='text'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder='Title'
            />
          </Form.Group>

          <Form.Group className='mb-3 col-lg-6"'>
            <Form.Control
              as='textarea'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder='Message'
            />
          </Form.Group>
        </div>
        <PrimaryBtn
          primary
          semirounded
          title={"Submit"}
          handleClick={addReview}
          loading={loading}
        />
      </Modal.Body>
    </Modal>
  )
}

const Text = styled.p`
  font-size: 0.8rem;
`

export default ReviewModal
