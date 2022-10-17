import React, { useState } from 'react'
import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'
import Billing from '../components/Cart/Billing';
import { Country, State } from 'country-state-city';
import CheckoutStepper from '../components/Cart/CheckoutStepper';
import { saveShippingInfo } from '../redux/CartRed/Actions';


const CheckoutStyles = styled.div`
    width: 1230px;
    margin: 2rem auto;
    margin-top: 1rem;
    display: grid;
    grid-template-columns: 1fr 0.5fr;
    gap: 1rem;

    & > div{
        background-color: #FFF;
        padding: 2rem 3rem;

        h2{
            font-size: 1.6rem;
            font-weight: bold;
            border-bottom: 0.5px solid #BEBEBE;
            padding-bottom: 1rem;
            margin: 1rem 0 2rem 0;
            cursor: pointer;

            &:hover{
                color: #00C37A;
            }
        }
        .shippingform{
            width: 90%;
            margin: 0 auto;
            display: flex;
            flex-direction: column;
            gap: 1rem;

            & > div{
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                p{
                    font-size: 1.1rem;
                    font-weight: 400;
                    font-family: 'Poppins',sans-serif;
                }
                input, select{
                    height: 4rem;
                    padding-left: 1rem;
                    border: 0.5px solid #BEBEBE;
                    outline: none;
                    border-radius: 5px;
                    width: 80%;
                    font-size: 1rem;
                    font-family: 'Poppins',sans-serif;

                    &::placeholder{
                        font-size: 1rem;
                        color: gray;
                        font-weight: 400;
                    }
                }
            }
            .readonly{
                input{
                    font-weight: 500;
                    cursor: not-allowed;
                }
            }
            button{
                width: 70%;
                max-width: 300px;
                height: 3.5rem;
                align-self: center;
                color: #FFF;
                background-color: #00C37A;
                text-align: center;
                font-size: 1.2rem;
                font-weight: 600;
                border: none;
                border-radius: 5px;
                margin-top: 3rem;

                &:disabled{
                    opacity: 0.7;
                }
            }
        }

    }

    @media (min-width: 991px) and (max-width: 1380px){
        width: 980px;
        & > div{
            padding: 1.5rem 2.5rem;
            background-color: #FFF;

            h2{
                font-size: 1.5rem;
            }
        }
    }
    @media (min-width: 768px) and (max-width: 990px) {
        width: 90%;
        grid-template-columns: 1fr 0.8fr;  
    }
    @media (max-width: 767px){
        width: 90%;
        grid-template-columns: 1fr;
    }

`

function CheckoutPage() {

    const alert = useAlert();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { cartItems, shippingInfo } = useSelector(state => state.cart);
    const { user } = useSelector(state => state.user);
    const [total, setTotal] = useState(cartItems.reduce((acc, curr) => {
        return acc + curr.price;
    }, 0) || 0);
    const [length, setLength] = useState(cartItems.reduce((acc, curr) => {
        return acc + curr.quantity;
    }, 0) || 0);


    const [city, setCity] = useState(shippingInfo.city);
    const [state, setState] = useState(shippingInfo.state);
    const [country, setCountry] = useState(shippingInfo.country);
    const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
    const [mobileNo, setMobileNo] = useState(shippingInfo.PhoneNo);


    const SubmitShippingForm = () => {
        if (mobileNo.length < 10 || mobileNo.length > 10) {
            alert.error("Phone Number should be of 10 digits");
            return;
        }
        dispatch(saveShippingInfo({ city, state, country, pinCode, PhoneNo: Number(mobileNo), address: `${city}, ${state} - ${pinCode}, ${country}` }));

        navigate('/order/confirm');
    }

    return (
        <>
            <CheckoutStepper activeStep={0} />
            <CheckoutStyles>
                <div className="checkout">
                    <h2>SHIPPING INFORMATION</h2>
                    <div className="shippingform">
                        <div className='readonly'>
                            <p>Name</p>
                            <input type="text" value={user.name} readOnly />
                        </div>
                        <div className='readonly'>
                            <p>Email</p>
                            <input type="text" value={user.email} readOnly />
                        </div>
                        <div>
                            <p>City</p>
                            <input type="text" placeholder='Enter your city' value={city} onChange={(e) => setCity(e.target.value)} />
                        </div>
                        <div>
                            <p>Country</p>
                            <select value={country} required onChange={(e) => setCountry(e.target.value)}>
                                <option value="">Select Country</option>
                                {Country && Country.getAllCountries().map((item) => {
                                    return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                })}
                            </select>

                        </div>

                        {country && <div>
                            <p>State</p>
                            <select value={state} required onChange={(e) => setState(e.target.value)}>
                                <option value="">Select State</option>
                                {State && State.getStatesOfCountry(country).map((item) => {
                                    return <option key={item.isoCode} value={item.isoCode}>{item.name}</option>
                                })}
                            </select>
                        </div>}
                        <div>
                            <p>PinCode</p>
                            <input type="number" required value={pinCode} placeholder="Enter PinCode" onChange={(e) => setPinCode(e.target.value)} />
                        </div>
                        <div>
                            <p>Phone No.</p>
                            <input type="number" required value={mobileNo} placeholder="Enter Phone no." onChange={(e) => setMobileNo(e.target.value)} />
                        </div>
                        <button disabled={!state ? true : false} onClick={SubmitShippingForm}>
                            Continue
                        </button>
                    </div>
                </div>
                <Billing length={length} total={total} txt={"BACK TO CART"} link={'/cart'} />

            </CheckoutStyles>
        </>
    )
}

export default CheckoutPage