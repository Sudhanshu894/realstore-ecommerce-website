import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PreFooter from '../components/Footer/PreFooter'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import SearchOpen from '../components/Mobile/SearchOpen'
import CartOpen from '../components/Mobile/CartOpen'
import MenuOpen from '../components/Mobile/MenuOpen'
import ProductContainer from '../components/Products/ProductContainer'
import ProductDetails from '../components/Products/ProductDetails'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails, clearErrors } from '../redux/ProductRed/Action'
import { useAlert } from 'react-alert'
import Loader from '../utils/Loader'

const PageStyles = styled.div`
    width: 100vw;
    height: 100vh;
    .slide-open{
        position: fixed;
        top: 4rem;
        right: -700px;
        height: 100%;
        width: 450px;
        display: flex;
        justify-content: center;
        padding: 2rem;
        background-color: #FFF;
        transition: 0.5s ease-in-out;
        z-index: 100;

    }


    @media (max-width: 767px){
        .slide-open{
            width: 100vw;
        }
    }
`

function ProductDetailsPage() {
    const { id } = useParams();
    const alert = useAlert();
    const dispatch = useDispatch();
    const [open, setOpen] = useState({ cart: false, search: false, menu: false });
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 990px)').matches);
    const { product, loading, error } = useSelector(state => state.productDetails);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(window.matchMedia('(max-width: 990px)').matches);
        });
    }, []);

    useEffect(() => {
        if (error) {
            alert.error(error)
            dispatch(clearErrors())
        }
        dispatch(getProductDetails(id))
    }, [dispatch, error, alert]);



    return (
        <PageStyles>

            <Header open={open} setOpen={setOpen} isMobile={isMobile} />

            {isMobile && <div className='slide-open' style={{ right: open.search && '0px' || open.cart && '0px' || open.menu && '0px' }} >
                {open.search && <SearchOpen />}
                {open.cart && <CartOpen />}
                {open.menu && <MenuOpen />}
            </div>}
            {loading ? (<Loader />) : (<ProductDetails key={id} product={product} />)}
            <PreFooter />
            <Footer />
        </PageStyles>
    )
}

export default ProductDetailsPage