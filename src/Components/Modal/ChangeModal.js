import { Background, Window, Popup } from "./Modal";
import { Flex, Absolute, Subtitle, Input, Submitbutton } from "../shared";
import cancel from '../../images/cancel.png';

const ChangeModal = (props) => {
    return (
        <Background>
            <Window>
                <Popup height='340px'>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setChangeModal(false) }} src={cancel} alt='cancel'/></Absolute>
                    <Subtitle size='22px' top='40px'>비밀번호 변경</Subtitle>
                    <form>
                        <Flex>
                        <Input 
                            placeholder="현재 비밀번호" 
                            width='220px'
                            type="text"
                        />
                        <Input 
                            placeholder="새로운 비밀번호" 
                            width='220px'
                            type="text"
                        />
                        <Submitbutton type="submit" value={"변경"} height='45px' mt='25px'></Submitbutton>
                        </Flex>
                    </form>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default ChangeModal;