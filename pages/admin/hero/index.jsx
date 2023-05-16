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
import convertHtmlToPlainText from "@/utils/converHTMLToText"
import Image from "next/image"
import { FiEdit, FiTrash } from "react-icons/fi"
import HeroModal from "@/components/modals/HeroModal"
import { useGetHeros } from "@/hooks/hero.hook"

const Index = () => {
  const { data: allHeros } = useGetHeros()
  const [deleteModalShow, setDeleteModalShow] = useState(false)
  const [showHeroModal, setShowHeroModal] = useState(false)
  const [deletetype, setDeleteType] = useState("")
  const [deleteid, setDeleteId] = useState(null)
  const [editdata, setEditData] = useState(null)

  const data = allHeros?.data?.data ?? []
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
      dataField: "action",
      text: "Action",
      formatter: (cellContent, data) => (
        <div className='d-flex gap-3 align-items-center'>
          <span
            role='button'
            onClick={() => {
              setEditData(data)
              setShowHeroModal(true)
            }}
          >
            <FiEdit size={20} className='text-success' />
          </span>
          <span
            role='button'
            onClick={() => {
              setDeleteId(data._id)
              setDeleteType("hero")
              setDeleteModalShow(true)
            }}
          >
            <FiTrash size={20} title='update' className='text-danger' />
          </span>
        </div>
      ),
    },
  ]

  const keyField = "id"
  return (
    <div className='w-100 mt-5'>
      <div className='d-flex  justify-content-end'>
        <PrimaryBtn
          title='add hero'
          primary
          handleClick={() => {
            setEditData(null)
            setShowHeroModal(true)
          }}
        />
      </div>

      <h6 className='text-uppercase'>HERO</h6>
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
                        <p>You currently do not have any hero</p>
                      ) : null}
                      <DeleteModal
                        deletetype={deletetype}
                        deleteid={deleteid}
                        show={deleteModalShow}
                        onHide={() => setDeleteModalShow(false)}
                      />
                      <HeroModal
                        data={editdata}
                        show={showHeroModal}
                        onHide={() => setShowHeroModal(false)}
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
