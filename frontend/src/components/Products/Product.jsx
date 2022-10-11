import React from 'react'
import { Rating } from "@material-ui/lab";
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom'

const ProductStyles = styled.div`
    transition: 0.3s ease-in-out;

        & > div{
            margin: 1rem 0;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
            align-items: center;

            & > p{
                font-family: 'Poppins',sans-serif;
                font-size: 1.1rem;
                font-weight: 500;
                opacity: 0.9;
            }
            & > h3{
                font-size: 1.8rem;
                font-weight: 500;
            }
            & > button{
                width: 70%;
                margin: 0 auto;
                text-align: center;
                color: #FFF;
                height: 3.5rem;
                border: none;
                border-radius: 5px;
                font-size: 1.3rem;
                background-color: #00C37A;
                opacity: 0.9;
            }
        }

        &:hover {
            box-shadow: 0 0 5px rgba(15, 15, 15, 0.26);
            transform: translateY(-1vmax);
        }

        img{
            width: 100%;
            height: auto;
        }
`

function Product({ product }) {
    const navigate = useNavigate();
    const options = {
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };
    return (
        <ProductStyles onClick={() => {
            navigate(`/product/${product._id}`)
        }}>
            <img src={product.images[0].url} alt={product.name} />
            <div className="content">
                <p>{product.name}</p>
                <h3>₹{product.price}</h3>
                <button>ADD TO CART</button>
                <Rating {...options} />
            </div>
        </ProductStyles>
    )
}

export default Product