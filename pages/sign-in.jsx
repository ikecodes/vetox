import PrimaryBtn from "@/components/PrimaryBtn"
import colors from "@/constants/colors"
import { useSignIn } from "@/hooks/auth.hook"
import { setUser } from "@/slices/userSlice"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import styled from "styled-components"

const SignIn = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { mutate, isLoading } = useSignIn()
  const [email, setEmail] = useState("")
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
        router.push("/cart")
      },
      onError: (e) => {
        toast.error(
          e?.response?.data?.message ?? "Login failed, try again later"
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
              title={"Login"}
              loading={isLoading}
              handleClick={login}
            />
            <p className='m-0 mt-2'>
              Need account, <Link href={"/sign-up"}>Sign up?</Link>{" "}
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

export default SignIn
