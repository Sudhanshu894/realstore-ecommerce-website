import React from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import { TreeView, TreeItem } from "@material-ui/lab";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PostAddIcon from "@material-ui/icons/PostAdd";
import AddIcon from "@material-ui/icons/Add";
import ImportExportIcon from "@material-ui/icons/ImportExport";
import ListAltIcon from "@material-ui/icons/ListAlt";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import RateReviewIcon from "@material-ui/icons/RateReview";

const DashBoardStyles = styled.div`
    width: 80%;
    height: fit-content;
    margin: 2rem auto;
    display: grid;
    grid-template-columns: 0.3fr 1fr;
    gap: 1rem;
    background: #BEBEBE;
    border-radius: 15px;


    .sidebar{
        padding: 2rem;
        height: 60vh;
        background-color: #FFF;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
        gap: 1rem;
        border-radius: 15px;
        box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;

        .userinfo{
            width: 80%;
            display: flex;
            align-items: center;
            gap: 1rem;

            img{
                width: 5rem;
                height: 5rem;
                object-fit: cover;
                border-radius: 50%;
            }
            p{
                font-size: 1.5rem;
                font-family: 'Poppins',sans-serif;
                font-weight: 500;
            }
        }
        .navLinks{
            display: flex;
            flex-direction: column;

            a{
                color: #353535;
                width: 100%;
                height: 3rem;
                display: flex;
                align-items: center;
                gap: 1rem;
                border-radius: 15px;
                padding: 2rem 1rem;
                transition: 0.2s ease-in-out;
                
                svg{
                    width: 2rem;
                    height: 2rem;
                }
                p{
                    font-size: 1.2rem;
                    font-weight: 500;
                }
                
                
            }
        }
        a{
            padding: 2rem 1rem;
            color: #353535;
            width: 100%;
            height: 3rem;
            display: flex;
            align-items: center;
            gap: 1rem;
            border-radius: 15px;
            transition: 0.2s ease-in-out;

            svg{
                width: 2rem;
                height: 2rem;
            }
            p{
                font-size: 1.2rem;
                font-weight: 500;
            }

            &:hover{
                background-color: #3535355e;
                color: #181818;
            }
            &:active{
                background-color: #00C37A;
                color: #FFF;
            }
        }
    }
    .dashboard-container{
        padding: 2rem;
        display: grid;
        grid-template-columns: 2.5fr 1fr;

        .dashboard-summary{
            display: grid;
            grid-template-columns: repeat(3,1fr);
            grid-template-rows: repeat(6,1fr);
            gap: 1rem;

            .purchases{
                grid-column: span 3;
                display: grid;
                place-items: center;
                background-color: #FFF;
                border-radius: 15px;
                transition: 0.2s ease-in-out;
                p{
                    font-size: 1.3rem;
                    font-family: 'Poppins',sans-serif;
                    span{
                        font-family: 'Poppins',sans-serif;
                        font-weight: 500;
                    }
                }
            }
            & > div{
                background: #FFF;
                border-radius: 15px;
                box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
                transition: 0.2s ease-in-out;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                
                p{
                    font-family: 'Poppins',sans-serif;
                    font-size: 1.2rem;
                }
                p:nth-child(2){
                    font-weight: 500;
                }

                &:hover{
                    transform: translateY(-3px);
                    scale: 1.05;
                    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
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
        .sidebar{
            .userinfo{
                margin: 0 auto;
                width: fit-content;
                img{
                    width: 3rem;
                    height: 3rem;
                }
                p{
                    display: none;
                }
            }
            .navLinks{
                a{
                    p{
                        display:none;
                    }
                }
            }
            a{
                p{
                    display: none;
                }
            }
        }

    }
    @media (max-width: 767px){
        width: 90%;
        grid-template-columns: 0.1fr 1fr;
        .sidebar{
            padding: 1rem;
            .userinfo{
                width: fit-content;
                margin: 0 auto;
                img{
                    width: 2rem;
                    height: 2rem;
                }

                p{
                    display: none;
                }
            }
            .navLinks{
                a{
                    svg{
                        width: 1.4rem;
                        height: 1.4rem;
                    }
                   p{
                    display: none;
                   }
                }
            }
            a{
                p{
                    display: none;
                }
                svg{
                    width: 1.4rem;
                    height: 1.4rem;
                }
            }
        }
    }

`

function Dashboard({ user }) {

    return (
        <DashBoardStyles>
            <div className="sidebar">
                <div className="userinfo">
                    <img src={user.avatar?.url} alt="" />
                    <p>{user.name}</p>
                </div>
                <div className='navLinks'>
                    <Link to="/dashboard">
                        <DashboardIcon />
                        <p>Dashboard</p>
                    </Link>
                    <Link to="/dashboard">
                        <ImportExportIcon />
                        <p>Products</p>
                    </Link>
                    <Link to="/dashboard">
                        <ListAltIcon />
                        <p>Orders</p>
                    </Link>
                    <Link to="/dashboard">
                        <PeopleIcon />
                        <p>Users</p>
                    </Link>
                    <Link to="/dashboard">
                        <RateReviewIcon />
                        <p>Reviews</p>
                    </Link>
                </div>
                <Link to="/admin/reviews">
                    <PeopleIcon />
                    <p>My Profile</p>
                </Link>
            </div>
            <div className="dashboard-container">
                <div className="dashboard-summary">
                    <div className="purchases">
                        <p> Total Purchases - <span>₹5339900</span></p>
                    </div>
                    <div>
                        <p> Products</p>
                        <p> 50 </p>
                    </div>
                    <div>
                        <p> Orders</p>
                        <p> 32 </p>
                    </div>
                    <div>
                        <p> Users</p>
                        <p> 4 </p>
                    </div>
                </div>
            </div>
        </DashBoardStyles>
    )
}

export default Dashboard