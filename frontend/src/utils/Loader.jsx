import React from 'react'
import styled from 'styled-components'

const LoaderStyles = styled.div`
    width: 100vw;
    height: 50vh;
    background-color: #FFF;
    display: grid;
    place-items: center;

    .loader{
        width: 300px;
        height: 300px;
        border: 3px solid #181818;
        border-top: none;
        border-left: none;
        border-radius: 50%;
        animation: load 0.6s linear infinite;
    }

    @keyframes load{
        to{
            transform: rotate(-360deg);
        }
    }
`
function Loader() {
    return (
        <LoaderStyles>
            <div className="loader">

            </div>
        </LoaderStyles>
    )
}

export default Loader