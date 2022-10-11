import React from 'react'
import styled from 'styled-components'
import Carousel from 'react-material-ui-carousel'
import { Rating } from '@material-ui/lab'
import wrong from '../../assets/imgs/wrong.svg';
import right from '../../assets/imgs/right.svg';
import arrow from '../../assets/imgs/arrow.svg';
import ReviewsContainer from '../Reviews/ReviewsContainer';

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

function ProductDetails({ product }) {
    return (
        <>
            <ProductDetailStyles>
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
                                <span className='rew'>{"32 review(s)"}</span>
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
                                    <p>1</p>
                                    <div className='change-quan'>
                                        <img style={{ transform: 'rotate(180deg)' }} src={arrow} alt="up" />
                                        <img src={arrow} alt="down" />
                                    </div>
                                </div>
                                <div className="cbtn">
                                    <button>ADD TO CART</button>
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
                    </div>
                </div>
            </ProductDetailStyles>
            <ReviewsContainer reviews={product.reviews} />
        </>
    )
}

export default ProductDetails