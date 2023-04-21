import React, { useState } from "react"
import { Form } from "react-bootstrap"
import styled from "styled-components"
import PrimaryBtn from "@/components/PrimaryBtn"
import colors from "@/constants/colors"
import Link from "next/link"
import Image from "next/image"
import { useSignIn } from "@/hooks/auth.hook"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { setUser } from "@/slices/userSlice"
import { useRouter } from "next/router"

const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const [email, setEmail] = useState("")
  const { mutate, isLoading } = useSignIn()
  const [password, setPassword] = useState("")

  async function login(e) {
    e.preventDefault()
    if (!email || !password) return toast.info("All fields are required")
    if (password.length < 5) return toast.info("Minimum password length is 5")

    const data = {
      email,
      password,
    }
    mutate(data, {
      onSuccess: ({ data }) => {
        toast.success("Your login was Successful")
        dispatch(setUser(data))
        setPassword("")
        setEmail("")
        router.push("/admin/dashboard")
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.message ?? "Login failed, try again later"
        )
      },
    })
  }
  return (
    <FormContainer>
      <ContactForm className='p-5 rounded mx-3'>
        <div className='d-flex justify-content-center align-items-center mb-5'>
          <div>
            <Link href='/'>
              <div className='d-flex align-items-center'>
                <Image
                  src='/logo2.svg'
                  alt='Vetox medical logo'
                  height='100'
                  width='100'
                />
                <LogoWrite className='ms-1'>
                  <h5 className='fw-bold'>Vetox Global</h5>
                  <h6 className='fw-light'>Medical Services </h6>
                </LogoWrite>
              </div>
            </Link>
          </div>
        </div>
        <Form className='m-0'>
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
            <PrimaryBtn
              title='login'
              loading={isLoading}
              primary
              handleClick={login}
            />
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

const ContactForm = styled.div`
  background-color: ${colors.tertiary};
  background-image: linear-gradient(
    to top right,
    ${colors.tertiary},
    ${colors.primary}
  );
  color: ${colors.white};
  max-width: 600px;

  & a {
    text-decoration: none;
  }
  & p {
    font-size: 1rem;
    margin-top: 1rem;
  }
`
const LogoWrite = styled.div`
  h5,
  h6 {
    color: ${colors.white};
    margin: 0;
    padding: 0;
  }
`

export default Login
