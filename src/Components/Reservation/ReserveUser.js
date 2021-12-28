import { Subtitle, Item, Submitbutton, Container, Input } from '../shared';
import { InputGroup, FormControl } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { gql, useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useState } from "react";

import userData from './UserData';
import { client } from '../../apollo';
import { useHistory } from 'react-router-dom';
import routes from '../../routes';

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

const SearchUser = (props) => {
    const [searchUsers,{data}] = useLazyQuery(SEARCH_USERS_QUERY);
    return (
        <>
        <Input 
            className="mt-3"
            width='225px'
            list={props.name}
            type="text"
            placeholder="사용자 이름으로 추가"
            onChange={(e) => {
                props.setSearchTerm(e.target.value);
                searchUsers({variables:{keyword:e.target.value}});
            }} 
        />
        <Item w='230px'><datalist id ={props.name}>
            {data?.searchUsers?.filter((val) => {
                if(props.searchTerm == ""){
                    return val
                }else if(val.name.toLowerCase().includes(props.searchTerm.toLowerCase())){
                    return val
                }
            }).map((data, index) => ( <option key={index} value={`${data.name} ${data.studentId}`} />))}
        </datalist ></Item>       
        </>
    );
};


const ReserveUser = () => {
    const location = useLocation();
    const history = useHistory();
    const {register,handleSubmit,formState,errors,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });
    const [searchTerm1, setSearchTerm1] = useState("");
    const [searchTerm2, setSearchTerm2] = useState("");
    const [searchTerm3, setSearchTerm3] = useState("");
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
        let group = [];
        if(searchTerm1){
            const studentId = searchTerm1.split(" ");
            group.push(studentId[1]);
        }
        if(searchTerm2){
            const studentId = searchTerm2.split(" ");
            group.push(studentId[1]);
        }
        if(searchTerm3){
            const studentId = searchTerm3.split(" ");
            group.push(studentId[1]);
        }
        addMember({
            variables:{
                reservationId:location?.state?.id,
                group:group
            }
        });
        history.push(routes.home);
    };

    return (
        <>
            <Subtitle size='17px' className="mt-4">사용자를 추가해주세요</Subtitle>
            <Subtitle size='12px' className="mt-2">※ 최대 3명</Subtitle>

            <form onSubmit={handleSubmit(onSubmitValid)}>
            <Container p='0px'>
                <SearchUser name="User1" searchTerm={searchTerm1} setSearchTerm={setSearchTerm1}/>
                <SearchUser name="User2" searchTerm={searchTerm2} setSearchTerm={setSearchTerm2}/>
                <SearchUser name="User3" searchTerm={searchTerm3} setSearchTerm={setSearchTerm3}/>
                <Item h="40px"></Item>
                <Submitbutton type="submit" value="예약 확인" height="50px" m="0px"></Submitbutton>
            </Container>
            </form>
        </>
    );
};

export default ReserveUser;
