import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import CheckoutStepper from './CheckoutStepper';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import axios from 'axios'
import {
    CardNumberElement,
    CardCvcElement,
    CardExpiryElement,
    useStripe,
    useElements,
    PaymentElement
} from "@stripe/react-stripe-js";

const PaymentStyles = styled.div`
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
    .paymentform{
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
            width: 80%;
            gap: 1rem;
            align-items: flex-start;
            width: fit-content;

            & > div{
                width: 365px;
                height: 4rem;
                border: 0.5px solid #BEBEBE;
                border-radius: 5px;
                display: flex;
                align-items: center;
                padding-left: 1rem;
                font-size: 1.3rem;
                align-self: flex-end;
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
        .pay{
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
        .paymentform{

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
            .pay{
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
`

function Payment() {
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const alert = useAlert();
    const navigate = useNavigate();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    // const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };
    const PaymentSubmit = async () => {
        payBtn.current.disabled = true;
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            };

            const { data } = await axios.post('/api/payment/process', paymentData, config);

            const client_secret = data.client_secret;


            if (!stripe || !elements) {
                return;
            }
            let address = `${shippingInfo.city},${shippingInfo.state} - ${shippingInfo.pinCode}, ${shippingInfo.country}`
            const res = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            country: shippingInfo.country,
                            postal_code: shippingInfo.pinCode,
                        }
                    }
                }
            });

            if (res.error) {
                payBtn.current.disabled = false;
                alert.error(res.error.error);
            } else {
                if (res.paymentIntents.status === "succeeded") {
                    navigate('/success');
                } else {
                    alert.error("Payment Failed due to Some Internal issue !");
                }
            }
        } catch (err) {
            payBtn.current.disabled = true;
            alert.error(err.response.data.error);
        }
    }
    return (
        <>
            <CheckoutStepper activeStep={2} />
            <PaymentStyles>
                <h3>MAKE PAYMENT</h3>
                <div className="paymentform">

                    <div>
                        <p>Account Number</p>
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <p>Expiry Date</p>
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <p>CVV</p>
                        <CardCvcElement className="paymentInput" />
                    </div>
                    <div className="pay" ref={payBtn}>
                        <button onClick={() => {
                            PaymentSubmit();
                        }}>{`Pay ₹${orderInfo.totalPrice}`}</button>
                    </div>
                </div>
            </PaymentStyles>
        </>
    )
}

export default Payment