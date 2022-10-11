import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import homeicon from '../../assets/imgs/home.svg'

const NavMainStyles = styled.div`
    width: 100vw;
    height: 4.5rem;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 5;

    .navMain{
        width: 1230px;
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
            li > a{
                font-size: 1.25rem;
                font-weight: 600;
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
                    color: #000000ec;
                }
            }
        }
    }
    @media (max-width: 1380px){
        .navMain{
            width: 980px;
        }
    }
`

function NavbarMain() {
    const navigate = useNavigate();
    let navClasses = []
    const [scrolled, setScrolled] = useState(false);
    const handleScroll = () => {
        window.scrollY >= 200 ? setScrolled(true) : setScrolled(false);

    }
    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    if (scrolled) {
        navClasses.push('scrolled')
    }
    return (
        <NavMainStyles style={scrolled ? { backgroundColor: '#FFF', position: 'fixed', top: 0, margin: '0 auto' } : {}}>
            <div className="navMain" style={scrolled ? { boxShadow: 'none', margin: '0 auto' } : {}} >
                <ul>
                    <li><Link to='/'><img src={homeicon} alt="" /></Link></li>
                    <li><Link to='/'>HOME</Link></li>
                    <li><Link to='/products'>PRODUCT</Link></li>
                    <li><Link to='/about'>ABOUT US</Link></li>
                    <li><Link to='/contact'>CONTACT US</Link></li>
                </ul>
            </div>
        </NavMainStyles >
    )
}

export default NavbarMain