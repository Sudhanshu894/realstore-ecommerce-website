import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components'
import { clearErrors, Resetuserpass } from '../../redux/UserRed/Actions';
import Loader from '../../utils/Loader';
import arrow from '../../assets/icons8-up-arrow-96.png';

const ResetPasswordForm = styled.div`
    width: 100vw;
    height: fit-content;
    margin: 2rem 0;

    .reset-password{
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

            &:hover{
                color: #00C37A;
            }
        }
        .reset-form {
            width: 100%;
            padding: 2rem;
            margin: 2rem auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background-color: #FFF;
            .resetform{
                width: fit-content;
                margin: 0 auto;
                display: flex;
                flex-direction: column;
                gap: 2rem;
                padding: 2rem 0;
                padding-top: 0;
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
                    #avatar{
                        padding: 0;
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
        .reset-password{
            width: 980px;
        } 
    }
    @media (min-width: 601px) and (max-width: 990px) {
        .reset-password{
            width: 90%;
        }
    }
    @media (max-width: 600px){
        .reset-password{
            width: 90%;
            h2{
                font-size: 1.4rem;
            }
            .reset-form{
                img{
                    width: 4rem;
                    height: auto;
                }
                .resetform{

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
            }
        }
    }
`
function ResetPassword() {

    const { token } = useParams();

    const alert = useAlert();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const { error, success, loading } = useSelector(state => state.forgotPassword);
    const dispatch = useDispatch();

    const ResetuserPass = () => {

        if (password !== "" && confirmPassword !== "") {
            dispatch(Resetuserpass(token, { password, confirmPassword }));
        } else {
            alert.error("Please fill all the details");
        }
    }
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (success) {
            alert.success("Password Updated Successfully");
            navigate('/login');
        }

    }, [dispatch, error, alert, navigate, success]);
    return (
        <>
            {loading ? <Loader /> : <ResetPasswordForm>
                <div className="reset-password">
                    <h2>UPDATE USER PASSWORD</h2>
                    <div className="reset-form">
                        <div className="resetform">

                            <div className="password">
                                <p>New Password</p>
                                <input type="password" placeholder='Enter New Password' onChange={(e) => setPassword(e.target.value)} />
                            </div>
                            <div className="password">
                                <p>Confirm Password</p>
                                <input type="password" placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
                            </div>
                            <div className="forget-pass">
                                <button onClick={ResetuserPass}>SEND</button>
                            </div>
                        </div>
                    </div>
                    <div className="back" onClick={() => { navigate('/login') }}>
                        <img src={arrow} alt="" />
                        <p>Back</p>
                    </div>
                </div>
            </ResetPasswordForm>}
        </>
    )
}

export default ResetPassword