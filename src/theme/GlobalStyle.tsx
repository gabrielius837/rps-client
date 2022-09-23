import { createGlobalStyle, keyframes } from 'styled-components';
import { normalize } from 'styled-normalize';

const positionAnimation = keyframes`
	0% {
		background-position: 0% 0%;
	}
	50% {
		background-position: 100% 100%;
	}
	100% {
		background-position: 0% 0%;
	}
`

const GlobalStyle = createGlobalStyle`
    ${normalize}

    *, *::before, *::after {
        margin: 0;
        padding: 0;
        font-family: 'Kanit', sans-serif;
        font-size: 16px;
        box-sizing: border-box;
        user-select: none;
    }

    html, #root {
        height: 100%;
    }

    body {
        height: 100vh;
    }

    #background {
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: linear-gradient(-45deg, #33539e, #7facd6, #bfb8da, #e8b7d4, #a5678e);
	    background-size: 400% 400%;
	    animation: ${positionAnimation} 60s infinite;
        z-index: -1;
    }

    #root {
        display: flex;
    }
`

export default GlobalStyle;