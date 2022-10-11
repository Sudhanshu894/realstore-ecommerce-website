import React from 'react'
import styled from 'styled-components'
import home from '../../assets/imgs/home.svg'
const MenuOpenStyles = styled.div`
    width: 100%;
    height: fit-content;
    .mopen{
        width: 90%;
        height: fit-content;
        display: flex;
        margin: 1rem auto;
        flex-direction: column;
        gap: 2rem;

        & > div, & > div > p{
            font-size: 1.3rem;
            font-weight: 500;
            color: #181818;
            transition: 0.3s ease-in-out;
        }
        .msignin{
            font-size: 1rem;
            font-family: 'Poppins', sans-serif;
            width: fit-content;
            padding: 0 2rem 1.5rem 0;
            border-bottom: 1px solid #d1d1d1;
        }
        .macc{
            padding-bottom: 2.5rem;
        }
        .navlinks{
            display: flex;
            flex-direction: column;
            gap: 1.8rem;

            & > div:hover{
                color: #00C37A;
                cursor: pointer;
                p{
                    color: #00C37A;
                    cursor: pointer;
                }
            }
            .mhome{
                display: flex;
                gap: 0.6rem;
            }
        }

    }
    img{
        width: 20px;
        height: 20px;
    }

    @media (max-width: 767px){
        .mopen{
            width: 80%;
        }
    }
`

function MenuOpen() {
    return (
        <MenuOpenStyles>
            <div className="mopen">
                <div className='msignin'>Signin</div>
                <div className='macc'>ACCOUNT</div>
                <div className="navlinks">
                    <div className="mhome">
                        <img src={home} alt="" />
                        <span>HOME</span>
                    </div>
                    <div className="mcat">
                        <p>CATEGORIES</p>
                    </div>
                    <div className="mcontent">
                        <p>CONTENT</p>
                    </div>
                    <div className="mabout">
                        <p>ABOUT US</p>
                    </div>
                    <div className="mblog">
                        <p>BLOG</p>
                    </div>
                    <div className="mcontact">
                        <p>CONTACT US</p>
                    </div>
                </div>
            </div>
        </MenuOpenStyles>
    )
}

export default MenuOpen