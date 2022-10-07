import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import homeicon from '../../assets/imgs/home.svg'

const NavMainStyles = styled.div`
    width: 100vw;
    height: 4.5rem;
    margin-bottom: 1rem;

    .navMain{
        width: 65%;
        height: 100%;
        margin: 2rem auto;
        background-color: #FFF;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

        ul{
            display: flex;
            align-items: center;
            height: 100%;

            li:nth-child(1){
                height: 4.5rem;
                width: 4.5rem;
            }
            li{
                font-size: 1.3rem;
                font-weight: 700;
                color: #000000;
                display: flex;
                justify-content: center;
                align-items: center;
                padding: 0 1.2rem;
                height: 4.5rem;
                transition: 0.2s ease-in-out;
                

                &:hover{
                    border-bottom: 2px solid #00C37A;
                    background-color: #d8d8d863;
                }
                img{
                    height: 1.5rem;
                    width: 1.5rem;
                    color: black;
                }
            }
        }
    }
    .scrolled{
        position: sticky;
        top: 0;
    }
`

function NavbarMain() {

    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        const offset = window.scrollY;
        if (offset > 200) {
            setScrolled(true);
        }
        else if (offset < 200) {
            setScrolled(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    })
    let navClasses = ['navMain']
    if (scrolled) {
        console.log(1);
        navClasses.push('scrolled')
    }
    return (
        <NavMainStyles style={scrolled ? { backgroundColor: '#FFF', position: 'sticky', top: 0, } : {}}>
            <div className="navMain" style={scrolled ? { boxShadow: 'none' } : {}} >
                <ul>
                    <li><img src={homeicon} alt="" /></li>
                    <li>CATEGORIES</li>
                    <li>CONTENT</li>
                    <li>ABOUT US</li>
                    <li>BLOG</li>
                    <li>CONTACT US</li>
                </ul>
            </div>
        </NavMainStyles >
    )
}

export default NavbarMain