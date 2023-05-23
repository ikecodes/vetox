import React from "react"
import Image from "next/image"
import Link from "next/link"
import { Card } from "react-bootstrap"
import styled from "styled-components"
import colors from "@/constants/colors"
import SecondaryBtn from "./SecondaryBtn"
import convertHtmlToPlainText from "@/utils/converHTMLToText"
import moment from "moment"
import { motion } from "framer-motion"
import PrimaryBtn from "./PrimaryBtn"

const BlogCard = ({ article }) => {
  return (
    <CardContainer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      viewport={{ once: true }}
      className='shadow'
    >
      <Card className='border-0 bg-light'>
        <ImageContainer>
          <Image
            src={article?.image}
            fill
            style={{ objectFit: "cover" }}
            alt='Solutions Image'
          />
        </ImageContainer>
        <Card.Body>
          <Text>{moment(article?.createdAt).format("LL")}</Text>
          <div>
            <Title className='text-capitalize text-secondary'>
              {article?.title}
            </Title>

            <Text>
              {convertHtmlToPlainText(article?.description.slice(0, 120))}...
            </Text>
            <Link href={`/blog/${article?._id}`}>
              <PrimaryBtn title={"Read more"} primary semirounded underline />
            </Link>
          </div>
        </Card.Body>
      </Card>
    </CardContainer>
  )
}

const CardContainer = styled(motion.div)`
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
