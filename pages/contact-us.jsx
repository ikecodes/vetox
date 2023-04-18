import React, { useState } from "react"
import { RiSendPlaneFill } from "react-icons/ri"
import { MdLocationOn } from "react-icons/md"
import { BsTelephoneFill } from "react-icons/bs"
import { Form } from "react-bootstrap"
import { toast } from "react-toastify"
import PrimaryBtn from "@/components/PrimaryBtn"
import colors from "@/constants/colors"
import styled from "styled-components"
import Header from "@/components/Header"
import { useCreateMessage } from "@/hooks/messages.hook"

const ContactUs = () => {
  const { mutate, isLoading } = useCreateMessage()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.fullName || !formData.email || !formData.message)
      return toast.info("Please fill all the fields", "info")

    // const data = {
    //   fullName: "test guy",
    //   email: "test@gmail.com",
    //   message:
    //     "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus magni commodi maxime in sequi repudiandae minima iste, sunt dolorem? Modi quo sapiente veniam voluptates sed eligendi obcaecati consequuntur eaque consectetur!",
    // }
    // return console.log(formData)
    mutate(formData, {
      onSuccess: () => {
        toast.success("Your message has been sent to Vetox Medical")
        setFormData({
          fullName: "",
          email: "",
          message: "",
        })
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.message ??
            "Something went wrong sending your message"
        )
      },
    })
  }

  return (
    <div className='container rounded'>
      <div className='my-5'>
        <Header.h3 normal color={colors.black}>
          We are here for you 👋
        </Header.h3>
      </div>
      <ContactContainer className='row justify-content-center shadow-lg'>
        <ContactDetails className='col-lg-6 p-4 m-0'>
          <h2 className='text-capitalize m-0'>contact us</h2>
          <HeaderLine className='mb-1' />
          <p>We are open to any suggestion or just to have a chat</p>
          <ul className='mt-5 p-0'>
            <li className='mb-5 d-flex gap-3 align-items-center'>
              <MdLocationOn
                size={25}
                color={colors.primary}
                className='flex-shrink-0'
              />
              <span>
                Address:{" "}
                <Detail>
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  Tempore{" "}
                </Detail>
              </span>
            </li>
            <li className='mb-5 d-flex gap-3 align-items-center'>
              <RiSendPlaneFill size={25} color={colors.primary} />
              <span>
                Email: <Detail>info@vetoxmedical.com</Detail>
              </span>
            </li>
            <li className='mb-5 d-flex gap-3 align-items-center'>
              <BsTelephoneFill size={25} color={colors.primary} />
              <span>
                Phone: <Detail>+234 00000000</Detail>
              </span>
            </li>
          </ul>
        </ContactDetails>
        <ContactForm className='col-lg-6 p-0'>
          <Form className='p-3 m-0' onSubmit={handleSubmit}>
            <div className='mb-3 form-group'>
              <label htmlFor='fullName' className='form-label'>
                Full name
              </label>
              <input
                type='text'
                name='fullName'
                className='form-control'
                placeholder='Enter your name'
                value={formData.fullName}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='mb-3 form-group'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                type='email'
                name='email'
                className='form-control'
                placeholder='Email Address'
                value={formData.email}
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className='mb-3 form-group'>
              <label htmlFor='message' className='form-label'>
                Message
              </label>
              <textarea
                name='message'
                cols='30'
                rows='5'
                className='form-control borded-0'
                placeholder='Your message for us...'
                value={formData.message}
                onChange={(e) => handleChange(e)}
              ></textarea>
            </div>
            <div className='text-start'>
              <PrimaryBtn
                primary
                title='submit'
                semirounded
                loading={isLoading}
              />
            </div>
          </Form>
        </ContactForm>
      </ContactContainer>
    </div>
  )
}

const HeaderLine = styled.div`
  background-color: ${colors.primary};
  height: 0.2rem;
  width: 5rem;
  border-radius: 10px;
`
const ContactContainer = styled.div`
  flex: 1;
`
const ContactDetails = styled.div`
  flex: 1;
`
const ContactForm = styled.div`
  background-color: ${colors.tertiary};
  background-image: linear-gradient(
    to top right,
    ${colors.tertiary},
    ${colors.primary}
  );
  color: ${colors.white};
  height: 100%;
`

const Detail = styled.span`
  color: #696969;
`

export default ContactUs
