import React, { useState, useEffect } from 'react'
import { useAlert } from 'react-alert'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import search from '../../assets/search.svg'
import noimg from '../../assets/no_image.jpg';

const OpenSearchStyles = styled.div`
    width: 100%;
    height: fit-content;
    .sopen{
        width: 80%;
        height: fit-content;
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        align-items: center;
        margin: 1rem auto;

        h3{
            font-size: 1.45rem;
            text-align: center;
            font-weight: 600;
            color: #181818;
            cursor: pointer;
            padding: 1rem 0 1.5rem 0;
        }
        .sinput{
            width: 100%;
            position: relative;
            height: fit-content;

            input{
                width: 100%;
                height: 3.5rem;
                border: 1px solid #BEBEBE;
                padding: 0 3rem 0 1rem;
                font-size: 0.9rem;
                font-weight: 500;
                font-family: 'Poppins',sans-serif;
                transition: 0.2s ease-in-out;
                border-radius: 5px;

                &::placeholder{
                    font-family: 'Poppins', sans-serif;
                    font-size: 0.8rem;
                    color: #BEBEBE;
                    font-weight: 500;
                }

                &:focus{
                    outline: none;
                    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
                }
            }
            img{
                position: absolute;
                top: 1rem;
                right: 1rem;
            }
        }

        .spara{
            align-self: flex-start;
            p{
                font-family: 'Poppins',sans-serif;
                font-size: 0.9rem;
                color: gray;
                display: flex;
                gap: 0.2rem;

                span{
                    font-family: 'Poppins',sans-serif;
                    font-size: 0.9rem;
                    font-weight: 500;
                    color: black;
                }
            }
        }
        .sgallery{
            width: 100%;
            margin: 2rem 0;
            display: flex;
            flex-direction: column;
            gap: 2rem;

            p{
                font-family: 'Poppins',sans-serif;
                font-size: .8rem;
                font-weight: 600;
                opacity: 0.5;
            }
            .sgrid{
                width: 100%;
                display: grid;
                grid-template-columns: repeat(3,1fr);
                gap: 0.5rem;
                margin-bottom: 4rem;

                img{
                    width: 100%;
                    height: 100%;
                    border-radius: 8px;
                    transition: 0.2s ease-in-out;


                    &:hover{
                        transform: translateY(-4px);
                        box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
                    }
                }
            }
        }
    }
`

function SearchOpen({ HandleSideMenu }) {
    const alert = useAlert();

    const navigate = useNavigate();

    const [keyword, setKeyword] = useState("");
    const eventHandle = () => {
        if (keyword.length > 0) {
            if (keyword.trim()) {
                navigate(`/products/${keyword}`)
            } else {
                navigate('/products');
            }
        }
        HandleSideMenu();
    }
    const searchHandler = (e) => {
        if (e.key === 'Enter') {
            if (keyword.length > 1) {
                eventHandle();
                HandleSideMenu();
            } else {
                alert.error("No results found for the keyword Entered")
            }
        }
    }

    return (
        <OpenSearchStyles>
            <div className="sopen">
                <h3>
                    SEARCH
                </h3>
                <div className="sinput">
                    <input type="text" placeholder='Search our catalog' onChange={(e) => setKeyword(e.target.value)} onKeyUp={(e) => searchHandler(e)} />
                    <img src={search} alt="" onClick={eventHandle} />
                </div>
                <div className="spara">
                    <p>You can try some popular tags here:</p>
                    <p><span>dress,</span><span>black,</span><span>cotton</span></p>
                </div>

                <div className="sgallery">

                </div>
            </div>
        </OpenSearchStyles>
    )
}

export default SearchOpen