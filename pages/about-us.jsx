import Header from "@/components/Header"
import colors from "@/constants/colors"
import Image from "next/image"
import React from "react"
import styled from "styled-components"

const AboutUs = () => {
  return (
    <div className='container'>
      <div className='text-center my-5'>
        <Header.h4 color={colors.black}>
          About Vetox Global Medical Services
        </Header.h4>
      </div>
      <ImageContainer>
        <Image
          src={
            "https://www.publichealth.com.ng/wp-content/uploads/2020/06/Medical-Device-Companies-In-USA.jpg"
          }
          fill
          alt='Article Image'
          style={{
            objectFit: "cover",
          }}
        />
      </ImageContainer>

      <div className='row my-5 flex-lg-row-reverse'>
        <div className='col-lg-6 mb-3 '>
          <Header.h4 color={colors.black}>What we do</Header.h4>
          <div className='mb-3' />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
            officia pariatur impedit itaque nulla placeat laborum, omnis in,
            totam praesentium neque enim vero quasi debitis iure aspernatur
            laudantium tempora sint? Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Pariatur repellendus nam sequi totam asperiores
            molestiae fuga in, unde assumenda, culpa accusantium, vel omnis eum
            fugit deleniti iste nesciunt deserunt? Aspernatur.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            dolorem! Recusandae placeat voluptatem doloribus voluptatum tempora,
            nesciunt mollitia, minus quo repudiandae tenetur dolorem eligendi!
            Similique, nobis! Delectus sapiente voluptates cumque.
          </p>
        </div>
        <div className='col-lg-6 mb-3'>
          <ImageWrapper>
            <Image
              src={
                "https://postgraduateeducation.hms.harvard.edu/sites/default/files/media/4.21.22_When%20working%20with.jpg"
              }
              fill
              alt='Article Image'
              style={{
                objectFit: "cover",
              }}
            />
          </ImageWrapper>
        </div>
      </div>
      <div className='row my-5'>
        <div className='col-lg-6 mb-3'>
          <Header.h4 color={colors.black}>Our Mission</Header.h4>
          <div className='mb-3' />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iste
            officia pariatur impedit itaque nulla placeat laborum, omnis in,
            totam praesentium neque enim vero quasi debitis iure aspernatur
            laudantium tempora sint? Lorem ipsum, dolor sit amet consectetur
            adipisicing elit. Pariatur repellendus nam sequi totam asperiores
            molestiae fuga in, unde assumenda, culpa accusantium, vel omnis eum
            fugit deleniti iste nesciunt deserunt? Aspernatur.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi,
            dolorem! Recusandae placeat voluptatem doloribus voluptatum tempora,
            nesciunt mollitia, minus quo repudiandae tenetur dolorem eligendi!
            Similique, nobis! Delectus sapiente voluptates cumque.
          </p>
        </div>
        <div className='col-lg-6 mb-3'>
          <ImageWrapper>
            <Image
              src={
                "https://postgraduateeducation.hms.harvard.edu/sites/default/files/media/4.21.22_When%20working%20with.jpg"
              }
              fill
              alt='Article Image'
              style={{
                objectFit: "cover",
              }}
            />
          </ImageWrapper>
        </div>
      </div>
    </div>
  )
}

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  border-radius: 20px;
  overflow: hidden;
`
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 20rem;
  border-radius: 20px;
  overflow: hidden;
`
export default AboutUs
