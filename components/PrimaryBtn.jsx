import colors from "@/constants/colors";
import React from "react";
import styled from "styled-components";
const PrimaryBtn = ({
  title,
  primary,
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
      primary={primary}
      norounded={norounded}
      semirounded={semirounded}
      disabled={disabled}
      onClick={handleClick}
    >
      <span className='m-0'> {loading ? Loader : title}</span>

      {!loading && icon}
    </B>
  )
}

const B = styled.button`
  /* display: flex;
  align-items: center;
  justify-content: center; */
  background-color: ${(props) =>
    props.primary ? colors.primary : colors.white};
  text-transform: capitalize;
  color: ${(props) => (props.primary ? colors.white : colors.primary)};
  padding: 5px 20px;
  border-radius: ${({ norounded, semirounded }) =>
    norounded ? "0" : semirounded ? "5px" : "20px"};
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.05);
  }
`
export default PrimaryBtn;
