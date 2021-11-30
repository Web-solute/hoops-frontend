import { Container } from "../Components/shared";
import { useState } from "react";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import { useHistory } from "react-router-dom";
import back_button from '../images/back_button.png';
import user_button from '../images/user_button.png';
import room_button from '../images/room_button.png';

const SEE_USERS_QUERY = gql`
    query seeUsers {
        seeUsers {
            studentId
            name
            major
            isManaged
            isValid
            idCard
            email
            campus
            createdAt
            updatedAt
        }
    }
`;


const Manager = () => {
    const history = useHistory();
    const {data} = useQuery(SEE_USERS_QUERY);
    const [managerOption, setManagerOption] = useState(0);
    return (
        <Container>
        <button onClick={()=>{ history.goBack(); }} style={{ border: 0, background: 'none', marginRight: '300px' }}><img src={back_button} alt='back_button'/></button>
        <div>
            <button onClick={()=>setManagerOption(0)} style={{ border: 0, background: 'none' }}>
                <img src={user_button} alt='user_button'/>
            </button>
            <button onClick={()=>setManagerOption(1)} style={{ border: 0, background: 'none' }}>
                <img src={room_button} alt='room_button'/>
            </button>
        </div>
        {managerOption === 0 ? (
            <>
            <div>User List</div>
            </>
        ) : <>
            <div>Room List</div>
            </>
        }
        </Container>
    );
};

export default Manager;