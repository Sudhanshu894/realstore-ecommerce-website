import React, { useState } from 'react'
import styled from 'styled-components'
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