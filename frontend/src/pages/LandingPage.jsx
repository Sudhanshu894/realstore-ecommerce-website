import React from 'react'
import styled from 'styled-components'
import NavbarMain from '../components/Navbar/NavbarMain'
import NavbarMid from '../components/Navbar/NavbarMid'
import NavbarTop from '../components/Navbar/NavbarTop'

const LandingPageStyles = styled.div`
    width: 100vw;
    height: 100vh;
`
function LandingPage() {
    return (
        <LandingPageStyles>
            <NavbarTop />
            <NavbarMid />
            <NavbarMain />
            <div style={{
                width: '65%',
                margin: '0 auto',
                height: '1500px',
                border: '1px solid black'
            }}>

            </div>
        </LandingPageStyles>
    )
}

export default LandingPage