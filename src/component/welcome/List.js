import React from "react"
import styled from "styled-components"

const Body = styled.div`
display: flex;
justify-content: center;
align-items: center;
text-align: center;
flex-direction: column;
height: 100vh;

`

const Head = styled.div`
  color: black;
  font-size: 1.5rem;
`

const Password = () => (
    <Body>
        <div className="logo7">
            <div className="logow" />
        </div>
        <Head>
            We are currently working <br /> on the password recovery feature,
            <br />
            please try again soon!
        </Head>
    </Body>
)

export default Password
