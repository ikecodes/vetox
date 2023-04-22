import React from "react"
import styled from "styled-components"
import ReactPaginate from "react-paginate"
import { FiArrowLeft, FiArrowRight } from "react-icons/fi"
import colors from "@/constants/colors"

const PaginationDefault = ({ onPageChange, pageCount, forcePage }) => {
  return (
    <MainContainer>
      <ReactPaginate
        breakLabel='...'
        nextLabel={
          <button className='pagination_button'>
            <FiArrowRight size={20} />
          </button>
        }
        onPageChange={onPageChange}
        pageRangeDisplayed={5}
        forcePage={forcePage}
        pageCount={pageCount}
        previousLabel={
          <button className='pagination_button'>
            <FiArrowLeft size={20} />
          </button>
        }
        renderOnZeroPageCount={null}
        containerClassName='pagination'
        activeLinkClassName='pagination_active'
      />
    </MainContainer>
  )
}

export default PaginationDefault

const MainContainer = styled.div`
  .pagination {
    display: flex;
    justify-content: flex-start !important;
    align-items: center;
    padding: 1rem;
    margin: 1rem auto;
    border: 0px;
    align-self: flex-start;
    gap: 1rem;
  }

  .pagination_button {
    padding: 0.5rem;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: ${colors.primary};
    color: ${colors.white};
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .pagination_active {
    width: 30px;
    height: 30px;
    background-color: ${colors.secondary};
    text-decoration: none;
    font-weight: 600;
    color: ${colors.primary};
    display: flex;
    justify-content: center;
    align-items: center;
  }
`
