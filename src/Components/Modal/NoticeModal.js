import { Background, Window, Popup } from "./Modal";
import { Flex, Absolute, Subtitle } from "../shared";

import cancel from '../../images/cancel.png';
import logo2 from '../../images/logo2.png';

const NoticeModal = (props) => {
    return (
        <Background>
            <Window>
                <Popup height='500px'>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setNotice(false) }} src={cancel} alt='cancel'/></Absolute>
                    <Subtitle size='22px' top='40px'>공지사항</Subtitle>

                    <Absolute bottom='20px'><img src={logo2} height="60" alt='logo2'/></Absolute>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default NoticeModal;