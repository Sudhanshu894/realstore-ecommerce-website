import React from 'react'
import styled from 'styled-components'
import facebook from '../../assets/facebook.svg'
import twitter from '../../assets/twitter.svg'
import pinterest from '../../assets/pinterest.svg'
import youtube from '../../assets/youtube.svg'
import instagram from '../../assets/instagram.svg'
import arrow from '../../assets/icons8-up-arrow-96.png'

const FooterStyles = styled.div`
    width: 100vw;
    height: 50vh;
    background-color: #FAFAFA;
    display: grid;
    place-items: center;

    .footer{
        width: 1230px;
        height: 70%;
        margin: 0 auto;
        display: grid;
        gap: 2rem;
        grid-template-rows: 4fr 1fr;

        .upper_footer{
            display: grid;
            grid-template-columns: 1.5fr 2fr 1fr;

            .company{
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                .foot_logo{
                    width: 55px;
                    height: 60px;
                    border: none;
                    border-radius: 25px;
                    display: grid;
                    place-items: center;
                    font-size: 2.2rem;
                    box-sizing: border-box;
                    background-color: #00C37A;

                    p{
                        color: #FFF;
                        font-weight: 800;
                    }
                }
                

                .location{
                    display: flex;
                    flex-direction: column;

                    p{
                        font-family: 'Poppins', sans-serif;
                        font-size: 1rem;
                        font-weight: 600;
                        color: #9D9D9D;

                        span{
                            font-family: 'Poppins', sans-serif;
                        font-size: 1rem;
                        font-weight: 600;
                            color: #555555;
                        }
                    }
                }

            }
            .info{
                display: grid;
                grid-template-columns: repeat(2,1fr);  
            }
            .footBx{
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;

                    h3{
                        font-size: 1.6rem;
                        width: fit-content;
                        color: #CCCCCC;
                        font-weight: 700;
                        transition: 0.2s ease-in-out;
                        cursor: pointer;


                        &:hover{
                            color: #555555;
                            border-bottom: 2px solid #555555;
                        }
                        /* font-family: 'Cuprum','sans-serif'; */
                    }
                    div {
                        display: flex;
                        flex-direction: column;
                        gap: 0.6rem;

                        a{
                            color: #181818;
                            font-weight: 500;
                            font-size: 0.9rem;
                            font-family: 'Poppins','sans-serif';
                        }
                    }
                }
        }

        .lower_footer{
            display: grid;
            align-items: center;
            grid-template-columns: 25% 50%;
            justify-content: space-between;
            /* height: 100%; */

            & > div {
                height: 100%;
            }
            .newsletter{
                display: grid;
                align-items: center;
                grid-template-columns: 1fr 2.5fr;

                p{
                    font-size: 1rem;
                    font-weight: 500;
                    color: #555555;
                    font-family: 'Poppins', sans-serif;
                    line-height: 18px;
                }
                .input{
                    position: relative;
                    height: 100%;
                    
                    input{
                        width: 95%;
                        height: 100%;
                        padding: 0 4rem 0 1.5rem;
                        border-radius: 3px;
                        font-size: 0.9rem;
                        border: none;
                        font-family: 'Poppins', sans-serif;
                        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
                        font-weight: 500;
                        transition: 0.2s ease-in-out;

                        &::placeholder{
                            color: #BEBEBE;
                        }

                        &:hover{
                            box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
                        }

                        &:focus{
                            border: none;
                            outline: none;
                        }
                    }

                    img{
                        position: absolute;
                        top: 1rem;
                        right: 3rem;
                        width: 30px;
                        height: auto;
                        transform: rotate(90deg);
                    }
                }

            }

            .social_icons{
                display: flex;
                gap: 0.5rem;
                justify-content: flex-start;
                align-items: center;

                .social_img{
                    border-radius: 50px; 
                    width: 40px;
                    height: 40px;
                    transform: translateY(0);
                    transition: 0.2s ease-in-out;

                    &:hover{
                        transform: translateY(-5px);
                        
                    }
                    img{
                    height: 100%;
                    width: 100%;
                    border-radius: 50px; 
                    transition: 0.2s ease-in-out;
                     
                        &:hover{
                            box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
                        }
                    }
                }
                
            }
        }
    }

    @media (min-width: 781px) and (max-width: 1300px) {
        .footer{
            width: 80%;

            .lower_footer{
                grid-template-columns: 30% 65%;
               
                .social_icons{
                    gap: 1rem;
                }
            }
        }
    }
    @media (min-width: 601px) and (max-width: 780px){
        height: fit-content;
        .footer{
            width: 90%;


            .lower_footer{
                grid-template-columns: 1fr;
                grid-template-rows: 3rem 3rem;
                gap: 1rem;

                .social_icons{
                    justify-self: center;
                    width: fit-content;
                }

                input{
                    height: 4rem;
                }
            }
        }
    }
    @media (max-width: 600px){
        height: fit-content;
        margin: 2rem 0;
        .footer{
            height: 80%;
            width: 90%;
            .upper_footer{
                grid-template-columns: 1fr;
                gap: 2rem;

                .company{
                    gap: 2rem;
                }

                .info{
                    grid-template-columns: 1fr;
                    gap: 2rem;
                }
            }
            .lower_footer{
                grid-template-columns: 100%;
                gap: 1rem;

                .social_icons{
                    justify-self: center;
                    width: fit-content;
                }
                .newsletter{
                    grid-template-columns: 1fr;
                    grid-template-rows: 4rem;

                    p{
                        display: none;
                    }

                }
                
                

                
            }

        }
    }

    
`

