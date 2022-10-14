import React, { useState } from 'react'
import styled from 'styled-components'
import searchicon from '../../assets/imgs/search.svg';
import carticon from '../../assets/imgs/bag.svg';
import usericon from '../../assets/imgs/user.svg';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

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

            .cart,.profile{
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
                    width: 1.8rem;
                    height: 1.8rem;
                }
                p{
                    font-size: 1.3rem;
                    font-weight: bold;
                }
            }
            .profile{
                width: 120px;
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
                img{
                    width: 3.5rem;
                    height: 3.5rem;
                    object-fit: cover;
                    border-radius: 50%;
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

function NavbarMid({ isAuth, user }) {
    const navigate = useNavigate();
    const [keyword, setKeyword] = useState("");
    const eventHandle = () => {
        if (keyword.trim()) {
            navigate(`/products/${keyword}`)
        } else {
            navigate('/products');
        }
    }
    const searchHandler = (e) => {
        if (e.key === 'Enter') {
            eventHandle();
        }
    }
    return (
        <NavMidStyles>
            <div className='navMid'>
                <div className='logo' onClick={() => { navigate('/') }}>
                    <p>R</p><p>ST0RE</p>
                </div>
                <div className="search-cart-Bx">
                    <div className="search">
                        <input type="text" placeholder='Search our catalog' onChange={(e) => setKeyword(e.target.value)} onKeyUp={(e) => { searchHandler(e) }} />
                        <img src={searchicon} alt="search" onClick={eventHandle} />
                    </div>
                    <div onClick={() => { navigate('/cart') }} className="cart">
                        <img src={carticon} alt="carticon" />
                        <p>CART</p>
                    </div>
                    {isAuth && <div onClick={() => {
                        navigate('/login')
                    }} className="profile">
                        <img src={user.avatar.url !== "profile_Pic_Url" ? user.avatar.url : usericon} alt="usericon" />
                    </div>}
                </div>
            </div>
        </NavMidStyles>
    )
}

export default NavbarMid