import React from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import carticon from '../../assets/imgs/bag.svg'

const OpenCartStyles = styled.div`
     width: 100%;
    height: fit-content;
    .copen{
        width: 90%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        margin: 2rem auto;

        h3{
            font-size: 1.45rem;
            text-align: center;
            font-weight: 600;
            color: #181818;
            cursor: pointer;
            padding: 1rem 0 2rem 0;
        }
        .cartitems {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            justify-content: center;
            margin-bottom: 2rem;

            p{
                text-align: center;
                opacity: 0.4;
                font-size: 1.1rem;
            }
            img{
                width: 100px;
                height: 100px;
                margin: 0 auto;
            }
        }
        button{
            width: 70%;
            height: 3.5rem;
            align-self: center;
            color: #FFF;
            background-color: #00C37A;
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
            border: none;
            border-radius: 5px;

            &:disabled{
                opacity: 0.7;
            }
        }
    }
`
function CartOpen({ isAuth }) {
    const navigate = useNavigate();
    return (
        <OpenCartStyles>
            <div className='copen'>
                <h3>SHOPPING CART</h3>
                {!isAuth && <p style={{ textAlign: 'center', paddingBottom: '1rem', color: 'tomato', fontWeight: 500, fontFamily: 'Poppins,sans-serif' }}>Please <span style={{ cursor: 'pointer', fontWeight: 'bold', fontFamily: 'Poppins,sans-serif' }} onClick={() => {
                    navigate('/login');
                }}>login</span> to use Cart</p>}
                <div className="cartitems">
                    <p>Cart is empty</p>
                    <img style={{ opacity: 0.2 }} src={carticon} alt="" />
                </div>
                <button onClick={() => {
                    navigate('/products')
                }} disabled={!isAuth}>CONTINUE SHOPPING</button>
            </div>
        </OpenCartStyles>
    )
}

export default CartOpen