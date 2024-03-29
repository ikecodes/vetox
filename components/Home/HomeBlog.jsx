import colors from "@/constants/colors"
import React from "react"
import Header from "../Header"
import BlogCard from "../BlogCard"
import { useGetFeaturedArticles } from "@/hooks/articles.hook"
import styled from "styled-components"

const articles = [
  {
    title: "Ventilation Accessories",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe amet exercitationem velit similique ipsam voluptas accusantium consequatur eius ratione optio omnis corrupti, quibusdam reprehenderit culpa minima? Recusandae optio dolor eligendi!",
  },
  {
    title: "Medical Supply Systems",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe amet exercitationem velit similique ipsam voluptas accusantium consequatur eius ratione optio omnis corrupti, quibusdam reprehenderit culpa minima? Recusandae optio dolor eligendi!",
  },
  {
    title: "Patient Monitoring Systems",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
    description:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Saepe amet exercitationem velit similique ipsam voluptas accusantium consequatur eius ratione optio omnis corrupti, quibusdam reprehenderit culpa minima? Recusandae optio dolor eligendi!",
  },
]

const HomeBlog = () => {
  const { data } = useGetFeaturedArticles()

  const articles = data?.data?.data ?? []
  return (
    <Container>
      <div className='container'>
        <div className='text-center'>
          <Header.h4 color={colors.black}>From our blog</Header.h4>
          <div className='mb-3' />
        </div>
        <div className='row justify-content-center'>
          {articles.map((article, i) => (
            <div key={i} className='col-lg-4 col-md-6 mb-3'>
              <BlogCard article={article} />
            </div>
          ))}
        </div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  overflow: hidden;
  background-color: ${colors.grey1};
  padding: 5rem;
  @media (max-width: 567px) {
    padding: 5rem 0.5rem;
  }
`

export default HomeBlog
