import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors, NewReview } from '../redux/ProductRed/Action'
import { useAlert } from 'react-alert'
import Loader from '../utils/Loader'
import ReviewsContainer from '../components/Reviews/ReviewsContainer'
import Carousel from 'react-material-ui-carousel'
import { Rating } from '@material-ui/lab'
import wrong from '../assets/imgs/wrong.svg';
import right from '../assets/imgs/right.svg';
import arrow from '../assets/imgs/arrow.svg';
import { Addtocart } from '../redux/CartRed/Actions'
import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from '@material-ui/core'
import { NEW_REVIEW_REQUEST } from '../redux/ProductRed/Actiontypes'

const ProductDetailStyles = styled.div`
    width: 100vw;
    height: fit-content;
    .prod-details{
        width: 1230px;
        height: fit-content;
        margin: 2rem auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;

        .imgdiv{
           background-color: #FFF;
           border-radius: 10px;
           transition: 0.2s ease-in-out;
           img{
               width: 100%;
               height: auto;
               border-top-left-radius: 10px;
               border-top-right-radius: 10px;
            }
            &:hover{
                transform: translateY(-0.5rem);
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            }
        }
        .contentdiv{
            display: flex;
            flex-direction: column;
            background-color: #FFF;
            padding: 3rem 0 2rem 0;
            border-radius: 10px;
            transition: 0.3s ease-in-out;
            &:hover{
                transform: translateY(-0.5rem);
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
            }
            .heading{
                border: none;
                padding: 1rem 0 1rem 0;
                margin: 0 2rem 0 4rem;
                border-bottom: 1px solid #BEBEBE;
                h1{
                    font-size: 1.6rem;
                    font-weight: 900;
                    opacity: 0.9;
                }
            }
            .ratings-price{
                border: none;
                display: flex;
                flex-direction: column;
                padding: 1rem 2rem 1rem 4rem;
                gap: 1rem;

                .rew-rat{
                    display: flex;
                    align-items: center;
                    gap: 1rem;

                    .rew{
                        font-size: 0.9rem;
                        font-family: 'Poppins',sans-serif;
                        font-weight: 600;
                        color: #BEBEBE;
                    }
                }
                .desc{
                    padding: 1rem 0 1rem 0;
                    p{
                        font-size: 1rem;
                        font-weight: 500;
                        font-family: 'Poppins',sans-serif;
                        color: #353535;
                    }
                }
                .pricing{
                    padding: 1rem 0 1rem 0;

                    h2{
                        font-size: 3rem;
                        font-weight: 600;
                    }
                }

            }
            .addcartbtn{
                width: 100%;
                padding: 3rem 4rem;
                border: none;
                border-top: 0.5px solid #bebebec8;
                border-bottom: 0.5px solid #bebebec8;
                display: flex;
                flex-direction: column;
                gap: 1rem;

                .acb-1{
                    display: flex;
                    gap: 1rem;

                    .quan{
                        height: 4rem;
                        display: flex;
                        gap: 0.5rem;
                        p{
                            width: 4rem;
                            height: 4rem;
                            display: grid;
                            place-items: center;
                            border: .5px solid #BEBEBE;
                            border-radius: 5px;
                            font-size: 1.1rem;
                            font-family: 'Poppins',sans-serif;
                            font-weight: 500;
                        }

                        .change-quan{
                            display: grid;
                            grid-template-rows: repeat(2,1fr);

                            img{
                                width: 1.5rem;
                                height: 2rem;
                                border: 0.3px solid #BEBEBE;
                            }

                        }
                        
                    }
                    .cbtn{
                        button{
                            width: 250px;
                            height: 4rem;
                            border: none;
                            background-color: #00C37A;
                            color: white;
                            font-size: 1.2rem;
                            font-weight: bold;
                            border-radius: 5px;
                        }
                    }

                }
                .acb-2{
                    display: flex;
                    gap: 1rem;
                    align-items: center;

                    img{
                        width: 1.5rem;
                        height: 1.5rem;
                    }
                    p{
                        font-size: 1rem;
                        font-family: 'Poppins', sans-serif;
                        font-weight: 600;
                        opacity: 0.6;
                    }
                }
            }
            
            .greview{
                width: 50%;
                font-family: 'Poppins', sans-serif;
                font-size: 1.1rem;
                border: none;
                height: 3.5rem;
                background-color: #353535;
                color: white;
                margin: 0 auto;
                text-align: center;
                margin-top: 2rem;
            }
        }

    }
    @media (min-width: 991px) and (max-width: 1380px){
        .prod-details{
            width: 980px;
        }  
    }
    @media (min-width: 768px) and (max-width: 990px) {
        .prod-details{
            width: 90%;
            grid-template-columns: 1fr;
        }
    }
    @media (max-width: 767px){
        .prod-details{
            width: 95%;
            grid-template-columns: 1fr;
        }

        .cbtn{
            button{
                width: 150px;
            }
        }
    }
`

