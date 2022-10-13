import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PreFooter from '../components/Footer/PreFooter'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'
import SearchOpen from '../components/Mobile/SearchOpen'
import CartOpen from '../components/Mobile/CartOpen'
import MenuOpen from '../components/Mobile/MenuOpen'
import Loader from '../utils/Loader'
import { useAlert } from 'react-alert'
import Login from '../components/User/Login'
import Signup from '../components/User/Signup'

const MainContainerStyles = styled.div`
    width: 100vw;
    height: fit-content;
    position: relative;
    z-index: 2;

`
function UserFormPage(props) {
    const [isLogin, setIsLogin] = useState(true)
    return (
        <MainContainerStyles style={{ perspective: '20px' }}>
            {isLogin ? (<Login setIsLogin={setIsLogin} />) : (<Signup setIsLogin={setIsLogin} />)}
        </MainContainerStyles>

    )
}

export default UserFormPage