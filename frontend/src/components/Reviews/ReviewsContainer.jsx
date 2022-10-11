import React, { useState } from 'react'
import styled from 'styled-components';
import Review from './Review';
const ReviewsContainerStyles = styled.div`
    width: 100vw;
    height: fit-content;
    .review-container{
        width: 1230px;
        height: fit-content;
        margin: 2rem auto;
        background-color: #FFF;
        padding: 3rem;

        h2{
            border-bottom: 0.5px solid #BEBEBE;
            padding-left: 1.5rem;
            padding-bottom: 1.5rem;
            cursor: pointer;
            transition: 0.2s ease-in-out;
            
            &:hover{
                color: #00C37A;
            }
        }
        h3{
            cursor: pointer;
            transition: 0.2s ease-in-out;
            &:hover{
                color: #00C37A;
            }
        }
        .review-grid{
            display: grid;
            grid-template-columns: 1fr;
            gap: 1rem;
            padding: 2rem 0;
            .crep{
                text-align: center;
                font-size: 1.5rem;
                font-weight: bold;
            }
        }
    }
    @media (min-width: 991px) and (max-width: 1380px){
        .review-container{
            width: 980px;
        }  
    }
    @media (min-width: 768px) and (max-width: 990px) {
        .review-container{
            width: 90%;
        }
    }
    @media (max-width: 767px){
        .review-container{
            width: 95%;
        }
    }

`
function ReviewsContainer({ reviews }) {
    const [seeall, setSeeall] = useState(false);
    return (
        <ReviewsContainerStyles>
            <div className="review-container">
                <h2>REVIEWS</h2>
                <div className="review-grid">
                    {reviews && reviews.map((review, i) => {
                        if (i === 0) {
                            return <Review key={review._id} review={review} />
                        } else {
                            if (seeall) {
                                return <Review key={review._id} review={review} />
                            }
                        }
                    })}
                    {reviews?.length === 0 && <p className='crep'>No product reviews Yet</p>}
                    {reviews?.length > 1 && !seeall && <h3 onClick={() => { setSeeall(true) }}>{"See All review(s)"}</h3>}
                    {seeall && <h3 onClick={() => { setSeeall(false) }}>{"Hide review(s)"}</h3>}

                </div>
            </div>
        </ReviewsContainerStyles>
    )
}

export default ReviewsContainer