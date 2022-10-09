import React, { useState } from 'react'
import styled from 'styled-components'
import PreFooter from '../components/Footer/PreFooter'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

const LandingPageStyles = styled.div`
    width: 100vw;
    height: 100vh;
`
function LandingPage() {
    const [open, setOpen] = useState({ cart: false, search: false, menu: false });
    return (
        <LandingPageStyles>
            <Header open={open} setOpen={setOpen} />
            <PreFooter />
            <Footer />
        </LandingPageStyles>
    )
}

export default LandingPage