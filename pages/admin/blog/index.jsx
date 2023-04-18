import React, { useState } from "react"
import paginationFactory, {
  PaginationListStandalone,
  PaginationProvider,
} from "react-bootstrap-table2-paginator"
import ToolkitProvider, {
  Search,
} from "react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit"
import BootstrapTable from "react-bootstrap-table-next"
import { Row, Col } from "react-bootstrap"
import DeleteModal from "@/components/modals/DeleteModal"
import PrimaryBtn from "@/components/PrimaryBtn"
import SecondaryBtn from "@/components/SecondaryBtn"
import ArticleModal from "@/components/modals/ArticleModal"
import { useGetArticles, useUpdateArticle } from "@/hooks/articles.hook"
import convertHtmlToPlainText from "@/utils/converHTMLToText"
import Image from "next/image"

const Index = () => {
  const { data: allArticles } = useGetArticles()
  const { mutate } = useUpdateArticle()
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [showArticleModal, setShowArticleModal] = useState(false)
  const [deletetype, setDeleteType] = useState("")
  const [deleteid, setDeleteId] = useState(null)
  const [editdata, setEditData] = useState(null)

  // useEffect(() => {
  //   async function getProd() {
  //     const { data } = await API.get("/products")
  //     console.log(data)
  //   }
  //   getProd()
  // }, [])

  const data = allArticles?.data?.data ?? []
  const { SearchBar } = Search
  const sizePerPage = 10
  const pageOptions = {
    sizePerPage: sizePerPage,
    totalSize: data?.length, // replace later with size(users),
    custom: true,
  }
  const defaultSorted = [
    {
      dataField: "id", // if dataField is not match to any column you defined, it will be ignored.
      order: "desc", // desc or asc
    },
  ]
  const dataListColumns = [
    {
      text: "id",
      dataField: "id",
      hidden: true,
      formatter: (data) => <>{data._id}</>,
    },
    {
      dataField: "sl.no",
      text: "S/n.",
      formatter: (cell, row, rowIndex, formatExtraData) => {
        return rowIndex + 1
      },
    },
    {
      dataField: "title",
      text: "Title",
    },
    {
      dataField: "author",
      text: "Author",
    },
    {
      dataField: "description",
      text: "Description",
      formatter: (cellContent, data) => (
        <div>{convertHtmlToPlainText(data.description).slice(0, 100)}...</div>
      ),
    },
    {
      dataField: "image",
      text: "Image",
      formatter: (cellContent, data) => (
        <Image src={data.image} width={70} height={70} alt='Image' />
      ),
    },
    {
      dataField: "isFeatured",
      text: "Featured",
      sort: true,
      formatter: (cellContent, data) => (
        <div
          onClick={async () => {
            const formdata = {
              articleId: data._id,
              isFeatured: !data.isFeatured,
            }
            const successMsg = data.isFeatured
              ? "Article is no longer featured"
              : "Article is now featured on your website"

            mutate(formdata, {
              onSuccess: () => {
                toast.success(successMsg)
              },
              onError: (e) => {
                toast.error(
                  e?.response?.data?.message ?? "Something went wrong"
                )
              },
            })
          }}
        >
          {data.isFeatured ? (
            <span className='badge bg-success' role='button'>
              featured
            </span>
          ) : (
            <span className='badge bg-danger' role='button'>
              not featured
            </span>
          )}
        </div>
      ),
    },
    {
      dataField: "details",
      text: "Action",
      formatter: (cellContent, data) => (
        <div className='d-flex gap-2'>
          <SecondaryBtn
            color='#ABA0F3'
            title='remove'
            handleClick={() => {
              setDeleteId(data._id)
              setDeleteType("article")
              setDeleteModalShow(true)
            }}
          />
          {/* <SecondaryBtn
            color={colors.darkBlue}
            title='update'
            handleClick={() => {
              setEditData(data)
              setShowArticleModal(true)
            }}
          /> */}
        </div>
      ),
    },
  ]

  const keyField = "id"
  return (
    <div className='w-100 mt-5'>
      <div className='d-flex  justify-content-end'>
        <PrimaryBtn
          title='add article'
          primary
          handleClick={() => {
            setEditData(null)
            setShowArticleModal(true)
          }}
        />
      </div>

      <h6 className='text-uppercase'>ARTICLES</h6>
      <div className='bg-white p-3'>
        <PaginationProvider
          pagination={paginationFactory(pageOptions)}
          keyField={keyField}
          columns={dataListColumns}
          data={data}
        >
          {({ paginationProps, paginationTableProps }) => {
            return (
              <ToolkitProvider
                keyField={keyField}
                data={data}
                columns={dataListColumns}
                bootstrap4
                search
              >
                {(toolkitProps) => (
                  <div style={{ fontSize: "0.8rem" }}>
                    <div className='row mb-2'>
                      <div className='col-lg-6'>
                        <div className='search-box ms-2 mb-2 d-inline-block'>
                          <div className='position-relative'>
                            <SearchBar {...toolkitProps.searchProps} />
                            <i className='bx bx-search-alt search-icon' />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='table-responsive'>
                      <BootstrapTable
                        keyField={keyField}
                        {...toolkitProps.baseProps}
                        {...paginationTableProps}
                        defaultSorted={defaultSorted}
                        classes={"table align-middle table-nowrap "}
                        bordered={false}
                        striped={false}
                        responsive
                      />
                      {!data.length ? (
                        <p>You currently do not have any article</p>
                      ) : null}
                      <DeleteModal
                        deletetype={deletetype}
                        deleteid={deleteid}
                        show={deleteModalShow}
                        onHide={() => setDeleteModalShow(false)}
                      />
                      <ArticleModal
                        data={editdata}
                        show={showArticleModal}
                        onHide={() => setShowArticleModal(false)}
                      />
                    </div>
                    <Row className='align-items-md-center mt-30'>
                      <Col className='pagination pagination-rounded justify-content-end mb-2'>
                        <PaginationListStandalone {...paginationProps} />
                      </Col>
                    </Row>
                  </div>
                )}
              </ToolkitProvider>
            )
          }}
        </PaginationProvider>
      </div>
    </div>
  )
}

export default Index
