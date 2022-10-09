import React, { useEffect, useState } from 'react'
import NavbarMain from '../Navbar/NavbarMain'
import NavbarMid from '../Navbar/NavbarMid'
import NavbarTop from '../Navbar/NavbarTop'
import Navresponsive from '../Navbar/Navresponsive';

function Header({ setOpen, open }) {

    const [isMobile, setIsMobile] = useState(window.matchMedia('(max-width: 990px)').matches);

    useEffect(() => {
        window.addEventListener('resize', () => {
            setIsMobile(window.matchMedia('(max-width: 990px)').matches);
        })
    }, []);
    return (
        <>
            {isMobile ? (<><Navresponsive setOpen={setOpen} open={open} isMobile={isMobile} /></>) : (<><NavbarTop />
                <NavbarMid />
                <NavbarMain /></>)}
        </>
    )
}

export default Header