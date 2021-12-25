import { isLoggedInVar, logUserOut } from "../apollo";
import { useParams } from "react-router-dom";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { Subtitle, Smalltext, Container } from "../Components/shared";
import cancel_button from '../images/cancel_button.png';
import logout_button from '../images/logout_button.png';
import back_button from '../images/back_button.png';
import manager_button from '../images/manager_button.png';
import { useHistory, Link } from "react-router-dom";
import routes from "../routes";
import MypageModal from "../Components/Modal/MypageModal";

const ReservationBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 290px;
    height: 200px;
    background: #00C5A7;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 50px;
    margin-top: 20px;
`;

const NoReservationText = styled.div`
    color: white;
    font-size: 24px;
    margin-top: 85px;
`

const Buttoncontainer = styled.div`
    display: flex;
    flex-direction: row;
    margin-top: 50px;
`;

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

    const [logoutModal, setLogoutModal] = useState(false);
    const [cancelModal, setCancelModal] = useState(false);

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

    const cancelReservation = () => {
        history.push(routes.home,{message:"예약취소되었습니다!"});
    } 

    return (
        <Container>
            <button onClick={()=>{ history.goBack(); }} style={{ border: 0, background: 'none', marginRight: '300px' }}><img src={back_button} alt='back_button'/></button>
            <div>
                <Subtitle size="25px">😄</Subtitle><Smalltext size="20px">안녕하세요, </Smalltext><Subtitle size="24px">{data?.me?.name}</Subtitle><Smalltext size="20px">님</Smalltext>
            </div>
            <Subtitle top="40px" size="24px">나의 예약 내역</Subtitle>
            <ReservationBox>
                <NoReservationText>예약 내역이 없습니다!</NoReservationText>
            </ReservationBox>
            <Buttoncontainer>
                <button onClick={()=> setCancelModal(true) } style={{ border: 0, background: 'none' }}>
                    <img src={cancel_button} alt='cancel_button'/>
                </button>
                <button onClick={()=> setLogoutModal(true) } style={{ border: 0, background: 'none' }}>
                    <img src={logout_button} alt='logout_button'/>
                </button>
            </Buttoncontainer>
            {data?.me?.isManaged ?
                (<Link to={routes.manager}>
                <img src={manager_button} alt='manager_button' style={{ marginTop: '20px' }}/>
            </Link>):null}

            { logoutModal === true ? 
                <MypageModal 
                    setModal={setLogoutModal} 
                    setText={'로그아웃'} 
                    setAction = {logOut}
                /> 
                : null 
            } 
            
            { cancelModal === true ? 
                <MypageModal 
                    setModal={setCancelModal} 
                    setText={'예약취소'} 
                    setAction = {cancelReservation}
                /> 
                : null 
            } 

        </Container>
    );
}
export default Mypage;