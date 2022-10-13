import React, { useEffect, useState } from 'react'
import NavbarMain from '../Navbar/NavbarMain'
import NavbarMid from '../Navbar/NavbarMid'
import NavbarTop from '../Navbar/NavbarTop'
import Navresponsive from '../Navbar/Navresponsive';

function Header({ setOpen, open, isMobile, isAuth, user, HandleLogout }) {


    return (
        <>
            {isMobile ? (<><Navresponsive setOpen={setOpen} open={open} isMobile={isMobile} /></>) : (<><NavbarTop isAuth={isAuth} user={user} HandleLogout={HandleLogout} />
                <NavbarMid isAuth={isAuth} user={user} />
                <NavbarMain /></>)}
        </>
    )
}

export default Header