import React, { useEffect } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components'
import { clearErrors, myOrders } from '../redux/OrderRed/Actions';
import Loader from '../utils/Loader';
import LaunchIcon from "@material-ui/icons/Launch";
import { useNavigate } from 'react-router-dom';

const OrderPageStyles = styled.div`
    width: 1230px;
    height: fit-content;
    margin: 2rem auto;
    padding: 2rem 3rem;
    background-color: #FFF;
    
    h2{
        padding-bottom: 1rem;
        border-bottom: 0.5px solid #BEBEBE;
        font-size: 1.5rem;
        opacity: 0.9;
        cursor: pointer;
        transition: 0.2s ease-in-out;
        
        &:hover{
            color: #00C37A;
        }
    }
    .order-wrapper{
        overflow: auto;
        margin: 2rem 0;
        width: 100%;
        
        .order-container{
            width: 100%;
            height: fit-content;
            display: grid;
            grid-template-columns: 1fr;
            border: 1px solid red;
            gap: 0.5rem;
            min-width: 800px;
            .box,.orderhead{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                
                div{
                    padding: 0.5rem 1rem;
                    display: flex;
                    width: 100%;
                    flex-direction: column;
                    justify-content: center;

                    *{
                        font-family: 'Poppins',sans-serif;
                    }

                    p{
                        text-align: center;
                        font-size: 1rem;
                        font-weight: 400;
                    }
                    svg{
                        width: fit-content;
                        margin: 0 auto;
                    }
                }
                div:nth-child(1){
                    p{
                        font-weight: 500;
                    }
                }
            }
            .orderhead > div > p{
                font-size: 1.2rem;
                font-family: 'Poppins',sans-serif;
                font-weight: 600;
            }
        }

    }

    @media (min-width: 991px) and (max-width: 1330px){
        width: 980px;
    }
    @media (min-width: 768px) and (max-width: 990px){
        width: 80%;
    }
    @media (max-width: 767px){
        width: 90%;
    }
`

function OrdersPage() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();
    const { loading, error, orders } = useSelector(state => state.myOrders);

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(myOrders());
    }, [dispatch, alert]);

    return (
        <OrderPageStyles>
            <h2>MY ORDERS</h2>
            {loading ? <Loader /> : <div className="order-wrapper">
                <div className="order-container">
                    <div className="orderhead order">
                        <div>
                            <p>Order ID</p>
                        </div>
                        <div>
                            <p>Price & Quantity</p>
                        </div>
                        <div>
                            <p>Status</p>
                        </div>
                        <div>
                            <p>Actions</p>
                        </div>
                    </div>
                    {orders && orders.map((order) => {
                        return <div className="order box">
                            <div>
                                <p>{order._id}</p>
                            </div>
                            <div>
                                <p>{`${order.orderItems.reduce((acc, curr) => { return acc + curr.quantity }, 0)} Items`}</p>
                                <p>₹{order.totalPrice}</p>
                            </div>
                            <div>
                                <p style={{ color: order.orderStatus === "Delivered" ? 'green' : "red" }}>{order.orderStatus}</p>
                            </div>
                            <div>
                                <LaunchIcon onClick={() => {
                                    navigate(`/order/${order._id}`)
                                }} />
                            </div>
                        </div>
                    })}
                </div>
            </div>}
        </OrderPageStyles>
    )
}

export default OrdersPage