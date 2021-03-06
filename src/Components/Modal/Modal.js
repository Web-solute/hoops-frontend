import styled, { keyframes } from 'styled-components';

const slideUp = keyframes`
  from {
    transform: translateY(200px);
  }
  to {
    transform: translateY(0px);
  }
`;

export const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
`;

export const Window = styled.div`
    position: relative;
    width: 100%;
    height: 100%;

    animation-duration: 0.25s;
    animation-timing-function: ease-out;
    animation-name: ${slideUp};
    animation-fill-mode: forwards;
`;

export const Popup = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    background-color: #ffffff;
    border: 1px solid #C4C4C4;
    border-radius: 30px;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

    width: 300px;
    height: ${ props => props.height };
`;