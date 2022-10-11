import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PreFooter from '../components/Footer/PreFooter'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import SearchOpen from '../components/Mobile/SearchOpen'
import CartOpen from '../components/Mobile/CartOpen'
import MenuOpen from '../components/Mobile/MenuOpen'
import ProductContainer from '../components/Products/ProductContainer'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../redux/ProductRed/Action'
import Loader from '../utils/Loader'
import { useAlert } from 'react-alert'
import { useParams } from 'react-router-dom'
import Pagination from 'react-js-pagination'
import Product from '../components/Products/Product'
import { Slider } from '@material-ui/core'

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

    .Pagination-wrapper{
        width: 1230px;
        padding: 1rem;
        background-color: #FFF;
        margin: 1rem auto;
        display: flex;
        align-items: center;
        justify-content: center;

        .pagination{
            display: flex;
            align-items: center;
            height: 4rem;

            .page-item{
                background-color: #FFF;
                list-style: none;
                border: 0.5px solid #BEBEBE;
                padding: 1rem 2rem;
                transition: all 0.3s;
                
                &{
                    border-right: none;
                }
                &:first-child{
                    border-radius: 8px 0 0 8px;
                    border-left: 0.5px solid #BEBEBE;
                }
                &:last-child{
                    border-radius: 0 8px 8px 0;
                    border-right: 0.5px solid #BEBEBE;
                }
                & > a{
                    font-size: 1.1rem;
                    color: #181818;
                    font-weight: 600;

                }

                &:hover{
                    color: 'black';
                    background-color: #d8d8d863;
                }

                &:hover > a{
                }
            }
            .activePage{
                background-color: #00C37A;
                .activeLink{
                    color: #FFF;
                    font-weight: bold;
                }
            }
            
        }
    }
    @media (max-width: 1380px){
        .Pagination-wrapper{
            width: 980px;
        }
    }
    @media (min-width: 768px) and (max-width: 990px) {
        .Pagination-wrapper{
            width: 90%;
        }
    }

    @media (max-width: 767px){
        .slide-open{
            width: 100vw;
        }
        .Pagination-wrapper{
            width: 90%;

            .pagination{
                height: 3rem;
                .page-item{
                    border: 0.5px solid #BEBEBE;
                    padding: 0.5rem 1rem;
                    transition: all 0.3s;
                    
                    &{
                        border-right: none;
                    }
                    &:first-child{
                        border-radius: 5px 0 0 5px;
                        border-left: 0.5px solid #BEBEBE;
                    }
                    &:last-child{
                        border-radius: 0 5px 5px 0;
                        border-right: 0.5px solid #BEBEBE;
                    }
                    & > a{
                        font-size: 0.9rem;
                        color: #181818;
                        font-weight: 500;

                    }

                    &:hover{
                        color: 'black';
                        background-color: #d8d8d863;
                    }

                    &:hover > a{
                    }
                }
                .activePage{
                    background-color: #00C37A;
                    .activeLink{
                        color: #FFF;
                        font-weight: bold;
                    }
                }
            }
        }
    }
`

const MainContainerStyles = styled.div`
    width: 100vw;
    height: fit-content;
    position: relative;
    z-index: 2;
`

const ProductsPageStyles = styled.div`
    width: 1230px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    gap: 1rem;
    
    & > div{
        background-color: #FFF;
        border-radius: 5px;
    }
    .prod-wrapper{
        padding: 2rem 1rem;

        h2{
            font-size: 1.6rem;
            opacity: 0.9;
            font-weight: bold;
            padding-bottom: 1rem;
            border-bottom: 0.8px solid #BEBEBE;
        }
        .Prod-grid{
            width: 100%;
            margin: 1.5rem 0;
            height: fit-content;
            display: grid;
            grid-template-columns: 1fr 1fr 1fr 1fr;
            gap: 1rem;
        }
    }

    .filter-wrapper{
        padding: 2rem 1rem;
        overflow: hidden;
        h2{
            font-size: 1.6rem;
            opacity: 0.9;
            font-weight: bold;
            padding-bottom: 1rem;
            border-bottom: 0.8px solid #BEBEBE;
        }
        .filters{
            display: flex;
            flex-direction: column;
            gap: 1rem;

            .category-filter{
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                h3{
                    padding: 1rem 0.5rem;
                    font-weight: 400;
                    font-size: 1.3rem;
                }
                div{
                    padding-left: 0.5rem;
                    display: flex;
                    gap: 0.5rem;

                    span{
                        font-size: 1.1rem;
                    }
                }
            }
            .price-filter,.rating-filter{
                display: flex;
                flex-direction: column;
                gap: 0.5rem;

                h3{
                    padding: 1rem 0.5rem;
                    font-weight: 400;
                    font-size: 1.3rem;
                }
            }
        }
        
    }
    @media (max-width: 1380px){
        width: 980px;

        .prod-wrapper{
            .Prod-grid{
                grid-template-columns: repeat(3,1fr);
            }
        }
    }
    @media (min-width: 768px) and (max-width: 990px) {
        width: 90%;
        grid-template-columns: 0.4fr 1fr;

        .prod-wrapper{
            .Prod-grid{
                grid-template-columns: repeat(2,1fr);
            }
        }
    }
    @media (max-width: 767px){
        width: 90%;
        grid-template-columns: 1fr;
        .prod-wrapper{
            .Prod-grid{
                grid-template-columns: 1fr;
            }
        }
        .filter-wrapper{
        overflow: hidden;
            h2{
                background-color: #00C37A;
                color: #FFF;
                padding: 1rem;
                border-radius: 5px;
                display: grid;
                place-items: center;
                justify-content: flex-start;
                cursor: pointer;
            }
        }
    }
