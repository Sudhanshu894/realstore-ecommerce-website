import { Button } from '@material-ui/core'
import React from 'react'
import styled from 'styled-components'

const ContactPageStyle = styled.div`
    width: 80%;
    height: 30vh;
    display: grid;
    place-items: center;
    margin: 1rem auto;
    a{
        button{
            font-size: 3rem;
            font-family: 'Poppins',sans-serif;
            font-weight: 500;
            padding: 1rem 2rem;
        }
    }
`

function ContactPage() {
    return (
        <ContactPageStyle>
            <a className="mailBtn" href="mailto:sidharts894@gmail.com">
                <Button>Contact: sidharts894@gmail.com</Button>
            </a>
        </ContactPageStyle>
    )
}

export default ContactPage