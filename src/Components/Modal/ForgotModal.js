import { Background, Window, Popup } from "./Modal";
import { Flex, Absolute, Subtitle, Input, Submitbutton } from "../shared";
import cancel from '../../images/cancel.png';

const ForgotModal = (props) => {
    return (
        <Background>
            <Window>
                <Popup height='280px'>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setForgot(false) }} src={cancel} alt='cancel'/></Absolute>
                    <Subtitle size='22px' top='40px'>비밀번호 찾기</Subtitle>
                    <form>
                        <Flex>
                        <Input placeholder="학번을 입력해주세요" width='220px'></Input>
                        <Subtitle size='12px' top='15px'>※ 이메일로 새로운 비밀번호가 발송됩니다!</Subtitle>
                        <Submitbutton type="submit" value={"확인"} height='45px' mt='25px'></Submitbutton>
                        </Flex>
                    </form>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default ForgotModal;