import React, { useState } from "react"
import PrimaryBtn from "@/components/PrimaryBtn"
import colors from "@/constants/colors"
import Image from "next/image"
import Link from "next/link"
import styled from "styled-components"
import { useSignUp } from "@/hooks/auth.hook"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const SignUp = () => {
  const router = useRouter()
  const { mutate, isLoading } = useSignUp()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  async function register(e) {
    e.preventDefault()
    if (!firstName || !lastName || !email || !password)
      return toast.info("All fields are required")
    if (password.length < 5) return toast.info("Minimum password length is 5")

    const data = {
      firstName,
      lastName,
      email,
      password,
    }
    // return console.log(data)
    mutate(data, {
      onSuccess: () => {
        toast.success("Your signup was Successful")
        setFirstName("")
        setLastName("")
        setPassword("")
        setEmail("")
        router.push("/sign-in")
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.message ?? "Signup failed, try again later"
        )
      },
    })
  }
  return (
    <div className='container'>
      <Wrapper>
        <Form>
          <Input
            className='my-1'
            type='text'
            name='firstName'
            placeholder='Firstname'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Input
            className='my-1'
            type='text'
            name='lastName'
            placeholder='Lastname'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <Input
            className='my-1'
            type='email'
            name='email'
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            className='my-1'
            type='password'
            name='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className='my-1'>
            <PrimaryBtn
              primary
              title={"Sign Up"}
              loading={isLoading}
              handleClick={register}
            />
            <p className='m-0 mt-2'>
              Already have an account, <Link href={"/sign-in"}>Login?</Link>{" "}
            </p>
          </div>
        </Form>
      </Wrapper>
    </div>
  )
}

const Wrapper = styled.div`
  height: 50vh;
  display: grid;
  place-content: center;
`

const Form = styled.form`
  display: flex;
  flex-direction: column;
`
const Input = styled.input`
  border-radius: 10px;
  padding: 0.5rem 1rem;
  width: 20rem;
  border: 1px solid ${colors.primary};
`

export default SignUp
