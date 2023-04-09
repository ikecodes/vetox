import PrimaryBtn from "@/components/PrimaryBtn"
import colors from "@/constants/colors"
import Image from "next/image"
import Link from "next/link"
import React from "react"
import styled from "styled-components"

const signIn = () => {
  return (
    <div className='container'>
      <Wrapper>
        <Form>
          <Input type='email' name='email' placeholder='Email' />
          <Input
            className='my-3'
            type='email'
            name='password'
            placeholder='Password'
          />
          <div>
            <PrimaryBtn primary title={"Login"} />
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

export default signIn
