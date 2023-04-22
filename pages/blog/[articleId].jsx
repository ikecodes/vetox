import Header from "@/components/Header"
import Loader from "@/components/Loader"
import colors from "@/constants/colors"
import { useGetArticle } from "@/hooks/articles.hook"
import moment from "moment"
import Image from "next/image"
import { useRouter } from "next/router"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import styled from "styled-components"

const BlogDetails = () => {
  const { query, asPath, push } = useRouter()
  const dispatch = useDispatch()
  const { value } = useSelector((state) => state.user)
  const { data, isLoading } = useGetArticle(query.articleId)

  const article = data?.data?.data ?? {}

  return (
    <div className='container my-5'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ImageContainer>
            <Image
              src={article?.image}
              fill
              alt='Article Image'
              style={{
                objectFit: "cover",
              }}
            />
          </ImageContainer>
          <div className='my-3'>
            <Header.h1 color={colors.black}>{article?.title}</Header.h1>
          </div>
          <p className='m-0 text-secondary'>
            Posted By <Author>{article?.author}</Author>,{" "}
            <Date>{moment(article?.createdAt).startOf("day").fromNow()}</Date>
          </p>
          <div className='border-bottom my-3 pb-2' />
          <div
            className='text-secondary'
            dangerouslySetInnerHTML={{ __html: article.description }}
          />
        </>
      )}
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
