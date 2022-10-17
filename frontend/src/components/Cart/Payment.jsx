import React, { useEffect, useRef, useState } from 'react'
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
} from "@stripe/react-stripe-js";
import { clearErrors, createOrder } from '../../redux/OrderRed/Actions';

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
    .paymentForm{
        height: fit-content;
        margin: 0 auto;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: 80%;
        padding: 2rem 0;
        /* border: none; */
        border-bottom: 0.5px solid #BEBEBE;
        align-items: flex-end;
        .paymentFormBtn{
            font-family: 'Poppins',sans-serif;
            height: 4rem;
            width: 60%;
            min-width: 200px;
            color: white;
            margin: 0 auto;
            background-color: #00C37A;
            border: none;
            border-radius: 5px;
            font-size: 1.3rem;
            font-weight: 500;

            &:disabled{
                background-color: #353535;
            }
        }
    }
    .paymentForm > div {
        width: 80%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 1rem;
    }

    .paymentInput {
        padding: 2rem;
        padding-right: 1rem;
        width: 60%;
        margin: 0 auto;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.267);
        border-radius: 4px;
        outline: none;
    }
    p{
        align-self: center;
        font-size: 1.1rem;
        font-family: 'Poppins',sans-serif;
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
    }
`

function Payment() {
    const [process, setProcess] = useState(false);
    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();
    const alert = useAlert();
    const navigate = useNavigate();
    const payBtn = useRef(null);

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.newOrder);

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };

    const order = {
        shippingInfo,
        orderItems: cartItems,
        itemsPrice: orderInfo.subtotal,
        taxPrice: orderInfo.tax,
        shippingPrice: orderInfo.shippingCharges,
        totalPrice: orderInfo.totalPrice,
    }
    const PaymentSubmit = async (e) => {
        e.preventDefault();
        payBtn.current.disabled = true;
        setProcess(true);

        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                }
            };
            const { data } = await axios.post('/api/payment/process', { amount: 2000 }, config);

            const client_secret = data?.client_secret;

            if (!stripe || !elements) {
                return;
            }
            const res = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
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
                if (res.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: res.paymentIntent.id,
                        status: res.paymentIntent.status
                    }
                    setProcess(false);
                    dispatch(createOrder(order));
                    alert.success("Payment Successfull");
                    navigate("/success");
                } else {
                    alert.error("Payment Failed due to Some Internal issue !");
                }
            }
        } catch (err) {
            console.log(err.message);
            payBtn.current.disabled = true;
            alert.error(`Payment failed due to ${err.message}`);
        }
    }

    useEffect(() => {
        if (error) {
            console.log(error);
            alert.error(error);
            dispatch(clearErrors());
        }
    }, [alert, dispatch, error]);
    return (
        <>
            <CheckoutStepper activeStep={2} />
            <PaymentStyles>
                <h3>MAKE PAYMENT</h3>
                <form className="paymentForm" onSubmit={(e) => PaymentSubmit(e)}>
                    <div>
                        <p>Account Number</p>
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <p>Expiry Date</p>
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <p>Account CVV</p>
                        <CardCvcElement className="paymentInput" />
                    </div>

                    <input
                        type="submit"
                        value={process ? "Processing..." : `Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </PaymentStyles>
        </>
    )
}

export default Payment