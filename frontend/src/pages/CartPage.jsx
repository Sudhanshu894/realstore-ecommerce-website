import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import arrow from '../assets/arrow.svg';
import CartItem from '../components/Cart/CartItem';
import { Removefromcart } from '../redux/CartRed/Actions'
import carticon from '../assets/bag.svg'
import Billing from '../components/Cart/Billing';

const CartPageStyles = styled.div`
    width: 100vw;
    height: fit-content;
    margin: 2rem 0;
    .wrapper{
        width: 1230px;
        height: fit-content;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 0.5fr;
        gap: 1rem;
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
            max-width: 300px;
            height: 3.5rem;
            align-self: center;
            color: #FFF;
            background-color: #00C37A;
            text-align: center;
            font-size: 1.2rem;
            font-weight: 600;
            border: none;
            border-radius: 5px;
            margin-top: 3rem;

            &:disabled{
                opacity: 0.7;
            }
        }
        & > div{
            padding: 2rem 3rem;
            background-color: #FFF;

            h2{
                font-size: 1.6rem;
                font-weight: bold;
                border-bottom: 0.5px solid #BEBEBE;
                padding-bottom: 1rem;
                margin: 1rem 0 2rem 0;
                cursor: pointer;

                &:hover{
                    color: #00C37A;
                }
            }

            .cart-items{
                width: 100%;
                height: fit-content;
                overflow-y: auto;
                scrollbar-width: none;
                margin: 1rem 0;
                padding: 1rem 0;
                -ms-overflow-style: none;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                &::-webkit-scrollbar {
                    width: 5px;
                }
                *{
                    font-family: 'Poppins',sans-serif;
                }
            }
        }
    }
    .continue{
        width: 1230px;
        margin: 2rem auto;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        cursor: pointer;

        img{
            rotate: 90deg;
            width: 1.1rem;
            height: auto;
        }
        p{
            font-size: 0.9rem;
            font-weight: 500;
            font-family: 'Poppins',sans-serif;
        }
    }

    @media (min-width: 991px) and (max-width: 1380px){
        .wrapper{
            width: 980px;
                & > div{
                padding: 1.5rem 2.5rem;
                background-color: #FFF;

                h2{
                    font-size: 1.5rem;
                }

            }
        }  
        .continue{
            width: 990px;
        }
    }
    @media (min-width: 768px) and (max-width: 990px) {
        .wrapper{
            width: 90%;
            grid-template-columns: 1fr 0.8fr;
            
            & > div{
                .cart-items{
                    gap: 2rem;
                }
            }
        }
        .continue{
            width: 90%;
            margin: 1.5rem auto;
        }
    }
    @media (max-width: 767px){
        .wrapper{
            width: 90%;
            grid-template-columns: 1fr;
        }
        .continue{
            width: 90%;
            margin: 1.5rem auto;
            gap: 0.5rem;

            img{
                rotate: 90deg;
                width: 0.9rem;
            }
            p{
                font-size: 0.8rem;
            }
        }
    }
    
`

function CartPage({ isAuth }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems } = useSelector(state => state.cart);
    const [total, setTotal] = useState(cartItems.reduce((acc, curr) => {
        return acc + curr.price;
    }, 0) || 0);
    const [length, setLength] = useState(cartItems.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0) || 0);

    const DeleteCartItem = (el) => {
        setTotal((prev) => prev - el.price * el.quantity);
        setLength((prev) => prev - el.quantity)
        dispatch(Removefromcart(el.product));
    }


    return (
        <CartPageStyles>
            {isAuth ? <div className="wrapper">
                {cartItems?.length > 0 ? <>
                    <div className="cart">
                        <h2>CART PRODUCTS</h2>
                        <div className="cart-items">
                            {cartItems.map((item) => {
                                return <CartItem key={item.product} item={item} setTotal={setTotal} length={setLength} DeleteCart={DeleteCartItem} need={true} />
                            })}
                        </div>
                    </div>
                    <Billing length={length} total={total} txt={"PROCEED TO CHECKOUT"} link={'/checkout'} /></> : <div className="wrapper" style={{ padding: '2rem 3rem', backgroundColor: "#FFF", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div className="cartitems">
                        <p>Cart is empty</p>
                        <img style={{ opacity: 0.2 }} src={carticon} alt="" />
                    </div>
                    <button onClick={() => {
                        navigate('/products')
                    }} disabled={!isAuth}>CONTINUE SHOPPING</button>
                </div>}
            </div> : <div className="wrapper" style={{ padding: '2rem 3rem', backgroundColor: "#FFF", display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <h2>Please <span onClick={() => { navigate('/login') }}>Login</span> to access cart feature</h2>
                <div className="cartitems">
                    <p>Cart is empty</p>
                    <img style={{ opacity: 0.2 }} src={carticon} alt="" />
                </div>
                <button onClick={() => {
                    navigate('/products')
                }} disabled={!isAuth}>CONTINUE SHOPPING</button>
            </div>}
            <div className="continue" onClick={() => { navigate('/products') }}>
                <img src={arrow} alt="" />
                <p>Continue Shopping</p>
            </div>
        </CartPageStyles>
    )
}

export default CartPage


