import styled from "styled-components";
import { Flex, Absolute } from "./shared";
import cancel from '../images/cancel.png';
import temporary_QR from '../images/temporary_QR.png';
import logo2 from '../images/logo2.png';

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.3);
    z-index: 1000;
`;

const Window = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Popup = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    border: 1px solid #C4C4C4;
    border-radius: 30px;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.3);

    width: 300px;
    height: 500px;
`;

const QRcontainer = styled.div`
    margin-top: 70px;
`;

const QRmodal = (props) => {
    return (
        <Background>
            <Window>
                <Popup>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setQr(false) }} src={cancel} alt='cancel'/></Absolute>
                    <QRcontainer>
                        <img src={temporary_QR} alt='temporary_QR'/>
                    </QRcontainer>
                    <Absolute bottom='20px'><img src={logo2} height="60" alt='logo2'/></Absolute>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default QRmodal;