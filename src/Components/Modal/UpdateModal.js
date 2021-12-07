import { Flex, Absolute, Input, Submitbutton } from "../shared";
import { Background, Window, Popup } from "./Modal";
import cancel from '../../images/cancel.png';
import {gql, useQuery, useMutation} from "@apollo/client";

const UpdateModal = (props) => {
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

export default UpdateModal;