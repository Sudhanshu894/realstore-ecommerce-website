import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const BillStyles = styled.div`

    padding-top: 3rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    & > div{
        display: flex;
    }
    *{
        font-family: 'Poppins',sans-serif;
    }
    .code,.tot-bill{
        justify-content: space-between;
        align-items: center;
    }
    .price-summary{
        flex-direction: column;
        gap: 0.2rem;
        div{
            display: flex;
            justify-content: space-between;
            align-items: center;
            p{
                font-size: 1.1rem;
                font-weight: 400;
            }
            span{
                font-size: 1.1rem;
                font-weight: 500;
            }
        }
    }
    .code{
        p{
            font-size: 1.2rem;
            font-weight: 500;
        }
    }
    .tot-bill{
        padding: 1.5rem 0;
        border-top: 0.5px solid #BEBEBE;
        border-bottom: 0.5px solid #BEBEBE;
        p{
            font-size: 1.1rem;
            font-weight: 400;
        }
        span{
            font-size: 1.1rem;
            font-weight: 500;
        }
    }
    button{
        width: 90%;
        margin: 0 auto;
        height: 4rem;
        background-color: #00C37A;
        border:none;
        border-radius: 5px;
        color: #FFF;
        font-size: 1rem;
        font-weight: 500;
        opacity: 0.9;
        transition: all 0.2s ease-in-out;
        cursor: pointer;

        &:hover{
            opacity: 1;
            transform: translateY(-3px);
        }
    }
`

function Billing({ length, total, txt, link }) {
    const navigate = useNavigate();
    return (
        <BillStyles>
            <div className="price-summary">
                <div>
                    <p>{length} Items</p>
                    <span>₹{total}</span>
                </div>
                <div>
                    <p>{"Shipping"}</p>
                    <span>₹100</span>
                </div>
            </div>
            <div className="code">
                <p>Have a promo code ?</p>
            </div>
            <div className="tot-bill">
                <p>{"Total (Tax excl.)"}</p>
                <span>₹{total + 100}</span>
            </div>
            <button onClick={() => {
                navigate(link);
            }}>
                {txt}
            </button>
        </BillStyles>
    )
}

export default Billing