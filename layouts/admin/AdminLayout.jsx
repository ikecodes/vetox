import React from "react"
import { BiLogOutCircle } from "react-icons/bi"
import styled from "styled-components"
import Sidebar from "./Sidebar"
import colors from "@/constants/colors"
import Image from "next/image"

const AdminLayout = ({ children }) => {
  const user = {
    email: "ikecodes@gmail.com",
  }
  return (
    <div className='overflow-hidden'>
      <div className='row'>
        <div className='col-lg-2 p-0'>
          <Sidebar />
        </div>
        <ActionContainer className='col-lg-10  p-0 position-relative'>
          <Box>
            <div className='p-2 d-flex align-items-center bg-white rounded shadow'>
              <Image
                src={
                  "https://static.vecteezy.com/system/resources/thumbnails/006/017/842/small/customer-service-icon-user-with-laptop-computer-and-headphone-illustration-free-vector.jpg"
                }
                alt='Admin photo'
                width={50}
                height={50}
                className='me-2 rounded-full'
                style={{
                  borderRadius: "50%",
                }}
              />
              <div>
                <span className='m-0'>{user?.email}</span>
                <Logout className='d-flex align-items-center'>
                  <BiLogOutCircle size={20} />
                  <span className='m-0' onClick={() => {}} role='button'>
                    Signout
                  </span>
                </Logout>
              </div>
            </div>
          </Box>
          <Container className='p-5'>{children}</Container>
        </ActionContainer>
      </div>
    </div>
  )
}

const ActionContainer = styled.div`
  overflow: hidden;
  & span {
    font-size: 0.8rem;
  }
`
const Container = styled.div`
  overflow-y: scroll;
  height: 90vh;
  margin-top: 3.5rem;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 5px;
  }
  &::-webkit-scrollbar-track {
    box-shadow: none;
    background-color: #999bcb;
  }
  &::-webkit-scrollbar-thumb {
    background-color: rgb(96, 99, 173);
    outline: none;
  }
`

const Box = styled.div`
  position: absolute;
  right: 30px;
  top: 10px;
  z-index: 100;
`

const Logout = styled.div`
  color: ${colors.primary};
`

export default AdminLayout
