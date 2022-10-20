import React from 'react'
import styled from 'styled-components'

const NotFoundPageStyle = styled.div`
    width: 100vw;
    height: fit-content;
    .main{
        width: 80%;
        height: fit-content;
        margin: 0 auto;
        padding: 3rem;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        *{
            font-family: 'Poppins',sans-serif;
        }
        p{
            color: #353535;
            font-size: 1.5rem;
            font-weight: 500;
        }
        img{
            width: 50%;
            height: auto;
            border-radius: 10px;
        }
        h1{
            font-size: 2.5rem;
            color: #00C37A;
            font-weight: 700;
        }
    }
    @media (min-width: 991px) and (max-width: 1380px){
        .main{
            width: 80%;
            img{
                width: 80%;
            }
        }
    }
    @media (min-width: 768px) and (max-width: 990px) {
        .main{
            width: 80%;
            p{
                font-size: 1.2rem;
                font-weight: 400;
            }
            img{
                width: 80%;
            }
            h1{
                font-size: 2rem;
                font-weight: 600;
            }
        }
        
    }
    @media (max-width: 767px){
        .main{
            width: 90%;
            p{
                font-size: 1.1rem;
                font-weight: 400;
            }
            img{
                width: 80%;
            }
            h1{
                font-size: 1.8rem;
                font-weight: 600;
            }
        }
    }
`

function NotFound() {
    return (
        <NotFoundPageStyle>
            <div className="main">
                <p>Looks like you are lost !</p>
                <img src="https://media1.giphy.com/media/UoeaPqYrimha6rdTFV/giphy.gif" alt="" />
                <h1>Page Not Found</h1>
            </div>
        </NotFoundPageStyle>
    )
}

export default NotFound