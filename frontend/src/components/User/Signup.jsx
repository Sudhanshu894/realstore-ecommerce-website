import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import user from '../../assets/imgs/user.svg';
import { clearErrors, Registeruser } from '../../redux/UserRed/Actions';
import Loader from '../../utils/Loader';

const SignupStyles = styled.div`
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
    .signupform{
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

            input,input::file-selector-button{
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
            height: auto;
        }
        .signupform{

            &>div{
                gap: 0.8rem;
                input,input::file-selector-button{
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

function Signup({ setIsLogin }) {

    const alert = useAlert();
    const navigate = useNavigate();
    const [avatarpreview, setAvatarPreview] = useState(user);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState();
    const { error, loading, isAuthenticated } = useSelector(state => state.user);
    const dispatch = useDispatch();

    const HandleAvatarUpload = (e) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (reader.readyState === 2) {
                setAvatarPreview(reader.result);
                setAvatar(reader.result);
            }
        }
        reader.readAsDataURL(e.target.files[0]);
    }
    const HandleRegister = () => {
        if (email !== "" && password !== "" && name !== "" && avatar !== "" && confirmpassword !== "") {
            if (password === confirmpassword) {

                let data = { name, email, password, avatar }
                console.log(data);
                dispatch(Registeruser(data))
            } else {
                alert.error("Password doesn't match")
            }
        } else {
            alert.error("please enter valid details");
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
            {loading ? (<Loader />) : (<SignupStyles>
                <h3>CREATE AN ACCOUNT</h3>
                <img src={avatarpreview} alt="" />
                <div className="signupform">

                    <div className="name">
                        <p>Username</p>
                        <input type="text" placeholder='Enter Username' onChange={(e) => setName(e.target.value)} />
                    </div>
                    <div className="email">
                        <p>Email</p>
                        <input type="email" placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="password">
                        <p>Password</p>
                        <input type="password" placeholder='Create New Password' onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <div className="password">
                        <p>Password</p>
                        <input type="password" placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
                    </div>
                    <div className="avatar">
                        <p>Profile pic</p>
                        <input type="file" accept='image/*' id='avatar' name="avatar" onChange={(e) => { HandleAvatarUpload(e) }} />
                    </div>
                    <div className="forget-pass">
                        <button onClick={HandleRegister}>SAVE</button>
                    </div>
                </div>
                <p>Already have an account ? <span onClick={() => setIsLogin(true)}>login from here</span></p>
            </SignupStyles>)}
        </>
    )
}

export default Signup