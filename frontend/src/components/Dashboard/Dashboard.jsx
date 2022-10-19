import React, { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from "react-router-dom";
import SideBar from './Sidebar';
import { Doughnut, Line } from 'react-chartjs-2'
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { clearErrors, getAllAdminProducts } from '../../redux/ProductRed/Action';

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
        grid-template-columns: 2.5fr 1fr;
        height: 60vh;

        .dashboard-summary{
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-columns: repeat(3,1fr);
            grid-template-rows: 10% 10%;
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
            .graph-data{
                width: 100%;
                height: fit-content;
                padding: 1rem;
                grid-column: span 3;
            }

        }
        .pie-chart{
            width: 90%;
            margin: 0 auto;
            height: fit-content;

        }
        
    }
    @media (min-width: 991px) and (max-width: 1380px){
        width: 980px;
        .dashboard-container{
            padding: 2rem;
            display: grid;
            grid-template-columns: 1fr;
            height: 60vh;
            overflow: auto;

            &::-webkit-scrollbar{
                width: 5px;
            }

            .dashboard-summary{
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: repeat(3,1fr);
                gap: 1rem;

                .purchases{
                    grid-column: span 3;
                    display: grid;
                    place-items: center;
                    background-color: #FFF;
                    border-radius: 15px;
                    transition: 0.2s ease-in-out;
                    p{
                        font-size: 1rem;
                    }
                }
                & > div{
                    p{
                        font-family: 'Poppins',sans-serif;
                        font-size: 1rem;
                    }
                }

            }
            .pie-chart{
                width: 50%;
                margin: 2rem auto;
            }
        }
        
    }
    @media (min-width: 768px) and (max-width: 990px){
        width: 90%;
        grid-template-columns: 0.02fr 1fr;
        .dashboard-container{
            padding: 2rem;
            display: grid;
            grid-template-columns: 1fr;
            height: 60vh;
            overflow: auto;

            &::-webkit-scrollbar{
                width: 5px;
            }

            .dashboard-summary{
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: repeat(3,1fr);
                gap: 1rem;

                .purchases{
                    grid-column: span 3;
                    display: grid;
                    place-items: center;
                    background-color: #FFF;
                    border-radius: 15px;
                    transition: 0.2s ease-in-out;
                    p{
                        font-size: 1rem;
                    }
                }
                & > div{
                    height: fit-content;
                    padding: 0.5rem;
                    p{
                        font-family: 'Poppins',sans-serif;
                        font-size: 1rem;
                    }
                }
                .graph-data{
                    margin-top: 2rem;
                }

            }
            .pie-chart{
                margin: 1rem auto;
                width: 50%;
            }
        }
    }
    @media (max-width: 767px){
       width: 90%;
        grid-template-columns: 0.02fr 1fr;
        .dashboard-container{
            padding: 1rem;
            display: grid;
            grid-template-columns: 1fr;
            height: 60vh;
            overflow: auto;

            &::-webkit-scrollbar{
                width: 5px;
            }

            .dashboard-summary{
                width: 100%;
                height: 100%;
                display: grid;
                grid-template-columns: repeat(3,1fr);
                gap: 1rem;

                .purchases{
                    grid-column: span 3;
                    display: grid;
                    place-items: center;
                    background-color: #FFF;
                    border-radius: 10px;
                    transition: 0.2s ease-in-out;
                    p{
                        font-size: 0.9rem;
                    }
                }
                & > div{
                    height: fit-content;
                    padding: 0.5rem;
                    p{
                        font-family: 'Poppins',sans-serif;
                        font-size: 0.9rem;
                    }
                }
                .graph-data{
                    margin-top: 2rem;
                }

            }
            .pie-chart{
                margin: 1rem auto;
                width: 70%;
            }
        }
    }

`

function Dashboard({ user }) {

    const dispatch = useDispatch();
    const { products } = useSelector(state => state.products);
    const { orders } = useSelector(state => state.allOrders);

    let ProductsOutofStock = 0;
    products && products?.forEach((item) => {
        if (item.stock === 0) {
            ProductsOutofStock++;
        }
    });
    let TotalPrice = products && products?.reduce((acc, curr) => {
        return acc + curr.price
    }, 0);

    useEffect(() => {
        dispatch(getAllAdminProducts());
    }, [dispatch]);

    const LineState = {
        labels: ["Initial Amount", "Total Revenue"],
        datasets: [
            {
                label: "TOTAL REVENUE",
                backgroundColor: ["#00C37A"],
                hoverBackgroundColor: ["#FFF"],
                data: [0, 20000],
            }
        ]
    }

    const PieState = {
        labels: ["InStock", "Out of Stock"],
        datasets: [
            {
                backgroundColor: ["#da7415", "#00C37A"],
                hoverBackgroundColor: ["teal", "#353535"],
                data: [products?.length - ProductsOutofStock, ProductsOutofStock],
            }
        ]
    }

    return (
        <DashBoardStyles>
            <SideBar user={user} />
            <div className="dashboard-container">
                <div className="dashboard-summary">
                    <div className="purchases">
                        <p> Total Purchases - <span>₹{TotalPrice}</span></p>
                    </div>
                    <div>
                        <p> Products</p>
                        <p> {products && products?.length} </p>
                    </div>
                    <div>
                        <p> Orders</p>
                        <p> {orders?.length} </p>
                    </div>
                    <div>
                        <p> Users</p>
                        <p> 4 </p>
                    </div>
                    <div className="graph-data">
                        <Line data={LineState} />
                    </div>
                </div>
                <div className='pie-chart'>
                    <Doughnut data={PieState} />
                </div>
            </div>
        </DashBoardStyles>
    )
}

export default Dashboard