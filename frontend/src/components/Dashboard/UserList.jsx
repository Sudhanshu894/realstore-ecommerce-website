import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from "react-router-dom";
import SideBar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Rating } from '@material-ui/lab';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Button } from '@material-ui/core'
import { NEW_PRODUCT_RESET, DELETE_PRODUCT_RESET } from '../../redux/ProductRed/Actiontypes';
import { clearErrors, deleteUser, getAllUsers } from '../../redux/UserRed/Actions';
import Loader from '../../utils/Loader';
import { USER_DELETE_RESET } from '../../redux/UserRed/ActionTypes';

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
        display: grid;
        height: 60vh;
        gap: 1rem;

        .head{
            display: flex;
            align-items: center;
            justify-content: space-between;

            h2{
                font-size: 1.6rem;
                font-weight: 700;
            }
            button{
                width: 150px;
                height: 3rem;
                text-align: center;
                color: #FFF;
                background-color: #00C37A;
                font-size: 1.1rem;
                font-weight: 600;
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
                display: flex;
                flex-direction: column;
                height: fit-content;
                padding: 0.5rem;
                gap: 0.2rem;
                background-color: #FFF;
                border-radius: 10px;

                *{
                    font-family: 'Poppins',sans-serif;
                }
                & > p{
                    font-weight: 500;
                    font-size: 1rem;
                }
                & > div{
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    .show{
                        display: flex;
                        gap: 1rem;

                        img{
                            width: 3rem;
                            height: 3rem;
                            border-radius: 50%;
                        }
                        .info{
                            display: flex;
                            flex-direction: column;

                            p{
                                font-size: 0.9rem;
                            }

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
                    & > div{
                        display: grid;
                        grid-template-columns: repeat(2,1fr);
                        .show{
                            display: flex;
                            gap: 1rem;

                            img{
                                width: 2.8rem;
                                height: 2.8rem;
                                border-radius: 50%;
                            }
                            .info{
                                display: flex;
                                flex-direction: column;

                                p{
                                    font-size: 0.8rem;
                                }

                            }
                        }
                        .pandq{
                            display: flex;
                            flex-direction: column;
                            align-items: flex-end;
                            p{
                                font-size: 0.9rem;
                                font-weight: 500;
                            }
                        }
                        .actions{
                            display: flex;
                            gap: 1rem;
                            grid-column: span 2;
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
    }

`

function AdminUserList({ user }) {

    const dispatch = useDispatch();
    const alert = useAlert();

    const { users, loading, error } = useSelector((state) => state.allUsers);
    const { error: deleteUsererror, isDeleted, message } = useSelector(state => state.profile);
    const navigate = useNavigate();


    const DeleteUserHandler = (id) => {
        dispatch(deleteUser(id));
    }

    useEffect(() => {
        if (error) {
            alert.error(`Error: ${error}`);
            dispatch(clearErrors());
        }
        if (deleteUsererror) {
            alert.error(deleteUsererror);
            dispatch(clearErrors());
        }
        if (isDeleted) {
            alert.success(message);
            dispatch({ type: USER_DELETE_RESET })
        }
        dispatch(getAllUsers());
    }, [dispatch, alert, error, isDeleted, deleteUsererror, message]);

    return (
        <>
            <DashBoardStyles>
                <SideBar user={user} />
                <div className="dashboard-container">
                    <div className='head'>
                        <h2>{`USERS LIST (${users?.length})`}</h2>
                        <Button>CREATE USER</Button>
                    </div>
                    {loading ? <Loader /> : <div className="product-list">
                        {users && users?.map((user) => {
                            return <div className="item" >
                                <p style={{ cursor: "pointer" }}>User ID - {user?._id}</p>
                                <div>
                                    <div className="show">
                                        <img src={user?.avatar?.url} alt="" />
                                        <div className="info">
                                            <p>{user?.name}</p>
                                            <p>{user?.email}</p>
                                            {user?.role === "admin" && <Rating value={1} precision={1} size={'small'} readOnly max={1} />}
                                        </div>
                                    </div>
                                    <div className="pandq">
                                        <p style={{ color: user?.role === "admin" ? 'green' : 'red' }}>{user?.role}</p>
                                    </div>
                                    <div className="actions">
                                        <EditIcon onClick={() => {
                                            // navigate(`/admin/product/update/${prod._id}`);
                                        }} />
                                        <DeleteIcon onClick={() => {
                                            DeleteUserHandler(user?._id);
                                        }} />
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>}
                </div>
            </DashBoardStyles>
        </>
    )
}

export default AdminUserList