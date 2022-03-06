import { Flex, Absolute, Input, Submitbutton } from "../shared";
import { Background, Window, Popup } from "./Modal";
import cancel from '../../images/cancel.png';
import {gql, useMutation} from "@apollo/client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Form } from 'react-bootstrap';

const CREATE_ROOM_MUTATION = gql`
    mutation createRoom($roomNumber:Int! $description:String! $major:Major! $open:String $closed:String){
        createRoom(roomNumber:$roomNumber description:$description major:$major open:$open closed:$closed){
            ok
            error
        }
    }
`;

const InputModal = (props) => {
    const {register,handleSubmit,formState,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });
    const [option, setOption] = useState("-1");
    const onCompleted = (data) => {
        const {createRoom:{ok,error}} = data;
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
    };
    const [createRoom,{loading}] = useMutation(CREATE_ROOM_MUTATION,{
        onCompleted
    });
    const onSubmitValid = (data) => {
        const {roomNumber, description, open, closed} = getValues();
        if(loading){
            return;
        }

        createRoom({
            variables:{
                roomNumber:Number(roomNumber),
                description,
                major:option,
                open,
                closed
            }
        });
        props.setModal(false);
    };
    const clearSignUpError = () => {
        clearErrors("result");
    };
    
    const onSelect = (event) => {
        return setOption(() => event.target.value);
    };
    return (
        <Background>
            <Window>
                <Popup>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setModal(false) }} src={cancel} alt='cancel'/></Absolute>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <Form.Group controlId="formGridState" class='mt-5'>
                        <Form.Select defaultValue="학과 선택" onChange={onSelect} ref={register({required:"학과를 선택해주세요"})} name="major">
                            <option value="-1">학과 선택</option>
                            <option value="Computer">컴퓨터공학부</option>
                            <option value="Information_Communication">정보통신공학부</option>
                        </Form.Select>
                        </Form.Group>
                        <Input 
                            mt='20px' width='260px'
                            ref={register({
                                required:"방 번호를 입력해주세요",
                            })}
                            onChange={()=>clearSignUpError()}
                            name="roomNumber"
                            type="text"  
                            placeholder="방 번호"
                        />
                        <Input 
                            mt='20px' width='260px'
                            ref={register()}
                            onChange={()=>clearSignUpError()}
                            name="description"
                            type="text"  
                            placeholder="설명"
                        />
                        <Input 
                            mt='20px' width='260px'
                            ref={register()}
                            onChange={()=>clearSignUpError()}
                            name="open"
                            type="text"  
                            placeholder="여는 시간"
                        />
                        <Input 
                            mt='20px' width='260px'
                            ref={register()}
                            onChange={()=>clearSignUpError()}
                            name="closed"
                            type="text"  
                            placeholder="닫는 시간"
                        />
                        <Submitbutton type="submit" value={ loading ? "Loading..." : props.buttonText} disabled={!formState.isValid|| loading}  ml='70px' height='45px' />
                    </form>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default InputModal;