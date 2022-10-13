import React, { useEffect, useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import usericon from '../../assets/imgs/user.svg';
import { clearErrors, Loaduser, Updateprofile } from '../../redux/UserRed/Actions';
import { PROFILE_UPDATE_RESET } from '../../redux/UserRed/ActionTypes';
import Loader from '../../utils/Loader';
import arrow from '../../assets/imgs/icons8-up-arrow-96.png';

const UpdateUserForm = styled.div`
    width: 100vw;
    height: fit-content;
    margin: 2rem 0;

    .update-user{
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
        .update-form {
            width: 100%;
            padding: 2rem;
            margin: 2rem auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;
            background-color: #FFF;

            img{
                align-self: center;
                width: 5rem;
                height: 5rem;
                object-fit: cover;
                border-radius: 50%;
                transition: all 0.3s ease-in-out;

                &:hover{
                    transform: translateY(-3px);
                    width: 5.3rem;
                    height: 5.3rem;
                    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
                }
            }
            .updateform{
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
        .update-user{
            width: 980px;
        } 
    }
    @media (min-width: 601px) and (max-width: 990px) {
        .update-user{
            width: 90%;
        }
    }
    @media (max-width: 600px){
        .update-user{
            width: 90%;
            h2{
                font-size: 1.4rem;
            }
            .update-form{
                img{
                    width: 4rem;
                    height: auto;
                }
                .updateform{

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
            }
        }
    }
`
function ProfileUpdate() {

    const alert = useAlert();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.user);
    const { isUpdated, loading, error } = useSelector((state) => state.profile);
    const [avatarpreview, setAvatarPreview] = useState(usericon);
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [avatar, setAvatar] = useState();
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
    const HandleUpdate = () => {
        if (email !== "" && name !== "") {
            let data = { name, email }
            if (avatar !== undefined) {
                data.avatar = avatar;
            }
            console.log(data);
            dispatch(Updateprofile(data))
        } else {
            alert.error("please enter valid details");
        }
    }
    useEffect(() => {

        if (user) {
            setName(user.name);
            setEmail(user.email);
            setAvatarPreview(user?.avatar.url === "profile_Pic_Url" ? usericon : user.avatar.url);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (isUpdated) {
            alert.success("Profile Update Successfully!");
            dispatch(Loaduser());
            navigate('/profile');

            dispatch({
                type: PROFILE_UPDATE_RESET,
            })
        }

    }, [dispatch, error, alert, navigate, isUpdated, user]);
    return (
        <>
            {loading ? (<Loader />) : (<UpdateUserForm>
                <div className="update-user">
                    <h2>PROFILE UPDATE FORM</h2>
                    <div className="update-form">
                        <img onClick={() => navigate('/profile')} src={avatarpreview} alt="" />
                        <div className="updateform">

                            <div className="name">
                                <p>Username</p>
                                <input type="text" value={name} placeholder='Enter Username' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="email">
                                <p>Email</p>
                                <input type="email" value={email} placeholder='Enter Email' onChange={(e) => setEmail(e.target.value)} />
                            </div>
                            <div className="avatar">
                                <p>Profile pic</p>
                                <input type="file" accept='image/*' id='avatar' name="avatar" onChange={(e) => { HandleAvatarUpload(e) }} />
                            </div>
                            <div className="forget-pass">
                                <button onClick={HandleUpdate}>SAVE</button>
                            </div>
                        </div>
                    </div>
                    <div className="back" onClick={() => { navigate('/profile') }}>
                        <img src={arrow} alt="" />
                        <p>Back</p>
                    </div>
                </div>
            </UpdateUserForm>)}
        </>
    )
}

export default ProfileUpdate