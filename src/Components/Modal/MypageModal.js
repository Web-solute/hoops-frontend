import { Background, Window, Popup } from "./Modal";
import { Flex, Absolute, Subtitle, Submitbutton } from "../shared";

import cancel from '../../images/cancel.png';

const MypageModal = (props) => {

    return (
        <Background>
            <Window>
                <Popup height='230px'>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setModal(false) }} src={cancel} alt='cancel'/></Absolute>
                    <Subtitle size='26px' top='55px'>정말로 {props.setText} <br/> 하시겠습니까?</Subtitle>
                    <Submitbutton onClick={()=> props.setAction() } type="submit" value= '확인' mt='20px' height='45px' />
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default MypageModal;