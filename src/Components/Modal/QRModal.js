import styled from "styled-components";
import { Flex, Absolute } from "../shared";
import { Background, Window, Popup } from "./Modal";
import cancel from '../../images/cancel.png';
import logo2 from '../../images/logo2.png';
import QRCode from 'react-qr-code';

const QRcontainer = styled.div`
    margin-top: 70px;
`;

const QRmodal = (props) => {
    const {data} = props;
    return (
        <Background>
            <Window>
                <Popup height='500px'>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setQr(false) }} src={cancel} alt='cancel'/></Absolute>
                    <QRcontainer>
                        <QRCode value={data} />
                    </QRcontainer>
                    <Absolute bottom='20px'><img src={logo2} height="60" alt='logo2'/></Absolute>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default QRmodal;