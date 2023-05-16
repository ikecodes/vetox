import React from "react"
import { BiLogOutCircle } from "react-icons/bi"
import styled from "styled-components"
import Sidebar from "./Sidebar"
import colors from "@/constants/colors"
import Image from "next/image"
import { useDispatch, useSelector } from "react-redux"
import { setUser } from "@/slices/userSlice"
import { toast } from "react-toastify"
import { useRouter } from "next/router"

const AdminLayout = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { value } = useSelector((state) => state.user)

  function logout() {
    dispatch(setUser(null))
    toast.success("Signout successful")
    router.push("/admin/login")
  }
  return (
    <div className='overflow-hidden'>
      <div className='d-flex'>
        <SideBarWrapper className='p-0'>
          <Sidebar />
        </SideBarWrapper>
        <ActionContainer className='p-0 position-relative'>
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
                <span className='m-0'>{value?.email}</span>
                <Logout className='d-flex align-items-center'>
                  <BiLogOutCircle size={20} />
                  <span className='m-0' onClick={logout} role='button'>
                    Signout
                  </span>
                </Logout>
              </div>
            </div>
          </Box>
          <Container className='ms-2'>{children}</Container>
        </ActionContainer>
      </div>
    </div>
  )
}

const SideBarWrapper = styled.div`
  width: 14%;
`
const ActionContainer = styled.div`
  flex: 1;
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
    background-color: ${colors.overlay};
  }
  &::-webkit-scrollbar-thumb {
    background-color: ${colors.primary};
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
