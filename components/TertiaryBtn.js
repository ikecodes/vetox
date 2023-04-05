import colors from "@/constants/colors"
import React from "react"
import styled from "styled-components"

const TertiaryBtn = ({
  title,
  handleClick,
  norounded,
  semirounded,
  loading,
  disabled,
  icon,
}) => {
  const Loader = (
    <div className='spinner'>
      <div className='bounce1'></div>
      <div className='bounce2'></div>
      <div className='bounce3'></div>
    </div>
  )
  return (
    <B
      norounded={norounded}
      semirounded={semirounded}
      disabled={disabled}
      onClick={handleClick}
    >
      {loading ? Loader : title}
      {!loading && icon}
    </B>
  )
}

const B = styled.button`
  background-color: ${colors.secondary};
  color: ${colors.primary};
  text-transform: capitalize;
  padding: 7px 35px;
  border-radius: ${({ norounded, semirounded }) =>
    norounded ? "0" : semirounded ? "5px" : "20px"};
  transition: all 0.2s linear;
  &:hover {
    background-color: ${colors.primary};
    color: ${colors.white};
    transform: scale(1.1);
  }
`
export default TertiaryBtn
