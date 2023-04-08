import Header from "@/components/Header"
import colors from "@/constants/colors"
import Image from "next/image"
import React from "react"
import styled from "styled-components"

const BlogDetails = () => {
  return (
    <div className='container my-5'>
      <ImageContainer>
        <Image
          src={
            "https://thumbs.dreamstime.com/b/blog-information-website-concept-workplace-background-text-view-above-127465079.jpg"
          }
          fill
          alt='Article Image'
          style={{
            objectFit: "cover",
          }}
        />
      </ImageContainer>
      <div className='my-3'>
        <Header.h1 color={colors.black}>
          Top 10 ways to get quality medical equipment
        </Header.h1>
      </div>
      <p className='m-0 text-secondary'>
        Posted By <Author>John Doe</Author>, <Date>November 10 2022</Date>
      </p>
      <div className='border-bottom my-3 pb-2' />

      <p className='text-secondary'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Totam
        assumenda, quas sapiente maxime, voluptatibus velit maiores veniam
        voluptates suscipit molestias aspernatur tempora ratione eveniet non, ab
        ipsum rerum perferendis labore! Lorem ipsum, dolor sit amet consectetur
        adipisicing elit. Molestiae, natus nam sequi voluptate laborum
        blanditiis minus omnis porro aspernatur voluptatum culpa reiciendis
        cupiditate, eius labore sint. Officiis eius aspernatur odit.
      </p>
      <p className='text-secondary'>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum, illo?
        Aperiam accusamus fuga, facilis quaerat beatae ad repellat totam dolor
        voluptatem maiores, amet expedita, nam quibusdam et soluta. Illo, harum.
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel corrupti
        libero iure porro, doloremque voluptate maxime sapiente omnis aspernatur
        officiis consequuntur quibusdam nisi voluptatem sed repellendus
        molestiae mollitia! Facilis, explicabo.
      </p>
    </div>
  )
}

const Author = styled.span`
  color: ${colors.black};
  font-weight: bold;
`
const Date = styled.span`
  font-style: italic;
`
const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  border-radius: 20px;
  overflow: hidden;
`
export default BlogDetails
