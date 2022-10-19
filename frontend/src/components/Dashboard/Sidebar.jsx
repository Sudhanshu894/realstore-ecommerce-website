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

const SideBarStyles = styled.div`
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
    @media (min-width: 768px) and (max-width: 990px){
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
    @media (min-width: 650px) and (max-width: 767px){
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
    @media (max-width: 649px){
        padding: 0.5rem;
        .userinfo{
            width: fit-content;
            margin: 0 auto;
            img{
                width: 1.8rem;
                height: 1.8rem;
            }

            p{
                display: none;
            }
        }
        .navLinks{
            a{
                svg{
                    width: 1.2rem;
                    height: 1.2rem;
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
                width: 1.2rem;
                height: 1.2rem;
            }
        }
    }

`

function SideBar({ user }) {

    return (
        <SideBarStyles>
            <div className="userinfo">
                <img src={user?.avatar?.url} alt="" />
                <p>{user?.name}</p>
            </div>
            <div className='navLinks'>
                <Link to="/dashboard">
                    <DashboardIcon />
                    <p>Dashboard</p>
                </Link>
                <Link to="/admin/products">
                    <ImportExportIcon />
                    <p>Products</p>
                </Link>
                <Link to="/admin/orders">
                    <ListAltIcon />
                    <p>Orders</p>
                </Link>
                <Link to="/admin/users">
                    <PeopleIcon />
                    <p>Users</p>
                </Link>
                <Link to="/dashboard">
                    <RateReviewIcon />
                    <p>Reviews</p>
                </Link>
            </div>
            <Link to="/profile">
                <PeopleIcon />
                <p>My Profile</p>
            </Link>
        </SideBarStyles>
    )
}

export default SideBar