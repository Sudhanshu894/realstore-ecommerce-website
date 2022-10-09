import React from 'react'
import styled from 'styled-components'
import NavbarTop from './NavbarTop'
import search from '../../assets/imgs/search.svg'
import cart from '../../assets/imgs/bag.svg'
import menu from '../../assets/imgs/menu.svg'
import cross from '../../assets/imgs/x.svg'

const NavResponsiveStyles = styled.div`
    width: 100vw;
    height: 7rem;
    .rnavtop{
        width: 100%;
        height: 4rem;
        background-color: #FFF;

        .nav-1{
            border: 1px solid red;
            margin: 0 auto;
            width: 80%;
            height: 100%;
            display: grid;
            grid-template-columns: repeat(4,1fr);
            align-items: center;

            &>div{
                justify-self: center;
                display: grid;
                place-items: center;
                width: 100%;
                height: 100%;
                transition: 0.2s ease-in-out;

                /* &:hover{
                    background-color: #F2F2F2;
                } */
            }
            & > .rlogo{
               display: flex;
               justify-content: flex-start;
               align-items: center;
               background-color: #FFF;

            }

            .rlogo > div {
                width: 2.9rem;
                height: 3rem;
                display: grid;
                place-items: center;
                background-color: #31E3B8;
                color: white;
                font-size: 1.5rem;
                border-radius: 20px;
            }

            & > div >img{
                width: 2rem;
                height: 2rem;
            }
        }
    }
`

function Navresponsive({ isMobile, setOpen, open }) {
    return (
        <NavResponsiveStyles>
            <div className="rnavtop">
                <div className="nav-1">
                    <div className="rlogo">
                        <div>M</div>
                    </div>
                    <div onClick={() => setOpen({ cart: false, search: !open.search, menu: false })} className="rsearchbtn">
                        {open.search ? (<img src={cross} alt="" />) : (<img src={search} alt="" />)}

                    </div>
                    <div className="rcartbtn">
                        <img src={search} alt="" />
                    </div>
                    <div className="rmenubtn">
                        <img src={menu} alt="" />
                    </div>
                </div>
            </div>
            <NavbarTop isMobile={isMobile} />
        </NavResponsiveStyles>
    )
}

export default Navresponsive