import { Container } from "../Components/shared";
import { useState, useEffect } from "react";
import {gql, useQuery} from "@apollo/client";
import { useHistory } from "react-router-dom";
import back_button from '../images/back_button.png';
import user_button from '../images/user_button.png';
import room_button from '../images/room_button.png';
import { User } from "../Components/Manager/User";
import { Room } from "../Components/Manager/Room";

const ME_QUERY = gql`
    query me {
        me {
            isManaged
        }
    }
`;

const Manager = () => {
    const history = useHistory();
    const {data:Me} = useQuery(ME_QUERY);
    const [managerOption, setManagerOption] = useState(0);
    useEffect(()=>{
        if(Me?.me?.isManaged === false && Me?.me?.isManaged === undefined){
            history.push("/");
        }
        
    },[Me,history]);
    
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
            {managerOption === 0 ? <User/> : <Room/> }
        </Container>
    );
};

export default Manager;