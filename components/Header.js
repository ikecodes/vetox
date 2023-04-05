import colors from "@/constants/colors"
import React from "react"
import styled from "styled-components"

const Header = ({ children }) => {
  return <Header1>{children}</Header1>
}

const h1 = ({ children }) => <Header1>{children}</Header1>
Header.h1 = h1

const h4 = ({ children, color }) => <Header4 color={color}>{children}</Header4>
Header.h4 = h4

const Header1 = styled.h1`
  color: ${colors.primary};
  font-weight: 700;
  margin-bottom: 1.5rem;
`
const Header4 = styled.h4`
  color: ${({ color }) => (color ? color : colors.grey3)};
  font-weight: 600;
  margin-bottom: 1.5rem;
`
export default Header
