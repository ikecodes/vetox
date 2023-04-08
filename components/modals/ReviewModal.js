import React, { useState } from "react"
import { Form, Modal } from "react-bootstrap"
import Header from "../Header"
import styled from "styled-components"
import { Rating } from "react-simple-star-rating"
import SecondaryBtn from "../SecondaryBtn"
import PrimaryBtn from "../PrimaryBtn"

const reviews = [
  {
    title: "Great product",
    review: 3,
    message: "  Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    created_at: "12-12-2020",
    name: "Ike",
  },
  {
    title: "Great product",
    review: 3,
    message: "  Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    created_at: "12-12-2020",
    name: "Ike",
  },
  {
    title: "Great product",
    review: 3,
    message: "  Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    created_at: "12-12-2020",
    name: "Ike",
  },
]
const ReviewModal = (props) => {
  const [title, setTitle] = useState("")
  const [message, setMessage] = useState("")
  const [rating, setRating] = useState(0)

  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <div className='d-flex align-items-end'>
          <Header.h1 color='#f6b01e'>4.5/5</Header.h1>
          <p className='m-0 ms-1 text-secondary'>
            (Ratings from verified customers)
          </p>
        </div>
        <div className='my-4'>
          {reviews.map((review, i) => (
            <div key={i} className='my-1 border-top py-2'>
              <Rating
                onClick={() => {}}
                readonly
                initialValue={3.5}
                size={15}
              />
              <p className='m-0 fw-bold'>{review.title}</p>
              <Text className='m-0'>{review.message}</Text>
              <Text className='m-0 mt-1 text-secondary'>
                29-12-2021 by {review.name}
              </Text>
            </div>
          ))}
        </div>

        <Header.h6>Add a review</Header.h6>
        <div className='row'>
          <div className='col-lg-6'>
            <Form.Group className='mb-3 col-lg-6"'>
              <Form.Control
                type='text'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder='Title'
                className=''
              />
            </Form.Group>
          </div>

          <Form.Group className='mb-3 col-lg-6"'>
            <Form.Control
              as='textarea'
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              placeholder='Message'
            />
          </Form.Group>
          <div className='mb-3'>
            <Rating onClick={() => {}} initialValue={3.5} size={30} />
          </div>
        </div>
        <PrimaryBtn primary semirounded title={"Submit"} />
      </Modal.Body>
    </Modal>
  )
}

const Text = styled.p`
  font-size: 0.8rem;
`

export default ReviewModal
