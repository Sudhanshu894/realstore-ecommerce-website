import React from 'react'
import styled from 'styled-components'
import searchicon from '../../assets/imgs/search.svg';
import carticon from '../../assets/imgs/bag.svg';

const NavMidStyles = styled.div`
    width: 100vw;
    height: 6rem;

    .navMid{
        width: 1230px;
        height: 100%;
        margin: 2rem auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
        /* border: 1px solid red; */

        .logo {
            display: flex;
            align-items: center;
            cursor: pointer;
        }
        .logo > p:nth-child(1){
            position: relative;
            z-index: 1;
            font-size: 3.5rem;
            width: 5rem;
            height: 5rem;
            display: flex;
            align-items: center;
            justify-content: center;
            background-color: #FFF;
            border-radius: 30px;
            font-weight: 900;
            color: #30E3B8;
        }

        .logo > p:nth-child(2){
            position: relative;
            z-index: 0;
            font-size: 2.2rem;
            color: #FFF;
            letter-spacing: -1px;
            font-weight: 600;
            font-family: 'Poppins', sans-serif;
            /* color: #30E3B8; */
            margin-left: -0.3rem;
        }
        .search-cart-Bx{
            height: 4rem;
            display: flex;
            align-items: center;
            gap: 1rem;

            .search {
                position: relative;

                input{
                    width: 310px;
                    height: 4.2rem;
                    padding: 0 1rem 0 1.5rem;
                    border-radius: 3px;
                    font-size: 0.9rem;
                    border: none;
                    font-family: 'Poppins', sans-serif;
                    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                    font-weight: 500;
                    transition: 0.2s ease-in-out;

                    &::placeholder{
                        color: #BEBEBE;
                    }

                    &:hover{
                        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
                    }

                    &:focus{
                        border: none;
                        outline: none;
                    }
                }

                & > img{
                    position: absolute;
                    width: 2.2rem;
                    height: 2.2rem;
                    top: 0.9rem;
                    right: 1rem;
                    color: #000000c1;
                }
            }

            .cart{
                width: 160px;
                height: 4.2rem;
                display: flex;
                border-radius: 5px;
                border: none;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                background-color: #FFF;
                box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                transition: 0.2s ease-in-out;
                cursor: pointer;

                &:hover{
                        box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
                }
                img{
                    width: 2rem;
                    height: 2rem;
                }
                p{
                    font-size: 1.4rem;
                    font-weight: bold;
                }
            }
            
        }
    }
    @media (max-width: 1380px){
        .navMid{
            width: 980px;
        }
    }
`

function NavbarMid() {
    return (
        <NavMidStyles>
            <div className='navMid'>
                <div className='logo'>
                    <p>R</p><p>ST0RE</p>
                </div>
                <div className="search-cart-Bx">
                    <div className="search">
                        <input type="text" placeholder='Search our catalog' />
                        <img src={searchicon} alt="search" />
                    </div>
                    <div className="cart">
                        <img src={carticon} alt="carticon" />
                        <p>CART</p>
                    </div>
                </div>
            </div>
        </NavMidStyles>
    )
}

export default NavbarMid