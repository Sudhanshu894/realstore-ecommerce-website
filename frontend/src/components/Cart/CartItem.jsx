import React from 'react'
import styled from 'styled-components'
import arrow from '../../assets/arrow.svg';
import DeleteIcon from '@material-ui/icons/Delete';
import { useDispatch } from 'react-redux';
import { Addtocart } from '../../redux/CartRed/Actions';

const CartItemStyles = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .display-item{
        display: flex;
        align-items: center;
        gap: 1.5rem;
        img{
            width: 5rem;
            height: 5rem;
            object-fit: cover;
            border-radius: 50%;
        }
        div{
            display: flex;
            flex-direction: column;
            p{
                font-size: 1.3rem;
                font-weight: 500;
            }
            span{
                font-size: 0.8rem;
                font-weight: 400;
                color: gray;
            }
        }
    }
    .item-content{
        display: flex;
        gap: 2rem;
        align-items: center;
        justify-content: center;


        .price,.total{
            justify-content: center;
            p{
                font-size: 1.2rem;
                font-weight: 500;
            }
        }
        .quantity{
            height: 3rem;
            display: flex;
            gap: 0.5rem;
            p{
                width: 3rem;
                height: 3rem;
                display: grid;
                place-items: center;
                border: .5px solid #BEBEBE;
                border-radius: 5px;
                font-size: 1.1rem;
                font-family: 'Poppins',sans-serif;
                font-weight: 500;
            }

            .change-quantity{
                display: grid;
                grid-template-rows: repeat(2,1fr);

                img{
                    width: 1rem;
                    height: 1.5rem;
                    border: 0.3px solid #BEBEBE;
                }

            }
            
        }
        svg{
            height: 1.8rem;
            width: auto;
            opacity: 0.7;
            transition: all 0.2s ease-in-out;
            cursor: pointer;

            &:hover{
                opacity: 1;
            }
        }
    }

    @media (min-width: 768px) and (max-width: 990px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 1rem;
        .display-item{
            img{
                width: 4rem;
                height: 4rem;
            }
            div{
                p{
                    font-size: 1.1rem;
                    font-weight: 500;
                }
                span{
                    font-size: 0.7rem;
                    font-weight: 400;
                    color: gray;
                }
            }
        }
        .item-content{
            align-self: center;

            .price,.total{
                p{
                    font-size: 1.1rem;
                    font-weight: 500;
                }
            }
            .quantity{
                height: 2.5rem;
                display: flex;
                gap: 0.3rem;
                p{
                    width: 2.5rem;
                    height: 2.5rem;
                    display: grid;
                    place-items: center;
                    border: .5px solid #BEBEBE;
                    border-radius: 5px;
                    font-size: 1rem;
                    font-family: 'Poppins',sans-serif;
                    font-weight: 500;
                }

                .change-quantity{
                    display: grid;
                    grid-template-rows: repeat(2,1fr);

                    img{
                        width: 1rem;
                        height: 1.25rem;
                        border: 0.3px solid #BEBEBE;
                    }

                }
                
            }
            svg{
                height: 1.8rem;
                width: auto;
                opacity: 0.7;
                transition: all 0.2s ease-in-out;
                cursor: pointer;

                &:hover{
                    opacity: 1;
                }
            }
        }
    }
    @media (max-width: 767px){

        gap: 1rem;
        .display-item{
            img{
                width: 4rem;
                height: 4rem;
            }
            div{
                p{
                    font-size: 1.1rem;
                    font-weight: 500;
                }
                span{
                    font-size: 0.7rem;
                    font-weight: 400;
                    color: gray;
                }
            }
        }
        .item-content{
            align-self: center;

            .price,.total{
                p{
                    font-size: 1.1rem;
                    font-weight: 500;
                }
            }
            .quantity{
                height: 2.5rem;
                display: flex;
                gap: 0.3rem;
                p{
                    width: 2.5rem;
                    height: 2.5rem;
                    display: grid;
                    place-items: center;
                    border: .5px solid #BEBEBE;
                    border-radius: 5px;
                    font-size: 1rem;
                    font-family: 'Poppins',sans-serif;
                    font-weight: 500;
                }

                .change-quantity{
                    display: grid;
                    grid-template-rows: repeat(2,1fr);

                    img{
                        width: 1rem;
                        height: 1.25rem;
                        border: 0.3px solid #BEBEBE;
                    }

                }
                
            }
            svg{
                height: 1.8rem;
                width: auto;
                opacity: 0.7;
                transition: all 0.2s ease-in-out;
                cursor: pointer;

                &:hover{
                    opacity: 1;
                }
            }
        }
    }
    @media (max-width: 599px){
        flex-direction: column;
        align-items: flex-start;
    }
`

function CartItem({ item, setTotal, length, DeleteCart }) {

    const dispatch = useDispatch();

    const HandleIncQuan = (id, quantity, stock, price) => {
        const newQuantity = quantity + 1;
        if (stock <= quantity) {
            return;
        }
        setTotal((prev) => prev + price);
        length((prev) => prev + 1);
        dispatch(Addtocart(id, newQuantity));
    }
    const HandleDecQuan = (id, quantity, stock, price) => {
        const newQuantity = quantity - 1;
        if (1 >= quantity) {
            return;
        }
        setTotal((prev) => prev - price);
        length((prev) => prev - 1);
        dispatch(Addtocart(id, newQuantity));
    }

    return (
        <CartItemStyles>
            <div className="display-item">
                <img src="http://roythemes.com/demo/modez/_ori/24-home_default/faded-short-sleeves-tshirt.jpg" alt="" />
                <div>
                    <p>{item.name}</p>
                    <span>Clothings</span>
                </div>
            </div>
            <div className="item-content">
                <div className="price">
                    <p>₹{item.price}</p>
                </div>
                <div className="quantity">
                    <p>{item.quantity}</p>
                    <div className='change-quantity'>
                        <img onClick={() => { HandleIncQuan(item.product, item.quantity, item.stock, item.price) }} style={{ transform: 'rotate(180deg)' }} src={arrow} alt="up" />
                        <img onClick={() => { HandleDecQuan(item.product, item.quantity, item.stock, item.price) }} src={arrow} alt="down" />
                    </div>
                </div>
                <div className="total">
                    <p>₹{item.price * item.quantity}</p>
                </div>
                <DeleteIcon onClick={() => {
                    DeleteCart(item);
                }} />
            </div>
        </CartItemStyles>
    )
}

export default CartItem