`
function ProductsPage() {
    const { keyword } = useParams();
    const alert = useAlert();

    const [currPage, setCurrPage] = useState(1);
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState([0, 50000])
    const [ratings, setRatings] = useState(0);
    const [open, setOpen] = useState({ cart: false, search: false, menu: false });
    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 990px)').matches);
    const dispatch = useDispatch();
    const { loading, error, products, productsCount, resultPerPage } = useSelector(state => state.products);

    const HandlePrice = (e, newPrice) => {
        setPrice(newPrice)
    }

    const HandleRatings = (e, newRating) => {
        setRatings(newRating);
    }
    const setPages = (e) => {
        setCurrPage(e)
    }
    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(window.matchMedia('(max-width: 990px)').matches);
        })
    }, []);
    useEffect(() => {
        if (error) {
            return alert.error(error)
        }
        dispatch(getProduct(keyword, currPage, price, ratings, category));
        console.log(category);
    }, [dispatch, keyword, error, alert, currPage, price, ratings, category]);


    return (
        <PageStyles>

            <Header open={open} setOpen={setOpen} isMobile={isMobile} />

            {isMobile && <div className='slide-open' style={{ right: open.search && '0px' || open.cart && '0px' || open.menu && '0px' }} >
                {open.search && <SearchOpen />}
                {open.cart && <CartOpen />}
                {open.menu && <MenuOpen />}
            </div>}
            {loading ? (<Loader />) : (<MainContainerStyles>
                <ProductsPageStyles>
                    <div className="filter-wrapper">
                        <h2>FILTERS</h2>
                        <div className="filters">
                            <div className="price-filter">
                                <h3>Select Price</h3>
                                <Slider
                                    value={price}
                                    onChange={HandlePrice}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={50000}
                                    style={{
                                        color: "#00C37A",
                                        width: '80%',
                                        margin: '0 auto',
                                        padding: '0.5rem'
                                    }}
                                />
                            </div>
                            <div className="category-filter">
                                <h3>Select Category</h3>
                                <div>
                                    <input type="radio" name='category' value='machine' onChange={(e) => setCategory(e.target.value)} />
                                    <span>Machine</span>
                                </div>
                                <div>
                                    <input type="radio" name='category' value='machine' onChange={(e) => setCategory(e.target.value)} />
                                    <span>Machine</span>
                                </div>
                                <div>
                                    <input type="radio" name='category' value='machine' onChange={(e) => setCategory(e.target.value)} />
                                    <span>Machine</span>
                                </div>
                                <div>
                                    <input type="radio" name='category' value='anything' onChange={(e) => setCategory(e.target.value)} />
                                    <span>anything</span>
                                </div>
                                <div>
                                    <input type="radio" name='category' value='anything' onChange={(e) => setCategory(e.target.value)} />
                                    <span>anything</span>
                                </div>
                                <div>
                                    <input type="radio" name='category' value='anything' onChange={(e) => setCategory(e.target.value)} />
                                    <span>anything</span>
                                </div>

                            </div>
                            <div className="rating-filter">
                                <h3>Select Rating</h3>
                                <Slider
                                    value={ratings}
                                    onChange={HandleRatings}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    min={0}
                                    max={5}
                                    style={{
                                        color: "#00C37A",
                                        width: '80%',
                                        margin: '0 auto',
                                        padding: '0.5rem'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="prod-wrapper">
                        <h2>PRODUCTS</h2>
                        <div className="Prod-grid">
                            {products && products.map((product) => {
                                return <Product product={product} />
                            })}
                        </div>
                    </div>
                </ProductsPageStyles>
                {resultPerPage < productsCount && <div className='Pagination-wrapper'>
                    <Pagination
                        activePage={currPage}
                        itemsCountPerPage={resultPerPage}
                        totalItemsCount={productsCount}
                        onChange={setPages}
                        nextPageText="Next"
                        prevPageText="Prev"
                        firstPageText="1st"
                        lastPageText={"Last"}
                        activeClass='activePage'
                        activeLinkClass='activeLink'
                        itemClass='page-item'
                        linkClass='page-link'
                    />
                </div>}
            </MainContainerStyles>)}

            <PreFooter />
            <Footer />
        </PageStyles>
    )
}

export default ProductsPage