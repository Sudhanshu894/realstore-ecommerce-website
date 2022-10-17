import React from 'react'
import styled from 'styled-components'
import VerifiedIcon from '@material-ui/icons/VerifiedUser';

const SuccessPageStyles = styled.div`
    width: 1230px;
    height: 20vh;
    margin: 2rem auto;
    padding: 2rem;
    display: grid;
    place-items: center;

    & > div{
        width: 90%;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;
        justify-content: center;
        margin: 0 auto;
        h2{
            font-family: 'Poppins',sans-serif;
            font-size: 2.5rem;
            font-weight: 600;
            color: #008000;
        }
        svg{
            color: #0ab94d;
            width: 5rem;
            height: 5rem;
            border-radius: 50%;
        }
    }
    @media (min-width: 991px) and (max-width: 1330px){
        width: 980px;
    }
    @media (min-width: 768px) and (max-width: 990px){
        width: 80%;
        & > div{
            svg{
                width: 4rem;
                height: 4rem;
            }
        }
    }
    @media (max-width: 767px){
        width: 90%;
        padding: 0;

        &> div{
            width: 100%;
            h2{
                font-size: 1.8rem;
            }
            svg{
                width: 3.5rem;
                height: 3.5rem;
            }
        }
    }
`

function ConfirmPay() {
    return (
        <SuccessPageStyles>

            <div>
                <h2>Payment Successfull !!!</h2>
                <VerifiedIcon />
            </div>
        </SuccessPageStyles>
    )
}

export default ConfirmPay