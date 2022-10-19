import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom";
import SideBar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Rating } from '@material-ui/lab';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { clearErrors, getAllOrders, getOrderDetails, deleteOrder } from '../../redux/OrderRed/Actions';
import { DELETE_ORDER_RESET } from '../../redux/OrderRed/ActioinTypes';

const DashBoardStyles = styled.div`
    width: 80%;
    height: fit-content;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    gap: 1rem;
    background: #BEBEBE;
    border-radius: 15px;
    .dashboard-container{
        padding: 2rem;
        display: flex;
        flex-direction: column;
        height: 60vh;
        gap: 2rem;

        .head{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height:fit-content;
            width: 95%;
            margin: 0 auto;

            h2{
                font-size: 1.6rem;
                font-weight: 700;
            }
        }
        .product-list{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            overflow: auto;

            &::-webkit-scrollbar{
                width: 5px;
            }

            .item{
                width: 95%;
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: fit-content;
                padding: 0.5rem;
                gap: 0.2rem;
                margin: 0 auto;
                background-color: #FFF;
                border-radius: 10px;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                transition: all 0.2s;

                *{
                    font-family: 'Poppins',sans-serif;
                }
                & > p{
                    font-weight: 500;
                    font-size: 1rem;
                }
                .show{
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;

                    p{
                        font-size: 0.9rem;
                        font-weight: 500;
                        cursor: pointer;
                    }
                    
                }
                .pandq{
                    p{
                        font-size: 1rem;
                        font-weight: 500;
                    }
                }
                .actions{
                    display: flex;
                    gap: 1rem;

                    svg{
                        width: 2rem;
                        height: 2rem;
                        opacity: 0.8;
                        transition: 0.2s ease-in-out;

                        &:hover{
                            opacity: 1;
                        }
                    }

                }

                &:hover{
                    scale: 1.025;
                    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
                }
            }
        }
        
    }
    @media (min-width: 991px) and (max-width: 1380px){
        width: 980px;
        
    }
    @media (min-width: 768px) and (max-width: 990px){
        width: 90%;
        grid-template-columns: 0.02fr 1fr;
        
    }
    @media (min-width: 650px) and (max-width: 767px){
        width: 90%;
        grid-template-columns: 0.01fr 1fr;
        
    }
    @media (max-width: 649px){
        width: 90%;
        grid-template-columns: 0.01fr 1fr;
        .dashboard-container{
            padding: 1rem;

            .head{

                h2{
                    font-size: 1.3rem;
                    font-weight: 600;
                }
                button{
                    width: 120px;
                    height: 2.5rem;
                    font-size: 1rem;
                    font-weight: 500;
                }
            }
            .product-list{
                display: grid;
                grid-template-columns: 1fr;
                gap: 1rem;
                overflow: auto;

                &::-webkit-scrollbar{
                    width: 5px;
                }

                .item{
                    border-radius: 8px;

                    *{
                        font-family: 'Poppins',sans-serif;
                    }
                    & > p{
                        font-size: 0.9rem;
                    }
                    display: grid;
                        grid-template-columns: repeat(2,1fr);
                        .show{
                            display: flex;
                            gap: 1.5rem;
                            grid-column: span 2;
                        }
                        .pandq{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-start;
                            p{
                                font-size: 0.9rem;
                                font-weight: 500;
                            }
                        }
                        .actions{
                            display: flex;
                            gap: 1rem;
                            justify-content: space-evenly;
                            
                            svg{
                                width: 2rem;
                                height: 2rem;
                                opacity: 0.8;
                                transition: 0.2s ease-in-out;

                                &:hover{
                                    opacity: 1;
                                }
                            }

                        }
                }
            }
        }
    }

`

function AdminOrderList({ user }) {

    const dispatch = useDispatch();
    const alert = useAlert();
    const { error, orders } = useSelector((state) => state.allOrders);

    const { error: deleteError, isDeleted } = useSelector((state) => state.order);
    const navigate = useNavigate();


    const DeleteProductHandler = (id) => {
        dispatch(deleteOrder(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(`Error: ${error}`);
            dispatch(clearErrors());
        }

        if (deleteError) {
            alert.error(`Delete Error: ${deleteError}`);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Order Deleted Successfully");
            dispatch({ type: DELETE_ORDER_RESET })
        }
        dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, isDeleted]);

    return (
        <>
            <DashBoardStyles>
                <SideBar user={user} />
                <div className="dashboard-container">
                    <div className='head'>
                        <h2>{`ORDERS LIST (${orders?.length})`}</h2>
                    </div>
                    <div className="product-list">
                        {orders && orders?.map((order) => {
                            return <div className="item" key={order._id} >
                                <div className="show" onClick={() => {
                                    navigate(`/order/${order?._id}`)
                                }}>
                                    <p>{order?._id}</p>
                                    <p>Order Status: <span style={{ color: order.orderStatus !== "Delivered" ? 'red' : 'green' }}>{order.orderStatus}</span></p>
                                </div>
                                <div className="pandq">
                                    <p>₹{order?.totalPrice}</p>
                                    <p>{order?.orderItems?.reduce((acc, curr) => { return acc + curr.quantity }, 0)} Items</p>
                                </div>
                                <div className="actions">
                                    <EditIcon onClick={() => {
                                        navigate(`/admin/order/update/${order._id}`);
                                    }} />
                                    <DeleteIcon onClick={() => {
                                        DeleteProductHandler(order?._id);
                                    }} />
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </DashBoardStyles>
        </>
    )
}

export default AdminOrderList