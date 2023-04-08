import BlogCard from "@/components/BlogCard"
import Header from "@/components/Header"
import colors from "@/constants/colors"
import React from "react"

const articles = [
  {
    title: "Ventilation Accessories",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
  },
  {
    title: "Medical Supply Systems",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
  },
  {
    title: "Patient Monitoring Systems",
    image:
      "https://1.cms.s81c.com/sites/default/files/2021-08-24/ELM_Industries_medical_devices_manage_complexity_video_700x394.jpg",
  },
]
const index = () => {
  return (
    <div className='container'>
      <div className='text-center my-5'>
        <Header.h4 color={colors.black}>News & Articles</Header.h4>
      </div>
      <div className='row'>
        {articles.map((article, i) => (
          <div key={i} className='col-lg-4 col-md-6 mb-3'>
            <BlogCard title={article.title} image={article.image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default index
