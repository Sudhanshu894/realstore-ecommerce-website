import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import home from '../../assets/home.svg'
import usericon from '../../assets/user.svg'
const MenuOpenStyles = styled.div`
    width: 100%;
    height: fit-content;
    .mopen{
        width: 90%;
        height: fit-content;
        display: flex;
        margin: 1rem auto;
        flex-direction: column;
        gap: 2rem;
        .muser{
            display: flex;
            align-items: center;
            gap: 1rem;

            img{
                height: 3rem;
                width: auto;
                transition: 0.2s ease-in-out;
                border-radius: 50%;

                &:hover{
                    transform: translateY(-2px);
                    box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
                }
            }
            p{
                font-size: 1.4rem;
                font-weight: bold;
                cursor: pointer;
                &:hover{
                    color: #00C37A;
                }
            }
        }
        & > div, & > div > p{
            font-size: 1.3rem;
            font-weight: 500;
            color: #181818;
            transition: 0.3s ease-in-out;
        }
        .msignin{
            font-size: 1rem;
            font-family: 'Poppins', sans-serif;
            width: fit-content;
            padding: 0 2rem 1.5rem 0;
            border-bottom: 1px solid #d1d1d1;
            cursor: pointer;
        }
        .macc{
            margin-top: 0.5rem;
            font-size: 1.5rem;
            font-weight: 700;
            opacity: 0.9;
            cursor: pointer;
            transition: 0.2s ease-in-out;

            &:hover{
                color: #00C37A;
            }
        }
        .navlinks{
            display: flex;
            flex-direction: column;
            gap: 1.8rem;
            padding: 2rem 0;
            border-top: 0.5px solid #BEBEBE;
            border-bottom: 0.5px solid #BEBEBE;
            & > div{
                p > a{
                    color: #181818;
                    font-weight: 500;
                }
            }
            & > div:hover{
                color: #00C37A;
                cursor: pointer;
                p > a{
                    color: #00C37A;
                    cursor: pointer;
                }
            }
            .mhome{
                display: flex;
                gap: 0.6rem;
            }
        }

    }
    img{
        width: 20px;
        height: 20px;
    }
    button{
        width: 60%;
        min-width: 180px;
        margin: 0 auto;
        height: 4rem;
        font-size: 1.5rem;
        font-weight: 500;
        color: #FFF;
        background-color: #00C37A;
        border: none;
        border-radius: 5px;
        &:hover{
            box-shadow: rgba(0, 0, 0, 0.2) 0px 18px 50px -10px;
        }
    }

    @media (max-width: 767px){
        .mopen{
            width: 80%;
        }
    }
`

function MenuOpen({ isAuth, user, setOpen, HandleLogout, HandleSideMenu }) {
    const navigate = useNavigate();


    return (
        <MenuOpenStyles>
            <div className="mopen">
                {isAuth ? (<div className='muser'>
                    {isAuth ? <img src={user.avatar.url === "profile_Pic_Url" ? usericon : user.avatar.url} alt="user_pic" /> : <img src={usericon} alt="user_pic" />}
                    <p onClick={() => {
                        navigate('/account')
                        HandleSideMenu();
                    }}>{user.name[0].toUpperCase() + user.name.split("").splice(1, user.name.length - 1).join("")}</p>
                </div>) : (<div className='msignin' onClick={() => {
                    HandleSideMenu()
                    navigate('/login');
                }}>Signin</div>)}
                <div className='macc' onClick={() => {
                    HandleSideMenu()
                    navigate('/login')
                }}>ACCOUNT</div>
                <div className="navlinks">
                    <div className="mhome" onClick={() => {
                        navigate('/');
                        HandleSideMenu();
                    }}>
                        <img src={home} alt="" />
                        <span>HOME</span>
                    </div>
                    <div>
                        <p onClick={HandleSideMenu}><Link to='/products'>PRODUCTS</Link></p>
                    </div>
                    <div>
                        <p onClick={HandleSideMenu}><Link to='/cart'>CART</Link></p>
                    </div>
                    {isAuth === true && <div>
                        <p onClick={HandleSideMenu}><Link to='/orders/profile'>ORDERS</Link></p>
                    </div>}
                    <div>
                        <p onClick={HandleSideMenu}><Link to='/about'>ABOUT US</Link></p>
                    </div>
                    <div>
                        <p onClick={HandleSideMenu}><Link to='/contact'>CONTACT US</Link></p>
                    </div>
                </div>
                {isAuth && <button onClick={() => {
                    HandleSideMenu();
                    HandleLogout();
                    navigate('/');
                }}>Signout</button>}
            </div>
        </MenuOpenStyles>
    )
}

export default MenuOpen