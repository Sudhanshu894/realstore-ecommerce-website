import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import user from '../../assets/user.svg';
import { clearErrors, Loginuser } from '../../redux/UserRed/Actions';
import Loader from '../../utils/Loader';

const LoginStyles = styled.div`
    width: 1230px;
    height: fit-content;
    padding: 2rem;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    background-color: #FFF;

    h3{
        padding-bottom: 1rem;
        border-bottom: 0.5px solid #BEBEBE;
        font-size: 1.5rem;
        opacity: 0.9;
        cursor: pointer;
        transition: 0.2s ease-in-out;

        &:hover{
            color: #00C37A;
        }
    }
    img{
        align-self: center;
        width: 5rem;
        height: 5rem;
    }
    .loginform{
        width: fit-content;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding: 2rem 0;
        border: none;
        border-bottom: 0.5px solid #BEBEBE;

        &>div{
            display: flex;
            gap: 1rem;
            align-items: center;
            width: fit-content;

            input{
                width: 365px;
                height: 4rem;
                border: 0.5px solid #BEBEBE;
                border-radius: 5px;
                padding: 0 2rem 0 2rem;
                font-size: 1rem;
                font-family: 'Poppins',sans-serif;

                &:hover{
                    border: none;
                    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                }
                &:focus{
                    border: none;
                    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                }
            }
            p{
                font-size: 1rem;
                font-family: 'Poppins',sans-serif;
                font-weight: 500;
            }
        }
        .email,.password{
            align-self: flex-end;
        }
        .forget-pass{
            align-self: center;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            p{
                font-size: 0.9rem;
                cursor: pointer;
                transition: 0.3s ease-in-out;

                &:hover{
                    border-bottom: 1px solid black;
                }
            }
            button{
                height: 4rem;
                width: 150px;
                color: white;
                background-color: #00C37A;
                border: none;
                border-radius: 5px;
                font-size: 1.3rem;
                font-weight: bold;
            }
        }
    }
    p{
        align-self: center;
        font-size: 1rem;
        cursor: pointer;

        span{
            font-size: 1rem;
            font-weight: bold;
            transition: all 0.2s;

            &:hover{
                color: #00C37A;
                border-bottom: 1px solid #00C37A;
            }
        }
    }
    @media (max-width: 1380px){
       width: 980px;
    }
    @media (min-width: 601px) and (max-width: 990px) {
        width: 90%;


    }

    @media (max-width: 600px){
        width: 90%;
        h3{
            font-size: 1.4rem;
        }
        img{
            width: 4rem;
            height: 4rem;
        }
        .loginform{

            &>div{
                gap: 0.8rem;
                input{
                    width: 280px;
                    height: 3.5rem;
                    padding: 0 1.5rem 0 1.5rem;
                    font-size: 0.9rem;
                }
                p{
                    display: none;
                }
                
            }
            .forget-pass{
                p{
                    font-size: 0.8rem;
                }
                button{
                    height: 3.5rem;
                    width: 100px;
                    font-size: 1.2rem;
                }
            }
        }
        p{
            font-size: 0.9rem;
            span{
                font-size: 0.9rem;
            }
        }

    }
`

function Login({ setIsLogin }) {

    const [email, setEmail] = useState("");
    const alert = useAlert();
    const navigate = useNavigate();
    const { error, loading, isAuthenticated } = useSelector(state => state.user);
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const HandleLogin = () => {
        if (email !== "" && password !== "") {
            dispatch(Loginuser(email, password));
            alert.success("User Login Successfully")
        }
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isAuthenticated) {
            navigate('/account');
        }
    }, [dispatch, error, alert, navigate, isAuthenticated]);
    return (
        <>
            {loading ? (<Loader />) : (<LoginStyles>
                <h3>LOGIN TO YOUR ACCOUNT</h3>
                <img src={user} alt="" />
                <div className="loginform">
                    <div className="email">
                        <p>Email</p>
                        <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="password">
                        <p>Password</p>
                        <input type="password" placeholder='Enter Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="forget-pass">
                        <p onClick={() => navigate('/password/forgot')}>Forget your password?</p>
                        <button onClick={() => {
                            HandleLogin();
                        }}>SIGN IN</button>
                    </div>
                </div>
                <p>No account ? <span onClick={() => setIsLogin(false)}>Create one here</span></p>
            </LoginStyles>)}
        </>
    )
}

export default Login