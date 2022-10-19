import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate } from "react-router-dom";
import SideBar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Rating } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete'
import { clearErrors } from '../../redux/OrderRed/Actions';
import { DELETE_REVIEW_RESET } from '../../redux/ProductRed/Actiontypes';
import SearchIcon from '@material-ui/icons/Search'
import { deleteReview, getAllreviews } from '../../redux/ProductRed/Action';


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
        
        .searchid{
            width: 90%;
            height: 4rem;
            margin: 0 auto;
            border-radius: 8px;
            position: relative;
            input{
                width: 100%;
                height: 100%;
                border: none;
                outline: none;
                padding: 0 3rem 0 4rem;
                border-radius: 8px;
                font-size: 1rem;
                font-weight: 400;
                font-family: 'Poppins',sans-serif;
            }
            & > svg{
                position: absolute;
                width: 2rem;
                height: 2rem;
                left: 1rem;
                top: 1rem;
            }
        }

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
            height: 45vh;

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
                    gap: 1rem;

                    *{
                        font-family: 'Poppins',sans-serif;
                    }
                    & > p{
                        font-size: 0.9rem;
                    }
                    & > div{
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
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
                                    font-size: 0.9rem;
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

function AdminReviewList({ user }) {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [val, setVal] = useState("");
    const alert = useAlert();
    const { error, isDeleted } = useSelector((state) => state.review);

    const { error: reviewError, reviews } = useSelector((state) => state.allReviews);


    const DeleteReviewHandler = (id) => {
        dispatch(deleteReview(id, val))
    }

    const HandleSearchReview = (e) => {
        if (e.key === 'Enter') {
            dispatch(getAllreviews(val))
        }
    }

    useEffect(() => {


        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }

        if (isDeleted) {
            alert.success("Review Deleted Successfully");
            dispatch({ type: DELETE_REVIEW_RESET });
            dispatch(getAllreviews(val));
        }
    }, [dispatch, alert, error, isDeleted, reviewError]);

    return (
        <>
            <DashBoardStyles>
                <SideBar user={user} />
                <div className="dashboard-container">
                    <div className="searchid">
                        <SearchIcon />
                        <input type="text" placeholder='Enter Product Id' value={val} onChange={(e) => setVal(e.target.value)} onKeyUp={HandleSearchReview} />
                    </div>
                    <div className='head'>
                        {reviews && <h2>{`REVIEW LIST (${reviews?.length})`}</h2>}
                    </div>
                    <div className="product-list">
                        {reviews && reviews?.map((review) => {
                            return <div className="item" >
                                <p style={{ cursor: "pointer" }}>Review ID - {review?._id}</p>
                                <div>
                                    <div className="show">
                                        <img src={review?.user?.avatar?.url} alt="" />
                                        <div className="info">
                                            <p>Reviewed By - {review?.user?.name}</p>
                                            <Rating value={review?.rating} precision={1} size={'small'} readOnly />
                                        </div>
                                    </div>
                                    <div className="pandq">
                                        <p>{review?.review}</p>
                                    </div>
                                    <div className="actions">
                                        <DeleteIcon onClick={() => {
                                            DeleteReviewHandler(review?._id);
                                        }} />
                                    </div>
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </DashBoardStyles>
        </>
    )
}

export default AdminReviewList