function ProductDetailsPage({ isAuth }) {
    const { id } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 990px)').matches);
    const { product, loading, error } = useSelector(state => state.productDetails);

    const { success, error: reviewError } = useSelector(state => state.newReview);

    const [ratings, setRatings] = useState(0);
    const [isopen, setIsOpen] = useState(false);
    const [comment, setComment] = useState("");

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(window.matchMedia('(max-width: 990px)').matches);
        });
    }, []);

    const AddtoCart = () => {
        if (!isAuth) {
            alert.error("Request Failed!");
            return alert.error('Please login to add product to cart');
        }
        dispatch(Addtocart(id, quantity));
        alert.success("Item added to cart Successfully");
    }
    const HandleInc = () => {
        if (quantity === product?.stock) {
            return;
        }
        if (quantity < product?.stock) {
            setQuantity((prev) => prev + 1);
        }

    }
    const HandleDecr = () => {
        if (1 === quantity) return;
        if (quantity > 1) {
            setQuantity((prev) => prev - 1);
        }
    }

    const SubmitReviewToggle = () => {
        setIsOpen(!isopen)
    };

    const SubmitReview = () => {
        const data = {
            rating: ratings,
            review: comment,
            productId: id,
        }
        dispatch(NewReview(data));
        setIsOpen(false);
    }

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }

        if (reviewError) {
            alert.error(reviewError);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Review Submitted");
            dispatch({ type: NEW_REVIEW_REQUEST });
        }
        dispatch(getProductDetails(id))
    }, [dispatch, error, alert, reviewError, success, id]);



    return (
        <>
            {loading ? (<Loader />) : (<><ProductDetailStyles>
                <div className="prod-details">
                    <div className="imgdiv">
                        <Carousel>
                            {product.images && product.images.map((img, i) => {
                                return <img className='ani-img' src={img.url} key={img.url} alt={`${i} slide`} />
                            })}
                        </Carousel>
                    </div>
                    <div className='contentdiv'>
                        <div className="heading">
                            <h1>{product.name}</h1>
                        </div>
                        <div className="ratings-price">
                            <div className='rew-rat'>
                                <Rating value={product.ratings} precision={0.5} readOnly />
                                <span className='rew'>{`${product.numOfreviews} review(s)`}</span>
                            </div>
                            <div className='desc'>
                                <p>{product.description}</p>
                            </div>
                            <div className='pricing'>
                                <h2>₹{product.price}</h2>
                            </div>

                        </div>
                        <div className="addcartbtn">
                            <div className='acb-1'>
                                <div className="quan">
                                    <p>{quantity}</p>
                                    <div className='change-quan'>
                                        <img onClick={HandleInc} style={{ transform: 'rotate(180deg)' }} src={arrow} alt="up" />
                                        <img onClick={HandleDecr} src={arrow} alt="down" />
                                    </div>
                                </div>
                                <div className="cbtn">
                                    <Button onClick={AddtoCart} disabled={product.stock < 1 ? true : false}>ADD TO CART</Button>
                                </div>
                            </div>
                            {product?.stock > 0 ? <div className="acb-2">
                                <img src={right} alt="" />
                                <p>In Stock</p>
                            </div> : <div className="acb-2">
                                <img src={wrong} alt="" />
                                <p>Out of Stock</p>
                            </div>}
                        </div>
                        <Button className="greview" onClick={SubmitReviewToggle}>Write a Review</Button>
                    </div>
                </div>
            </ProductDetailStyles>
                <Dialog
                    aria-labelledby='simple-dialog-title'
                    open={isopen}
                    onClose={SubmitReviewToggle}>
                    <DialogTitle style={{
                        fontWeight: '600',
                    }}>Write Reivew</DialogTitle>
                    <DialogContent style={{
                        width: '400px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        padding: '1rem 2rem',
                    }}>
                        <Rating onChange={(e) => setRatings(e.target.value)} value={ratings} size="medium" />
                        <textarea style={{
                            padding: '0.5rem 1rem',
                            fontFamily: 'Poppins,sans-serif',
                            fontSize: '1rem',
                            fontWeight: '400'
                        }} cols="30" rows="4" value={comment} onChange={(e) => setComment(e.target.value)} />
                    </DialogContent>
                    <DialogActions>
                        <Button style={{
                            fontFamily: 'Poppins,sans-serif',
                            color: '#181818',
                            fontSize: '1rem',
                            fontWeight: 600,
                        }} onClick={SubmitReviewToggle} >Cancel</Button>
                        <Button style={{
                            fontFamily: 'Poppins,sans-serif',
                            color: '#00C37A',
                            fontSize: '1rem',
                            fontWeight: 500,
                        }} onClick={() => {
                            SubmitReview();
                        }}>Submit</Button>
                    </DialogActions>

                </Dialog>
                <ReviewsContainer reviews={product.reviews} /></>)}
        </>
    )
}

export default ProductDetailsPage