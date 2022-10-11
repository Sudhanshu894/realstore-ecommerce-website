import React from 'react'
import styled from 'styled-components'
import NavbarTop from './NavbarTop'
import search from '../../assets/imgs/search.svg'
import carticon from '../../assets/imgs/bag.svg';
import menu from '../../assets/imgs/menu.svg'
import cross from '../../assets/imgs/x.svg'

const NavResponsiveStyles = styled.div`
    width: 100vw;
    height: 7rem;
    .rnavtop{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 4rem;
        background-color: #FFF;
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
        z-index: 101;

        .nav-1{
            margin: 0 auto;
            width: 100%;
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

            .rmenubtn{
                transform: rotate(180deg);
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
                    {open.search ? (<div onClick={() => setOpen({ cart: false, search: false, menu: false })} style={{ backgroundColor: '#F2F2F2', transform: 'rotate(180deg)' }} className="rsearchbtn">
                        <img src={cross} alt="" />
                    </div>) : (<div onClick={() => setOpen({ cart: false, search: true, menu: false })} className="rsearchbtn">
                        <img src={search} alt="" />
                    </div>)}

                    {open.cart ? (<div onClick={() => setOpen({ cart: false, search: false, menu: false })} style={{ backgroundColor: '#F2F2F2', transform: 'rotate(180deg)' }} className="rsearchbtn">
                        <img src={cross} alt="" />
                    </div>) : (<div onClick={() => setOpen({ cart: true, search: false, menu: false })} className="rcarthbtn">
                        <img src={carticon} alt="" />
                    </div>)}

                    {open.menu ? (<div onClick={() => setOpen({ cart: false, search: false, menu: false })} style={{ backgroundColor: '#F2F2F2' }} className="rsearchbtn">
                        <img src={cross} alt="" />
                    </div>) : (<div onClick={() => setOpen({ cart: false, search: false, menu: true })} className="rmenubtn">
                        <img src={menu} alt="" />
                    </div>)}
                </div>
            </div>
            <NavbarTop isMobile={isMobile} />
        </NavResponsiveStyles>
    )
}

export default Navresponsive