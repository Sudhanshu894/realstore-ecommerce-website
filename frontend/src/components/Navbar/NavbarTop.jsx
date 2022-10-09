import React from 'react'
import styled from 'styled-components'

const NavTopStyles = styled.div`

    width: 100vw;
    height: 4rem;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #FFF;
    

    .navTop {
        width: 1230px;
        height: 100%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 0.9rem;
        
        

        & > div{
            display: flex;
            align-items: center;
        }

        .nTop-1{
            gap: 1.5rem;
        }

        .nTop-1 > p > a{
            font-family: 'Poppins', sans-serif;
            font-weight: 500;
            color: #424242e8;
        }

        .nTop-1 > p{
            font-family: 'Poppins', sans-serif;
            color: #424242;
            font-weight: 600;

            span{
                font-family: 'Poppins', sans-serif;
                font-weight: 700;
                color: #BEBEBE;
            }
        }

        .nTop-2{

            ul {
                display: flex;
                height: 100%;
                align-items: center;
                gap: 1.5rem;

                li{
                    font-family: 'Poppins', sans-serif;
                    color: #424242;
                    font-weight: 450;
                }
                li > a{
                    font-family: 'Poppins', sans-serif;
                    color: #424242;
                    font-weight: 500;
                }
            }
        }
    }


    @media (max-width: 1380px){
        .navTop{
            width: 980px;
        }
    }
`


function NavbarTop({ isMobile }) {
    return (
        <NavTopStyles style={{ backgroundColor: isMobile ? '#f7f7f7' : '' }}>
            <div className='navTop' style={{ width: isMobile ? "80%" : '' }}>
                <div className='nTop-1'>
                    <p><a href="#">$ USD</a></p>
                    <p> <span>Call us: </span> +91 4320 423 214 </p>
                </div>
                <div className='nTop-2'>
                    <ul>
                        <li><a href="#">Contact us</a></li>
                        {!isMobile && <><li>Sign out</li>
                            <li>Sidhart Sharma</li></>}
                    </ul>
                </div>
            </div>
        </NavTopStyles>
    )
}

export default NavbarTop