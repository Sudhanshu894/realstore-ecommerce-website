import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { clearErrors, getOrderDetails, updateOrder } from '../../redux/OrderRed/Actions';
import Loader from '../../utils/Loader';
import SideBar from './Sidebar';
import { Button } from '@material-ui/core'
import { UPDATE_ORDER_RESET } from '../../redux/OrderRed/ActioinTypes';
import noimg from "../../assets/no_image.jpg";

const CheckoutStyles = styled.div`
    width: 100%;
    height: 60vh;
    overflow: auto;
    margin: 2rem auto;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
    
    &::-webkit-scrollbar{
        width: 5px;
    }

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
            .confirm-shipping-info,.cart-overview,.updateOrder{
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
            .updateOrder{
                select{
                    width: 80%;
                    height: 4rem;
                    margin: 0 auto;
                    border: 0.5px solid #BEBEBE;
                    border-radius: 5px;
                    font-size: 1.1rem;
                    padding-left: 1rem;
                }
                button{
                    width: 70%;
                    height: 4rem;
                    background-color: #00C37A;
                    color: #FFF;
                    font-size: 1rem;
                    font-weight: 500;
                    border: none;
                    border-radius: 5px;
                    margin: 1rem auto;

                    &:disabled{
                        background-color: #353535;
                        opacity: 0.8;
                    }
                }
            }
        } 
    }

    @media (min-width: 991px) and (max-width: 1380px){
        width: 95%;
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
        width: 100%;
    }

    @media (max-width: 599px){
        width: 100%;
        & > div{
            .confirm{
                .cart-overview{
                    .item-wrapper{
                        gap: 2rem;
                        
                        .item{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            .display-item,.item-content{
                                align-self: center;
                                & > div{
                                    p{
                                        font-size: 1rem;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

`
const DashBoardStyles = styled.div`
    width: 80%;
    height: fit-content;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    gap: 1rem;
    background: #BEBEBE;
    border-radius: 15px;
    @media (min-width: 991px) and (max-width: 1380px){
        width: 980px;
        
    }
    @media (min-width: 768px) and (max-width: 990px){
        width: 90%;
        grid-template-columns: 0.02fr 1fr;
    }
    @media (max-width: 767px){
       width: 90%;
        grid-template-columns: 0.02fr 1fr;
    }

`


function AdminOrderUpdate({ user }) {
    const { id } = useParams();
    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [status, setStatus] = useState("");
    const { shippingInfo } = useSelector(state => state.cart);
    const { order, error, loading } = useSelector(state => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector(state => state.order);

    const UpdateOrderHandler = () => {
        const data = {
            status: status
        }
        dispatch(updateOrder(id, data));
    }

    useEffect(() => {


        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully");
            navigate('/admin/orders');
            dispatch({ type: UPDATE_ORDER_RESET });
        }
        dispatch(getOrderDetails(id));
    }, [dispatch, alert, error, id, isUpdated, updateError])
    return (
        <DashBoardStyles>
            <SideBar user={user} />

            {loading ? <Loader /> : <CheckoutStyles>
                <div>
                    <h2>ORDER DETAILS - {id}</h2>
                    <div className="confirm">
                        {order?.orderStatus !== "Delivered" && <div className="updateOrder">
                            <h3>
                                Order Process
                            </h3>

                            <select onChange={(e) => setStatus(e.target.value)}>
                                <option value="">Set Order Status</option>
                                {order?.orderStatus === "Processing" && <option value="Shipped">Shipped</option>}
                                {order?.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}
                            </select>
                            <Button disabled={loading ? true : false || status === "" ? true : false} onClick={UpdateOrderHandler}>Update Order Status</Button>
                        </div>}
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
                                <p>Amount Paid: <span style={{ color: "green" }}>₹{order.totalPrice}</span></p>
                                <p>Payment date: <span>{String(order?.paidAt).substring(0, 10)}</span></p>
                                <p>Order Status: <span style={{ color: order.orderStatus !== "Delivered" ? 'red' : 'green' }}>{order.orderStatus}</span></p>
                            </div>
                        </div>
                        <div className="cart-overview">
                            <h3>Ordered Items</h3>
                            <div className="item-wrapper">
                                {order?.orderItems && order.orderItems?.map((item) => {
                                    return <div className="item">
                                        <div className="display-item">
                                            <img src={item.image === "sample_img" || "" ? { noimg } : item.image} alt="" />
                                            <div>
                                                <p>{item.name}</p>
                                                {/* <span>{item.category}</span> */}
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
                </div>
            </CheckoutStyles>}
        </DashBoardStyles>
    )
}

export default AdminOrderUpdate