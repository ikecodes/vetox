import colors from "@/constants/colors";
import React from "react";
import styled from "styled-components";
const SecondaryBtn = ({
  title,
  primary,
  handleClick,
  norounded,
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
  );
  return (
    <B
      primary={primary}
      norounded={norounded}
      disabled={disabled}
      onClick={handleClick}
    >
      {!loading && icon}
      {loading ? Loader : title}
    </B>
  );
};

const B = styled.button`
  background-color: ${colors.white};
  text-transform: capitalize;
  color: ${colors.headerColor};
  padding: 5px 20px;
  border-radius: ${(props) => (props.norounded ? "0" : "20px")};
  transition: all 0.2s linear;
  &:hover {
    transform: scale(1.05);
  }
`;
export default SecondaryBtn;
