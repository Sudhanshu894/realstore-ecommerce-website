import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useNavigate, useParams } from "react-router-dom";
import SideBar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { Button } from '@material-ui/core';
import { clearErrors, getUserDetails, UpdateUser } from '../../redux/UserRed/Actions';
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import PersonIcon from "@material-ui/icons/Person";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";
import Loader from '../../utils/Loader';
import { USER_UPDATE_RESET } from '../../redux/UserRed/ActionTypes';

const DashBoardStyles = styled.div`
    width: 80%;
    height: fit-content;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    gap: 1rem;
    background: #BEBEBE;
    border-radius: 15px;
    .dashboard-container{
        padding: 2rem;
        display: grid;
        height: 60vh;
        gap: 1rem;
        overflow: auto;
        &::-webkit-scrollbar{
            width: 5px;
        }
        
        .prodUpdateForm{
            width: 70%;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 2rem;

            & > h2{
                text-align: center;
                font-size: 1.5rem;
                font-family: 'Poppins',sans-serif;
                font-weight: 500;
            }

            .productform{
                width: 90%;
                margin: 0 auto;
                display: flex;
                height: 100%;
                flex-direction: column;
                justify-content: center;
                gap: 1rem;

                & > div{
                    width: 70%;
                    height: 3rem;
                    border: 1px solid #FFF;
                    border-radius: 5px;
                    align-self: center;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    background-color: #FFF;
                    padding: 0.5rem 1rem;

                    input,select{
                        width: 85%;
                        height: 100%;
                        font-size: 1rem;
                        font-family: 'Poppins',sans-serif;
                        color:#181818;
                        background-color: transparent;
                        border: none;
                        outline: none;
                    }
                    input::file-selector-button{
                        cursor: pointer;
                        width: 100%;
                        height: 100%;
                        border: none;
                        margin: 0%;
                        font: 400 1rem 'Poppins',sans-serif;
                        transition: all 0.5s;
                        padding: 0 1rem;
                        color: rgba(0, 0, 0, 0.623);
                        background-color: rgb(255, 255, 255);
                    }
                    svg{
                        width: 1.5rem;
                        height: 1.5rem;
                    }
                }
                .imgdiv{
                    height: fit-content;
                    display: grid;
                    grid-template-columns: repeat(3,1fr);
                    gap: 0.5rem;

                    img{
                        width: 2.5rem;
                        height: 2.5rem;
                        object-fit: cover;
                        margin: 0 auto;
                        border-radius: 5px;
                    }
                }
                & > button{
                    width: 50%;
                    height: 3.5rem;
                    font-size: 1.2rem;
                    font-weight: 600;
                    font-family: 'Poppins',sans-serif;
                    background-color: #00C37A;
                    color: #FFF;
                    margin: 0 auto;
                    border-radius: 8px;
                }
            }
        }
        
    }
    @media (min-width: 991px) and (max-width: 1380px){
        width: 980px;
        
    }
    @media (min-width: 768px) and (max-width: 990px){
        width: 90%;
        grid-template-columns: 0.02fr 1fr;
        .dashboard-container{
            .prodUpdateForm{
                width: 90%;

                .productform{
                    width: 100%;

                    & > div{
                        width: 90%;
                    }
                }
            }
        }
        
    }
    @media (min-width: 650px) and (max-width: 767px){
        width: 90%;
        grid-template-columns: 0.01fr 1fr;
        .dashboard-container{
            .prodUpdateForm{
                width: 90%;

                .productform{
                    width: 100%;

                    & > div{
                        width: 100%;
                    }
                }
            }
        }
        
    }
    @media (max-width: 649px){
        width: 90%;
        grid-template-columns: 0.01fr 1fr;
        .dashboard-container{
            padding: 1rem;
            .prodUpdateForm{
                width: 90%;

                .productform{
                    width: 100%;

                    & > div{
                        width: 100%;
                    }
                }
            }
        }
    }
`

function AdminUserUpdate({ userdata }) {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const alert = useAlert();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector(state => state.profile);

    // Create Product States
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");


    const UpdateUserHandler = () => {

        const data = {
            name: name,
            email,
            role,
        }
        dispatch(UpdateUser(id, data));
    }

    useEffect(() => {


        if (user && user._id !== id) {
            dispatch(getUserDetails(id));
        } else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);

        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("User Updated Successfully");
            dispatch({ type: USER_UPDATE_RESET });
            dispatch(clearErrors());
            navigate('/admin/users');
        }
    }, [dispatch, alert, error, id, user, updateError, isUpdated]);

    return (
        <>
            <DashBoardStyles>
                <SideBar user={userdata} />
                <div className="dashboard-container">
                    <div className="prodUpdateForm">
                        <h2>Update User's Details</h2>

                        {loading ? <Loader /> : <div className="productform">
                            <div>
                                <PersonIcon />
                                <input
                                    type="text"
                                    placeholder="Username"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <MailOutlineIcon />
                                <input
                                    type="email"
                                    placeholder="Email Address"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div >
                                <VerifiedUserIcon />
                                <select
                                    required
                                    value={role}
                                    onChange={(e) => setRole(e.target.value)}
                                >
                                    <option value="">Select Role</option>
                                    <option value="user">User</option>
                                    <option value="admin">Admin</option>
                                </select>
                            </div>

                            <Button
                                onClick={UpdateUserHandler}

                            >
                                Update User
                            </Button>
                        </div>}
                    </div>
                </div>
            </DashBoardStyles>
        </>
    )
}

export default AdminUserUpdate