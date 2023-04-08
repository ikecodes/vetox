import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "react-bootstrap"
import styled from "styled-components"
import PrimaryBtn from "./PrimaryBtn"
import colors from "@/constants/colors"
import SecondaryBtn from "./SecondaryBtn"

const BlogCard = ({ title, image }) => {
  return (
    <CardContainer>
      <Card className='border-0 bg-light'>
        <ImageContainer>
          <Image
            src={image}
            fill
            style={{ objectFit: "cover" }}
            alt='Solutions Image'
          />
        </ImageContainer>
        <Card.Body>
          <Text>November 15, 2022</Text>
          <div>
            <Title className='text-capitalize text-secondary'>{title}</Title>
            <Text>
              It is a long established fact that a reader will be distracted by
              the readable content of a page from when looking at it layout. The
              point of using Lorem Ipsum
            </Text>
            <Link href={`/blog/1`}>
              <SecondaryBtn title={"Read more"} primary semirounded underline />
            </Link>
          </div>
        </Card.Body>
      </Card>
    </CardContainer>
  )
}

const CardContainer = styled.div`
  border-radius: 20px;
  overflow: hidden;
`
const ImageContainer = styled.div`
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 15rem;
  width: 100%;
`
const Title = styled.h4`
  min-height: 45px;
  font-weight: 600;
  color: ${colors.grey5};
`
const Text = styled.p`
  color: ${colors.grey6};
`
export default BlogCard
