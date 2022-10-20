import React from 'react'
import styled from 'styled-components'
import profile from '../assets/imgs/profile.png'
import insta from '../assets/imgs/instagram.svg'
import github from '../assets/imgs/github.svg'
import linkedin from '../assets/imgs/linkedin.svg'

const AboutPageStyles = styled.div`
    width: 1230px;
    height: fit-content;
    display: grid;
    margin: 2rem auto;
    gap: 2rem;
    grid-template-columns: 1fr 0.5fr;

    & > div{
        background-color: #FFF;
        border-radius: 10px;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }

    .about{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        padding: 2rem;

        img{
            width: 30%;
            height: auto;
            margin: 0 auto;
            border-radius: 30px;
        }
        .info{
            font-size: 1.2rem;
            font-weight: 400;
            padding: 1rem;
        }

    }
    .socialHandles{
        padding: 2rem;
        display: flex;
        flex-direction: column;
        gap: 2rem;
        align-items: center;
        justify-content: center;
        
        h3{
            font-size: 1.5rem;
        }
        .connect{
            display: flex;
            height: fit-content;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            img{
                width: 4rem;
                height: 4rem;
                border-radius: 50%;
            }
        }
    }

    @media (min-width: 991px) and (max-width: 1380px){
        width: 980px;
    }
    @media (min-width: 768px) and (max-width: 990px){
        width: 90%;
        grid-template-columns: 1fr 0.7;
    }
    @media (max-width: 767px){
        width: 90%;
        grid-template-columns: 1fr;
    }
`

function AboutPage() {
    return (
        <AboutPageStyles>
            <div className="about">
                <img src={profile} alt="sudhanshu" />
                <div className="info">
                    <p>{"This is Sudhanshu Sharma an full stack web Developer with Good hands on DSA and always eager to learn something new. apart from all this I am good with collaboration and interaction with people and open to work as a web developer"} <br /> <br /> {"I began my Journey in masai as a student in 2020 in that meantime i worked on more than"} <b>3 collaborative projects and 4 individual Projects</b> {"which includes"} <b>{"Social Sites"}</b> {"(Twitter Clone),"} <b>{"Ecommerce Sites"}</b> {"(RealStore, Beminimalist),"} <b>{"OTT Platform"}</b> {"(Youtube Clone) and other mini sites like (live Weather forcast, movie Finder). etc."} <br /> <br />{"My tech Skills includes "} <b>{"MERN Stack, redux, MUI, Firebase, REST Api and deployment."}</b></p>
                </div>
            </div>
            <div className="socialHandles">
                <h3>Connect With me on:</h3>
                <div className="connect">
                    <a href="https://linkedin.com/in/sudhanshu894" target="_blank"><img src={linkedin} alt="" /></a>
                    <a href="https://github.com/sudhanshu894" target="_blank"><img src={github} alt="" /></a>
                    <a href="https://www.instagram.com/_sudhanshu__s17/" target="_blank"><img src={insta} alt="" /></a>
                </div>
            </div>
        </AboutPageStyles>
    )
}

export default AboutPage