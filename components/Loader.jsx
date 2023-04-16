import React from "react"
import styled from "styled-components"

const Loader = () => {
  return (
    <Container>
      <div class='sk-chase'>
        <div class='sk-chase-dot'></div>
        <div class='sk-chase-dot'></div>
        <div class='sk-chase-dot'></div>
        <div class='sk-chase-dot'></div>
        <div class='sk-chase-dot'></div>
        <div class='sk-chase-dot'></div>
      </div>
    </Container>
  )
}

const Container = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  place-content: center;
  position: relative;
`
export default Loader
