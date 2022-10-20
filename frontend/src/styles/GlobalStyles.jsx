import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`

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