import { Background, Window, Popup } from "./Modal";
import { Flex, Absolute, Subtitle, Submitbutton } from "../shared";
import cancel from '../../images/cancel.png';
import { gql, useMutation } from "@apollo/client";

const DELETE_RESERVATION_MUTATION = gql`
    mutation deleteReservation($id:Int!){
        deleteReservation(id:$id){
            ok
            error
        }
    }
`;

const MypageModal = (props) => {
    const [deleteReservation,{loading}] = useMutation(DELETE_RESERVATION_MUTATION);
    const onDeleteClick = () => {
        const id = Number(props.id);
        const deleteReservationUpdate = (cache,result) => {
            const {
                data:{
                    deleteReservation:{ok}
                } 
            } = result;
            if(ok){
                cache.evict({id:`Reservation:${id}`})
            }
        };
        deleteReservation({
            variables:{
                id
            },
            update:deleteReservationUpdate
        });
        props.setAction();
    }
    return (
        <Background>
            <Window>
                <Popup height='230px'>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setModal(false) }} src={cancel} alt='cancel'/></Absolute>
                    <Subtitle size='26px' top='55px'>정말로 {props.setText} <br/> 하시겠습니까?</Subtitle>
                    <Submitbutton onClick={()=> onDeleteClick() } type="submit" value= '확인' mt='20px' height='45px' />
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default MypageModal;