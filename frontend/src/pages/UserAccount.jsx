import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import ListAltIcon from '@material-ui/icons/ListAlt';
import MailIcon from '@material-ui/icons/Mail';

const MainContainerStyles = styled.div`
    width: 100vw;
    height: fit-content;
    position: relative;
    z-index: 2;

    .account{
        width: 1230px;
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem 3rem;
        margin: 2rem auto;
        background-color: #FFF;

        h2{
            font-size: 1.6rem;
            font-weight: bold;
            border-bottom: 0.5px solid #BEBEBE;
            padding-bottom: 1rem ;
        }
        & > p{
            text-align: center;
            font-size: 1.1rem;
            font-weight: 500;
            font-family: 'Poppins',sans-serif;
            opacity: 0.9;
            color: black;
            cursor: pointer;
            transition: 0.1s ease-in-out;

            &:hover{
                color: #00c37a;
            }
        }

        .acc-info-grid{
            width: 100%;
            margin: 1rem auto;
            display: grid;
            grid-template-columns: repeat(3,1fr);
            height: 40vh;
            gap: 1rem;
            padding-bottom: 2rem;

            & > div{
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                border: none;
                gap: 1rem;
                transition: 0.2s ease-in-out;
                border-radius: 8px;
                cursor: pointer;
                box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;



                &:hover{
                    transform: translateY(-0.4rem);
                    box-shadow: rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px;

                    svg{
                        color: #00c370;
                    }
                    p{
                        color: #00c370;
                    }
                }

                svg{
                    width: 2.5rem;
                    height: 2.5rem;
                    transition: 0.2s ease-in-out;
                }
                
                p{
                    font-size: 1.3rem;
                    font-weight: 600;
                    transition: 0.2s ease-in-out;
                    
                }
            }

            .dashboard{
                grid-row: span 2;
            }
        }
    }

    @media (min-width: 991px) and (max-width: 1380px){
        .account{
            width: 980px;
        } 
    }
    @media (min-width: 768px) and (max-width: 990px) {
        .account{
            width: 90%;
            .acc-info-grid{
                grid-template-columns: repeat(2,1fr);

                & > div {
                    svg{
                        width: 2rem;
                        height: 2rem;
                    }
                    p{
                        font-size: 1.1rem;
                        font-weight: 500;
                    }
                }
            }
        }
    }
    @media (max-width: 767px){
        .account{
            width: 95%;
            .acc-info-grid{
                grid-template-columns: repeat(2,1fr);

                & > div {
                    padding: 1rem;
                    svg{
                        width: 1.8rem;
                        height: 1.8rem;
                    }
                    p{
                        font-size: 1rem;
                        font-weight: 500;
                    }
                }
            }
        }
    }

`
function UserPage({ user, HandleLogout, isAuth }) {
    const alert = useAlert();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuth) {
            navigate('/login');
        }
    }, [HandleLogout])

    return (
        <MainContainerStyles>
            <div className="account">
                <h2>YOUR ACCOUNT</h2>
                <div className="acc-info-grid">
                    {user?.role === "admin" && <div className='dashboard' onClick={() => {
                        navigate('/dashboard')
                    }}>
                        <DashboardIcon />
                        <p>DASHBOARD</p>
                    </div>}
                    <div style={{ gridRow: user?.role === "user" && 'span 2' }} onClick={() => {
                        navigate('/profile')
                    }}>
                        <PersonIcon />
                        <p>INFORMATION</p>
                    </div>
                    <div onClick={() => {
                        navigate('/cart')
                    }}>
                        <ShoppingCartIcon />
                        <p>CART</p>
                    </div>
                    <div onClick={() => {
                        navigate('/orders')
                    }}>
                        <ListAltIcon />
                        <p>ORDER HISTORY AND DETAILS</p>
                    </div>
                    <div onClick={() => {
                        navigate('/myalerts')
                    }}>
                        <MailIcon />
                        <p>MY ALERTS</p>
                    </div>
                </div>
                <p onClick={() => {
                    HandleLogout();
                }}>Signout</p>
            </div>
        </MainContainerStyles>
    )
}

export default UserPage