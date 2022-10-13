import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import PersonIcon from '@material-ui/icons/Person'
import styled from 'styled-components'
import arrow from '../../assets/imgs/icons8-up-arrow-96.png'
import Loader from '../../utils/Loader';


const UserInfoStyles = styled.div`
    width: 100vw;
    height: fit-content;
    margin: 2rem 0;

    .userinfo-wrapper{
        width: 1230px;
        height: fit-content;
        padding: 2rem 3rem;
        margin: 0 auto;
        background-color: #FFF;

        h2{
            font-size: 1.6rem;
            font-weight: bold;
            border-bottom: 0.5px solid #BEBEBE;
            padding-bottom: 1rem ;
        }
        .info{
            display: grid;
            margin: 2rem 0;
            grid-template-columns: repeat(2,1fr);
            gap: 1rem;
            
             .userimg{
                width: 90%;
                height: auto;
                display: grid;
                place-items: center;
                border-radius: 150px;
                margin: 0 auto;
                
                svg{
                    margin: 0 auto;
                    width: 180px;
                    height: 180px;
                    object-fit: cover;
                    border-radius: 50%;
                }
                
                img{
                    width: 180px;
                    height: 180px;
                    object-fit: cover;
                    border-radius: 50%;
                }
                button{
                    width: 70%;
                    height: 4rem;
                    font-size: 1.2rem;
                    color: white;
                    background-color: #2ed89a;
                    margin: 0 auto;
                    font-family: 'Poppins',sans-serif;
                    font-weight: 500;
                    border: none;
                    border-radius: 10px;
                    transition: 0.2s ease-in-out;

                    &:hover{
                        background-color: #00C37A;
                        transform: translateY(-3px);
                        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
                    }
                }
            }
            .userinfo{
                display: flex;
                flex-direction: column;
                gap: 1rem;
                *{
                    font-family: 'Poppins',sans-serif;
                }
                & > div{
                    display: flex;
                    align-items: center;
                    gap: 1rem;


                    p{
                        font-size: 1.2rem;
                        font-weight: 500;
                    }
                    text{
                        font-size: 1.2rem;
                    }
                }
                button{
                    width: 80%;
                    height: 4rem;
                    font-size: 1.1rem;
                    margin: 2rem auto;
                    color: white;
                    background-color: #2ed89a;
                    border: none;
                    border-radius: 10px;
                    transition: 0.2s ease-in-out;

                    &:hover{
                        background-color: #00C37A;
                        transform: translateY(-3px);
                        box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
                    }
                }
            }

        }
        .back{
            display: flex;
            align-items: center;
            opacity: 0.9;
            transition: 0.2s ease-in-out;
            cursor: pointer;
            gap: 1rem;
            img{
                transform: rotate(-90deg);
                width: 1.5rem;
                height: auto;
            }
            p{
                font-size: 1.1rem;
                font-weight: 600;
            }
            &:hover{
                opacity: 1;
            }
        }
    }
    @media (min-width: 991px) and (max-width: 1380px){
        .userinfo-wrapper{
            width: 980px;
        } 
    }
    @media (max-width: 990px) {
        .userinfo-wrapper{
            width: 90%;
            .info{
                .userinfo{
                    gap: 1.5rem;
                    &>div{
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 0.2rem;
                    }
                }
            }
        }
    }
    @media (max-width: 767px){
        .userinfo-wrapper{
            width: 90%;
            .info{
                grid-template-columns: 1fr;
                gap: 2rem;
                .userinfo{
                    gap: 1.5rem;
                    &>div{
                        flex-direction: column;
                        align-items: center;
                        gap: 0.2rem;
                    }
                    button{
                        font-size: 0.9rem;
                    }
                }
            }
        }
    }
`


function UserInfo() {
    const { user, loading, isAuthenticated } = useSelector(state => state.user);
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
        }
    }, [isAuthenticated, loading])
    return (
        <UserInfoStyles>
            <div className="userinfo-wrapper">
                <h2>YOUR INFORMATION</h2>
                {loading ? (<Loader />) : (<div className="info">
                    <div className="userimg">
                        {user?.avatar.url === "profile_Pic_Url" ? <PersonIcon /> : <img src={user?.avatar.url} alt={user?.name} />}
                        <button onClick={() => navigate('/profile/update')}>EDIT PROFILE</button>
                    </div>
                    <div className="userinfo">
                        <div className="uname">
                            <p>Username :</p>
                            <text>{user?.name[0].toUpperCase() + user?.name.split("").splice(1, user?.name?.length - 1).join("")}</text>
                        </div>
                        <div className="umail">
                            <p>Email :</p>
                            <text>{user?.email}</text>
                        </div>
                        <div className="upassword">
                            <p>Password :</p>
                            <text></text>
                        </div>
                        <div className='udate'>
                            <p>Joined On :</p>
                            <text>{String(user?.createdAt).substr(0, 10)}</text>
                        </div>
                        <button onClick={() => { navigate('/password/update') }}>
                            RESET/CHANGE PASSWORD
                        </button>
                    </div>
                </div>)}
                <div className="back" onClick={() => { navigate('/account') }}>
                    <img src={arrow} alt="" />
                    <p>Back</p>
                </div>
            </div>
        </UserInfoStyles>
    )
}

export default UserInfo