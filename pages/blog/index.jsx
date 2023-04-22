import BlogCard from "@/components/BlogCard"
import EmptyState from "@/components/EmptyState"
import Header from "@/components/Header"
import Loader from "@/components/Loader"
import PaginationDefault from "@/components/PaginationDefault"
import colors from "@/constants/colors"
import { useGetAllArticles } from "@/hooks/articles.hook"
import { articlesPagination } from "@/jotai/articles.state"
import { useAtom } from "jotai"
import Image from "next/image"
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
        <>
          {articles.length === 0 ? (
            <EmptyState
              image={
                <Image
                  src={"/emptyCart.svg"}
                  width={200}
                  height={200}
                  alt='Empty state'
                />
              }
              title={"No products found!"}
              body={"No products found on this category"}
              route={"/products"}
            />
          ) : (
            <div className='row'>
              {articles.map((article, i) => (
                <div key={i} className='col-lg-4 col-md-6 mb-3'>
                  <BlogCard article={article} />
                </div>
              ))}
            </div>
          )}
        </>
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
