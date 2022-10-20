import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Cuprum:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Oswald:wght@200;300;400;500;600;700&display=swap');

    *,*::before,*::after{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: 'Cuprum', sans-serif;
    }

    body{
        background-color: #F2F2F2;
        overflow: auto;

        &::-webkit-scrollbar{
            width: 5px;
        }
    }

    ul {
        list-style: none;
    }

    a {
        text-decoration: none;
    }
`


export default GlobalStyles;