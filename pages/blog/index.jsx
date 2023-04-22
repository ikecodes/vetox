import BlogCard from "@/components/BlogCard"
import Header from "@/components/Header"
import Loader from "@/components/Loader"
import PaginationDefault from "@/components/PaginationDefault"
import colors from "@/constants/colors"
import { useGetAllArticles } from "@/hooks/articles.hook"
import { articlesPagination } from "@/jotai/articles.state"
import { useAtom } from "jotai"
import React from "react"

const Index = () => {
  const [articleFilter, setArticleFilter] = useAtom(articlesPagination)
  const { data, isLoading, isFetching } = useGetAllArticles()
  const articles = data?.data?.data?.articles ?? []

  const handlePageClick = (event) => {
    setArticleFilter((prev) => ({ ...prev, page: event.selected + 1 }))
  }
  return (
    <div className='container'>
      <div className='text-center my-5'>
        <Header.h4 color={colors.black}>News & Articles</Header.h4>
      </div>
      {isLoading || isFetching ? (
        <div className='my-5'>
          <Loader />
        </div>
      ) : (
        <div className='row'>
          {articles.map((article, i) => (
            <div key={i} className='col-lg-4 col-md-6 mb-3'>
              <BlogCard article={article} />
            </div>
          ))}
        </div>
      )}
      <div className='d-flex justify-content-center'>
        {articles.length > 0 && (
          <PaginationDefault
            onPageChange={handlePageClick}
            pageCount={data?.data?.data?.totalPage}
          />
        )}
      </div>
    </div>
  )
}

export default Index
