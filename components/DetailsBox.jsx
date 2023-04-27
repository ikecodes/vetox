import React from "react"
import { Card } from "react-bootstrap"

import styled from "styled-components"

const DetailBox = ({ icon, iconBg, bg, value, textColor, text }) => {
  return (
    <div className='col-lg-4 col-md-6 mb-3'>
      <Card className='border-0 rounded'>
        <Container bg={bg} className='p-5 rounded shadow'>
          <div className='d-flex gap-3'>
            <IconBox iconBg={iconBg}>{icon}</IconBox>
            <Text textColor={textColor}>
              <h6 className='text-uppercase'>{text}</h6>
              <h2>{value}</h2>
            </Text>
          </div>
        </Container>
      </Card>
    </div>
  )
}

const Container = styled.div`
  background: ${(props) => props.bg};
`
const IconBox = styled.div`
  background: ${(props) => props.iconBg};
  display: grid;
  place-content: center;
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
`
const Text = styled.div`
  color: ${(props) => props.textColor};
`
export default DetailBox
