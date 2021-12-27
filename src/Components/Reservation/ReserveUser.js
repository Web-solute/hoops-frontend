import { Subtitle, Item, Submitbutton, Container } from '../shared';
import { InputGroup, FormControl } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { gql, useMutation } from '@apollo/client';
import { useForm } from 'react-hook-form';

const ADD_MEMBER_MUTATION = gql`
    mutation addMember($reservationId:Int! $group: [String]){
        addMember(reservationId:$reservationId group:$group){
            ok
            error
        }
    }
`;
const SEARCH_USERS_QUERY = gql`
    query searchUsers($keyword:String!){
        searchUsers(keyword:$keyword){
            id
            studentId
            name
        }
    }
`;


const ReserveUser = () => {
    const location = useLocation();
    const {register,handleSubmit,formState,errors,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });
    const onCompleted = (data) => {
        const {addMember:{ok,error}} = data;
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
    };
    const [addMember,{loading}] = useMutation(ADD_MEMBER_MUTATION,{
        onCompleted
    });
    const onSubmitValid = (data) => {
        addMember({
            variables:{
                reservationId:location?.state?.id,
                group:[]
            }
        })
    };
    return (
        <>
            <form>
            <Container p='0px'>
                <Item w='240px'><InputGroup className="mt-4">
                    <InputGroup.Text><Subtitle>@</Subtitle></InputGroup.Text>
                    <FormControl
                    placeholder="사용자 추가 (최대 3인)"
                    />
                </InputGroup></Item>

                <Item h="45px"></Item>
                <Submitbutton type="submit" value="예약 확인" height="50px" m="0px"></Submitbutton>
            </Container>
            </form>
        </>
    );
};

export default ReserveUser;