import { Background, Window, Popup } from "./Modal";
import { Flex, Absolute, Subtitle } from "../shared";
import styled from "styled-components";

import cancel from '../../images/cancel.png';
import logo2 from '../../images/logo2.png';

const NoticeContent = styled.div`
    width: 260px;
    margin: 10px;
    padding: 17px;

    font-size: 13px;
    line-height: 105%;
`;

const NoticeModal = (props) => {
    return (
        <Background>
            <Window>
                <Popup height='490px'>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setNotice(false) }} src={cancel} alt='cancel'/></Absolute>
                    <Subtitle size='22px' top='40px'>공지사항</Subtitle>
                        <NoticeContent>
                            <p>정부의 코로나 3단계 제한정책에 따른 지침을 이용 시 꼭 지켜주셔야 합니다.</p><br/>
                            <p>- 백신 패스를 발급받지 않은 분은 이용하실 수 없습니다.</p><br/>
                            <p>- 마스크 착용이 필수이고, 코에 걸치거나 턱에 걸치는 행위는 적발 시 처벌을 받을 수 있습니다.</p><br/>
                            <p>- 코로나 의심 증세가 있을 시에는 이용하지 않아야 합니다. </p><br/>
                            <p>- 정부의 사회적 거리두기 기준인원(4인)을 초과할 경우 이용이 제한됩니다.</p><br/>
                            <p>지침을 어기고 스터디룸을 이용하다가 피해가 발생한 경우, websolute는 어떠한 해결책과 책임이 없으니 공지사항을 지켜 안전하게 스터디룸을 이용할 수 있도록 규칙 준수 바랍니다.</p>
                        </NoticeContent>
                    <Absolute bottom='20px'><img src={logo2} height="60" alt='logo2'/></Absolute>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default NoticeModal;