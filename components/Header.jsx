import colors from "@/constants/colors"
import React from "react"
import styled from "styled-components"

const Header = ({ children, color }) => {
  return <Header1 color={color}>{children}</Header1>
}

const h1 = ({ children, color }) => <Header1 color={color}>{children}</Header1>
Header.h1 = h1

const h3 = ({ children, color, light, normal }) => (
  <Header3 light={light} normal={normal} color={color}>
    {children}
  </Header3>
)
Header.h3 = h3

const h4 = ({ children, color, light, normal }) => (
  <Header4 light={light} normal={normal} color={color}>
    {children}
  </Header4>
)
Header.h4 = h4

const h5 = ({ children, color, light, normal }) => (
  <Header5 color={color} light={light} normal={normal}>
    {children}
  </Header5>
)
Header.h5 = h5

const h6 = ({ children, color, light, normal }) => (
  <Header6 color={color} light={light} normal={normal}>
    {children}
  </Header6>
)
Header.h6 = h6

const Header1 = styled.h1`
  color: ${({ color }) => (color ? color : colors.primary)};
  font-weight: 700;
  margin: 0;
`
const Header3 = styled.h3`
  color: ${({ color }) => (color ? color : colors.grey3)};
  font-weight: ${({ light, normal }) =>
    light ? "lighter" : normal ? "normal" : "bold"};
  margin: 0;
`

const Header4 = styled.h4`
  color: ${({ color }) => (color ? color : colors.grey3)};
  font-weight: ${({ light, normal }) =>
    light ? "lighter" : normal ? "normal" : "bold"};
  margin: 0;
`
const Header5 = styled.h5`
  color: ${({ color }) => (color ? color : colors.grey3)};
  font-weight: ${({ light, normal }) =>
    light ? "lighter" : normal ? "normal" : "bold"};
  margin: 0;
`
const Header6 = styled.h6`
  color: ${({ color }) => (color ? color : colors.grey3)};
  font-weight: ${({ light, normal }) =>
    light ? "lighter" : normal ? "normal" : "bold"};
  margin: 0;
`
export default Header
