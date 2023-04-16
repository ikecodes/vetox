import React, { useState } from "react"
import { Form } from "react-bootstrap"
import styled from "styled-components"
import PrimaryBtn from "@/components/PrimaryBtn"
import colors from "@/constants/colors"

const Login = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("sign in to the admin")
  }
  return (
    <FormContainer>
      <ContactForm className='p-5 rounded mx-3'>
        <div className='d-flex justify-content-center align-items-center mb-5'>
          {/* <Image src={Logo} alt='grooming' /> */}
          <h2>Image</h2>
          <h3 className='m-0 ms-2 text-uppercase'>Enviable</h3>
        </div>
        <Form className='m-0' onSubmit={handleSubmit}>
          <div className='mb-3 form-group'>
            <label htmlFor='email' className='form-label'>
              Email
            </label>
            <input
              type='email'
              name='email'
              className='form-control rounded-0'
              placeholder='Email Address'
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className='mb-3 form-group'>
            <label htmlFor='password' className='form-label'>
              Password
            </label>
            <input
              type='password'
              name='password'
              className='form-control rounded-0'
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className='text-start'>
            <PrimaryBtn title='login' loading={loading} primary />
          </div>
        </Form>
        <p>Input your email and password to login to the admin</p>
      </ContactForm>
    </FormContainer>
  )
}

const FormContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`
const Image = styled.img`
  width: 1.5rem;
  height: auto;
  text-align: center;
  display: flex;
`
const ContactForm = styled.div`
  background-color: ${colors.tertiary};
  background-image: linear-gradient(
    to top right,
    ${colors.tertiary},
    ${colors.primary}
  );
  color: ${colors.white};
  max-width: 600px;

  & p {
    font-size: 1rem;
    margin-top: 1rem;
  }
`
export default Login
