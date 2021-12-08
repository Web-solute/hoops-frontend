import { Flex, Absolute, Input, Submitbutton } from "../shared";
import { Background, Window, Popup } from "./Modal";
import cancel from '../../images/cancel.png';
import { Form } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useState } from "react";
import {gql, useQuery, useMutation} from "@apollo/client";

const SEE_ROOM_QUERY = gql`
    query seeRoom($id:Int!){
        seeRoom(id:$id){
            id
            roomNumber
            description
            major
            open
            closed
        }
    }
`;
const UPDATE_ROOM_MUTATION = gql`
    mutation updateRoom($id:Int! $roomNumber:Int $description:String $major:Major $open:String $closed:String){
        updateRoom(id:$id roomNumber:$roomNumber description:$description major:$major open:$open closed:$closed){
            ok
            error
        }
    }
`;

const UpdateModal = (props) => {
    const roomId = props.value;
    const [RoomNumber,setRoomNumber] = useState();
    const [Description,setDescription] = useState("");
    const [Major,setMajor] = useState("");
    const [Open,setOpen] = useState("");
    const [Closed,setClosed] = useState(""); 
    const [option, setOption] = useState("-1");
    const onSelect = (event) => {
        return setOption(() => event.target.value);
    };
    const {register, handleSubmit, errors, formState,getValues,setError,clearErrors} = useForm({
        mode: "onChange",
    });

    const UpdateCompleted = (data) =>{
        const {updateRoom:{ok,error}} = data;
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
    }
    const [updateRoom,{loading}] = useMutation(UPDATE_ROOM_MUTATION,{
        onCompleted:UpdateCompleted
    });
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const {major,roomNumber,description,open,closed} = data;
        console.log(data);
        updateRoom({
            variables:{
                id:roomId,
                ...(major  && {major}),
                ...(roomNumber && {roomNumber:Number(roomNumber)}),
                ...(description && {description}),
                ...(open && {open}),
                ...(closed && {closed})
            }
        });
        props.setModal(false);
    }

    const RoomComplted = (data) => {
        const {seeRoom:{roomNumber,description,major,open,closed}} = data;
        setRoomNumber(roomNumber);
        setDescription(description);
        setMajor(major);
        setOpen(open);
        setClosed(closed);
    };
    const {data} = useQuery(SEE_ROOM_QUERY,{
        variables:{
            id:roomId
        },
        onCompleted:RoomComplted
    });

    const clearSignUpError = () => {
        clearErrors("result");
    };
    return (
        <Background>
            <Window>
                <Popup>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setModal(false) }} src={cancel} alt='cancel'/></Absolute>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <Form.Group controlId="formGridState" class='mt-5'>
                            <Form.Select defaultValue="학과 선택" onChange={onSelect} ref={register()} name="major">
                                <option value="-1">학과 선택</option>
                                <option value="Computer">컴퓨터공학부</option>
                                <option value="Information_Communication">정보통신공학부</option>
                            </Form.Select>
                        </Form.Group>
                        <Input 
                            mt='20px' width='260px'
                            ref={register()}
                            onChange={()=>clearSignUpError()}
                            name="roomNumber"
                            type="text"  
                            placeholder={RoomNumber}
                        />
                        <Input 
                            mt='20px' width='260px'
                            ref={register()}
                            onChange={()=>clearSignUpError()}
                            name="description"
                            type="text"  
                            placeholder={Description}
                        />
                        <Input 
                            mt='20px' width='260px'
                            ref={register()}
                            onChange={()=>clearSignUpError()}
                            name="open"
                            type="text"  
                            placeholder={Open}
                        />
                        <Input 
                            mt='20px' width='260px'
                            ref={register()}
                            onChange={()=>clearSignUpError()}
                            name="closed"
                            type="text"  
                            placeholder={Closed}
                        />
                        <Submitbutton type="submit" value={ loading ? "Loading..." : props.buttonText} disabled={!formState.isValid|| loading}  ml='70px' mt='20px' height='45px'/>
                    </form>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default UpdateModal;