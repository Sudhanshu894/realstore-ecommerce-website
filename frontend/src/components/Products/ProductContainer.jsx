import React, { useEffect } from 'react'
import styled from 'styled-components';
import Product from './Product';

const ProductContainerStyles = styled.div`
    width: 1230px;
    margin: 0 auto;
    padding: 1.5rem;
    background-color: #FFF;

    h2{
        font-size: 1.5rem;
        opacity: 0.9;
        font-weight: 600;
        padding-bottom: 1rem;
        border-bottom: 0.8px solid #BEBEBE;
    }

    .prd-grid{
        width: 100%;
        height: fit-content;
        margin: 1.5rem 0;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        gap: 1rem;
    }

    @media (max-width: 1380px){
        width: 980px;
    }
    @media (min-width: 768px) and (max-width: 990px) {
        width: 90%;
        
        .prd-grid{
            grid-template-columns: repeat(3,1fr);
        }
    }
    @media (max-width: 767px){
        width: 90%;
        .prd-grid{
            grid-template-columns: repeat(2,1fr);
        }
    }
`

function ProductContainer({ title, products, elem }) {

    return (
        <ProductContainerStyles>
            <h2>{title}</h2>
            <div className="prd-grid">
                {products && products.map((prod) => {
                    return <Product key={prod._id} product={prod} />
                })}
            </div>
        </ProductContainerStyles>
    )
}

export default ProductContainer