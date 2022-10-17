import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { clearErrors, getOrderDetails } from '../redux/OrderRed/Actions';
import Loader from '../utils/Loader';

const CheckoutStyles = styled.div`
    width: 1230px;
    height: fit-content;
    margin: 2rem auto;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;

    & > div{
        background-color: #FFF;
        padding: 2rem 3rem;
        display: flex;
        flex-direction: column;

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
        .submit{
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
            margin: 0 auto;
            border-radius: 5px;
            margin-top: 3rem;
            transition: all 0.3s ease-in-out;
            opacity:0.9;

            &:hover{
                opacity: 1;
            }

            &:disabled{
                opacity: 0.7;
            }
        }

        .confirm{
            display: flex;
            flex-direction: column;
            gap: 2rem;

            *{
                font-family: 'Poppins',sans-serif;
            }
            .confirm-shipping-info,.cart-overview{
                padding: 2rem;
                border-radius: 10px;
                display: flex;
                flex-direction: column;
                gap: 1rem;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                transition: all 0.3s ease-in-out;
                cursor: pointer;

                h3{
                    font-size: 1.3rem;
                    font-weight: 500;
                    padding-bottom: 1rem;
                    border-bottom: 0.2px solid #BEBEBE;
                }

                div{
                    display: flex;
                    flex-direction: column;
                    gap: 0.5rem;

                    p{
                        font-size: 1.1rem;
                        font-weight: 400;
                        span{
                            font-size:1.1rem;
                            font-weight: 500;
                        }
                    }
                }

                &:hover{
                    transform: translateY(-4px);
                    scale: 1.05;
                }

                .item-wrapper{
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1rem;
                    
                    .item{
                        width: 100%;
                        display: flex;
                        flex-direction: row;
                        align-items: center;
                        justify-content: space-between;
                        
                        
                        .display-item{
                            flex-direction: row;
                            display: flex;
                            align-items: center;
                            gap: 1.5rem;
                            img{
                                width: 5rem;
                                height: 5rem;
                                object-fit: cover;
                                border-radius: 50%;
                            }
                            div{
                                display: flex;
                                flex-direction: column;
                                p{
                                    font-size: 1.3rem;
                                    font-weight: 500;
                                }
                                span{
                                    font-size: 0.8rem;
                                    font-weight: 400;
                                    color: gray;
                                }
                            }
                        }
                        .item-content{
                            display: flex;
                            flex-direction: row;
                            gap: 2rem;
                            align-items: center;
                            justify-content: center;


                            .price,.total{
                                justify-content: center;
                                p{
                                    font-size: 1.2rem;
                                    font-weight: 500;
                                }
                            }
                            .quantity{
                                height: 3rem;
                                display: flex;
                                gap: 0.5rem;
                                p{
                                    width: 3rem;
                                    height: 3rem;
                                    display: grid;
                                    place-items: center;
                                    border: .5px solid #BEBEBE;
                                    border-radius: 5px;
                                    font-size: 1.1rem;
                                    font-family: 'Poppins',sans-serif;
                                    font-weight: 500;
                                }

                                .change-quantity{
                                    display: grid;
                                    grid-template-rows: repeat(2,1fr);

                                    img{
                                        width: 1rem;
                                        height: 1.5rem;
                                        border: 0.3px solid #BEBEBE;
                                    }

                                }
                                
                            }
                            svg{
                                height: 1.8rem;
                                width: auto;
                                opacity: 0.7;
                                transition: all 0.2s ease-in-out;
                                cursor: pointer;

                                &:hover{
                                    opacity: 1;
                                }
                            }
                        }
                    }
                }
            }
        } 
    }

    @media (min-width: 991px) and (max-width: 1380px){
        width: 980px;
        & > div{
            padding: 1.5rem 2.5rem;
            background-color: #FFF;

            h2{
                font-size: 1.5rem;
            }
        }
    }
    @media (min-width: 768px) and (max-width: 990px) {
        width: 90%;
        grid-template-columns: 1fr 0.8fr;

        & > div{

            .confirm{
                .cart-overview{
                    .item-wrapper{
                        gap: 2rem;
                        
                        .item{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;


                            .item-content{
                                align-self: center;
                            }
                        }
                    }
                }
            }
        }
        
    }
    @media (min-width: 600px) and (max-width: 767px){
        width: 90%;
        grid-template-columns: 1fr;

    }

    @media (max-width: 599px){
        width: 90%;
        grid-template-columns: 1fr;
        & > div{
            .confirm{
                .cart-overview{
                    .item-wrapper{
                        gap: 2rem;
                        
                        .item{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            .item-content{
                                align-self: center;
                            }
                        }
                    }
                }
            }
        }
    }

`

function OrderDetailsPage() {
    const { id } = useParams();
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector(state => state.cart);
    const { order, error, loading } = useSelector(state => state.orderDetails);

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error])
    return (
        <>
            {loading ? <Loader /> : <CheckoutStyles>
                <div>
                    <h2>ORDER DETAILS - {id}</h2>
                    <div className="confirm">
                        <div className='confirm-shipping-info'>
                            <h3>Shipping Info</h3>
                            <div>
                                <p>Name: <span>{order.user?.name}</span></p>
                                <p>email: <span>{order.user?.email}</span></p>
                                <p>Phone No: <span>{shippingInfo.mobileNo}</span></p>
                                <p>Address: <span>{order.shippingInfo?.address}</span></p>
                            </div>
                        </div>
                        <div className='confirm-shipping-info'>
                            <h3>Payment Info</h3>
                            <div>
                                <p>Amount Paid: <span>₹{order.totalPrice}</span></p>
                                <p>Payment date: <span>{String(order?.paidAt).substring(0, 10)}</span></p>
                                <p>Order Status: <span>{order.orderStatus}</span></p>
                            </div>
                        </div>
                        <div className="cart-overview">
                            <h3>Ordered Items</h3>
                            <div className="item-wrapper">
                                {order?.orderItems && order.orderItems?.map((item) => {
                                    return <div className="item">
                                        <div className="display-item">
                                            <img src="http://roythemes.com/demo/modez/_ori/24-home_default/faded-short-sleeves-tshirt.jpg" alt="" />
                                            <div>
                                                <p>{item.name}</p>
                                                <span>Clothings</span>
                                            </div>
                                        </div>
                                        <div className="item-content">
                                            <div className="price">
                                                <p>₹{item.price}</p>
                                            </div>
                                            <div className="quantity">
                                                <p>{item.quantity}</p>
                                            </div>
                                            <div className="total">
                                                <p>₹{item.price * item.quantity}</p>
                                            </div>
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                    </div>
                    <button className='submit'>B</button>
                </div>
            </CheckoutStyles>}
        </>
    )
}

export default OrderDetailsPage