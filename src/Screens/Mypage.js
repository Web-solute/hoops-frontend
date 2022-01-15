import { isLoggedInVar, logUserOut } from "../apollo";
import { useParams } from "react-router-dom";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import { useEffect, useState } from "react";
import { Subtitle, Smalltext, Container } from "../Components/shared";
import logout_button from '../images/logout_button.png';
import list_button from '../images/list_button.png';
import back_button from '../images/back_button.png';
import manager_button from '../images/manager_button.png';
import change_button from '../images/change_button.png';
import { useHistory, Link } from "react-router-dom";
import routes from "../routes";
import MypageModal from "../Components/Modal/MypageModal";
import ListModal from "../Components/Modal/ListModal";
import ChangeModal from "../Components/Modal/ChangeModal";

const ME_QUERY = gql`
    query me {
        me {
            studentId
            name
            major
            isManaged
        }
    }
`;

function Mypage() {
    const history = useHistory();

    const [list, setList] = useState(false);
    const [logoutModal, setLogoutModal] = useState(false);
    const [changeModal, setChangeModal] = useState(false);

    const hasToken = useReactiveVar(isLoggedInVar);
    const {studentId} = useParams();
    const {data} = useQuery(ME_QUERY,{
        skip:!hasToken
    });
    useEffect(()=>{
        if(data?.me === null){
            logUserOut();
        }
        if(studentId !== data?.me?.studentId && data?.me?.studentId !== undefined){
            history.push("/");
        }
        
    },[data]);

    const logOut = () => {
        history.push(routes.home,{message:"로그아웃되셨습니다!"});
        logUserOut();
    } 

    return (
        <Container>
            <button onClick={()=>{ history.goBack(); }} style={{ border: 0, background: 'none', marginRight: '300px' }}><img src={back_button} alt='back_button'/></button>
            <div>
                <Subtitle size="25px">😄</Subtitle><Smalltext size="20px">안녕하세요, </Smalltext><Subtitle size="24px">{data?.me?.name}</Subtitle><Smalltext size="20px">님</Smalltext>
            </div>
            <button onClick={()=> setList(true) } style={{ border: 0, background: 'none', marginTop: '30px' }}>
                <img src={list_button} alt='list_button'/>
            </button>
            <button onClick={()=> setLogoutModal(true) } style={{ border: 0, background: 'none', marginTop: '20px' }}>
                <img src={logout_button} alt='logout_button'/>
            </button>
            <button onClick={()=> { setChangeModal(true) } } style={{ border: 0, background: 'none', marginTop: '15px' }}>
                <img src={change_button} alt='change_button'/>
            </button>
            {data?.me?.isManaged ?
                (<Link to={routes.manager}>
                <img src={manager_button} alt='manager_button' style={{ marginTop: '15px' }}/>
            </Link>):null}

            { list && <ListModal setList={setList} /> } 

            { logoutModal &&
                <MypageModal 
                    setModal={setLogoutModal} 
                    setText={'로그아웃'} 
                    setAction = {logOut}
                /> 
            } 
            { changeModal && <ChangeModal setChangeModal={setChangeModal} /> } 
        </Container>
    );
}
export default Mypage;