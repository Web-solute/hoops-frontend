import styled from "styled-components";
import { Flex, Absolute, Input, Submitbutton } from "../shared";
import cancel from '../../images/cancel.png';

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
height: 190px;
`;

const InputModal = (props) => {
    return (
        <Background>
            <Window>
                <Popup>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setModal(false) }} src={cancel} alt='cancel'/></Absolute>
                    <Input mt='45px' width='230px'></Input>
                    <Submitbutton type="submit" value={props.buttonText} mt='15px' height='45px' ></Submitbutton>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default InputModal;