function Footer() {
    return (
        <FooterStyles>
            <div className="footer">
                <div className="upper_footer">
                    <div className='company'>
                        <div className="foot_logo">
                            <p>R</p>
                        </div>
                        <div className="location">
                            <p>RealStore</p>
                            <p>Great Stdm. 999,Third floor, Sun City</p>
                            <p>India</p>
                            <p>Call us: <span> +91 4320 423 214</span></p>
                            <p>Email us: <span> mail@realstore.com</span></p>

                        </div>
                    </div>
                    <div className='info'>
                        <div className='footBx'>
                            <h3>PRODUCTS</h3>
                            <div>
                                <a href="#">Price drop</a>
                                <a href="#">New products</a>
                                <a href="#">Best sales</a>
                            </div>
                        </div>
                        <div className='footBx'>
                            <h3>OUR COMPANY</h3>
                            <div>
                                <a href="#">About us</a>
                                <a href="#">Contact us</a>
                                <a href="#">Sitemap</a>
                                <a href="#">Stores</a>
                            </div>
                        </div>
                    </div>
                    <div className='account footBx'>
                        <h3>YOUR ACCOUNT</h3>
                        <div>
                            <a href="#">Personal info</a>
                            <a href="#">Orders</a>
                            <a href="#">Credit Slips</a>
                            <a href="#">Addressess</a>
                            <a href="#">Vochers</a>
                            <a href="#">My alerts</a>
                        </div>
                    </div>
                </div>
                <div className="lower_footer">
                    <div className='social_icons'>
                        <div className="social_img">
                            <img src={facebook} alt="facebook" />
                        </div>
                        <div className="social_img">
                            <img src={twitter} alt="twitter" />
                        </div>
                        <div className="social_img">
                            <img src={youtube} alt="youtube" />
                        </div>
                        <div className="social_img">
                            <img src={pinterest} alt="pinterest" />
                        </div>
                        <div className="social_img">
                            <img src={instagram} alt="Instagram" />
                        </div>
                    </div>
                    <div className='newsletter'>
                        <p>Get our latest news and special sales.</p>
                        <div className="input">
                            <input type="text" placeholder='Enter your Email' />
                            <img src={arrow} alt="" />
                        </div>
                    </div>
                </div>
            </div>
        </FooterStyles>
    )
}

export default Footer