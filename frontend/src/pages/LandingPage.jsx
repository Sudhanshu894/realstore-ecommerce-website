import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ProductContainer from '../components/Products/ProductContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../redux/ProductRed/Action'
import Loader from '../utils/Loader'
import { useAlert } from 'react-alert'

const MainContainerStyles = styled.div`
    width: 100vw;
    height: fit-content;
    position: relative;
    z-index: 2;
    .home-header{
        width: 1230px;
        height: fit-content;
        margin: 0 auto;
        position: relative;
        img{
            width: 100%;
        }

        &>h1,&>div{
            position: absolute;
            z-index: 3;
        }
        
        h1{
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
            font-size: 6rem;
            font-family: 'Poppins',sans-serif;
            margin: 0;
            font-weight: 500;
            letter-spacing: 2px;
            color: #FFF;
        }
        .overlay-3{
            color: #FFF;
            font-size: 1.5rem;
            letter-spacing: 2px;
            font-family: 'Poppins',sans-serif;
            font-weight: 700;
            bottom: 10%;
            left: 8%;
        }
        .overlay-top{
            color: #FFF;
            top: 10%;
            right: 8%;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 0.3rem;
            h3{
                font-size: 1.7rem;
            font-family: 'Cuprum',sans-serif;
            font-weight: 600;
            }
            p{
                font-size: 1.2rem;
                font-weight: 500;
            }
            button{
                border: none;
                border-bottom: 2px solid white;
                background-color: transparent;
                color: white;
                font-size: 1.6rem;
                margin: 1rem 0;
                padding-bottom: 0.3rem;
            }
        }
    }

    .home-header-2{
        width: 1230px;
        height: 20vh;
        margin: 2rem auto;
        display: grid;
        grid-template-columns: repeat(3,1fr);
        gap: 1rem;

        img{
            width: 100%;
            height: 100%;
        }
    }
    @media (min-width: 991px) and (max-width: 1380px){
        .home-header{
            width: 980px;
        }
        .home-header-2{
            width: 980px;
        }
    }
    @media (min-width: 768px) and (max-width: 990px) {
        .home-header{
            width: 90%;
        }
        .home-header-2{
            width: 90%;
        }
    }
    @media (max-width: 767px){
        .home-header{
            width: 90%;
            h1{
                font-size: 3rem;
                font-weight: 500;
            }
            .overlay-3{
                font-size: 0.9rem;
                letter-spacing: 1px;
                font-family: 'Poppins',sans-serif;
                font-weight: 600;
                bottom: 8%;
                left: 5%;
            }
            .overlay-top{
                top: 8%;
                right: 5%;
                gap: 0.2rem;
                h3{
                    font-size: 1.2rem;
                    font-family: 'Cuprum',sans-serif;
                    font-weight: 500;
                }
                p{
                    font-size: 0.9rem;
                    font-weight: 400;
                }
                button{
                    font-size: 1.2rem;
                    margin: 0.7rem 0;
                    padding-bottom: 0.2rem;
                }
            }
        }
        .home-header-2{
            width: 90%;
            height: fit-content;
            grid-template-columns: 1fr;
        }
    }
`
function LandingPage() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products, productsCount } = useSelector(state => state.products);

    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);


    return (
        <>
            {loading ? (<Loader />) : (<MainContainerStyles style={{ perspective: '20px' }}>
                <div className="home-header">
                    <img src="http://roythemes.com/demo/modez/_ori/modules/revsliderprestashop/uploads/slider1_bg_2.jpg" alt="" />
                    <h1 className='overlay-mid'>RSTORE</h1>
                    <div className='overlay-3'>
                        <p>2018</p>
                        <p>COLLECTION</p>
                    </div>
                    <div className='overlay-top'>
                        <h3>NEW BELENCIAGA DRESS</h3>
                        <p>MULTI-COLOR COTTON DRESS</p>
                        <button>SHOP IT</button>
                    </div>
                </div>
                <div className="home-header-2">
                    <img src="http://roythemes.com/demo/modez/_ori/modules/roy_content/img/3830574f8337d7721b6ebbfc54c31167ebb5ed46_bannertop1jpg" alt="" />
                    <img src="http://roythemes.com/demo/modez/_ori/modules/roy_content/img/d411173bd0ea4f0d7a3e7509bfbf18ed4edfbe16_bannertop2jpg" alt="" />
                    <img src="http://roythemes.com/demo/modez/_ori/modules/roy_content/img/78e72f054430fd9830935c68eefdbd60ff8a47ca_bannertop3jpg" alt="" />
                </div>
                <ProductContainer title={"POPULAR PRODUCTS"} products={products} />
                <ProductContainer title={"BESTSELLER PRODUCTS"} products={products} />
            </MainContainerStyles>)}
        </>
    )
}
export default LandingPage