import { Rating } from '@material-ui/lab'
import React from 'react'
import styled from 'styled-components'
import user from '../../assets/imgs/user.svg';

const ReviewboxStyles = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    border: 1px solid black;

    .reviewer{
        display: flex;
        flex-direction: column;

        .data{
            display: flex;
            align-items: center;
            gap: 0.2rem;
            img{
                width: 2.5rem;
                height: 2.5rem;
            }
            p{
                font-size: 1.3rem;
                font-weight: 800;
                opacity: 0.9;
            }
        }
        .rating{
            span{
                font-size: 1.4rem;
                opacity: 0.95;
            }
        }
    }
    .comment{
        padding: 0 3rem 0 0;
        p{
            font-family: 'Poppins',sans-serif;
            font-size: 1rem;
            font-weight: 500;
        }
    }
`
function Review({ review }) {
    return (
        <ReviewboxStyles>
            <div className="reviewer">
                <div className="data">
                    <img src={user} alt={review._id} />
                    <p>{review.name}</p>
                </div>
                <div className="rating">
                    <Rating value={review.rating} precision={0.5} readOnly={true} />
                </div>
            </div>
            <div className="comment">
                <p>{review.review}</p>
            </div>
        </ReviewboxStyles>
    )
}

export default Review