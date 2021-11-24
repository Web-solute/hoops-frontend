import { logUserOut } from "../apollo";
import styled from "styled-components";
import { Subtitle, Smalltext, Container } from "../Components/shared";
import cancel_button from '../images/cancel_button.png';
import logout_button from '../images/logout_button.png';
import back_button from '../images/back_button.png';
import { useHistory, Link } from "react-router-dom";
import routes from "../routes";

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

function Mypage() {
    const history = useHistory();

    const logOut = () => {
        history.push(routes.home,{message:"로그아웃되셨습니다!"});
        logUserOut();
    }
    return (
        <Container>
            <button onClick={()=>{ history.goBack(); }} style={{ border: 0, background: 'none', marginRight: '300px' }}><img src={back_button} alt='back_button'/></button>
            <div>
                <Subtitle size="25px">😄</Subtitle><Smalltext size="20px">안녕하세요, </Smalltext><Subtitle size="24px">김성중</Subtitle><Smalltext size="20px">님</Smalltext>
            </div>
            <Subtitle top="40px" size="24px">나의 예약 내역</Subtitle>
            <ReservationBox>
                <NoReservationText>예약 내역이 없습니다!</NoReservationText>
            </ReservationBox>
            <Buttoncontainer>
                <Link to={routes.home}>
                    <img src={cancel_button} alt='cancel_button'/>
                </Link>
                <button onClick={()=>logOut()} style={{ border: 0, background: 'none', marginLeft: '15px' }}>
                    <img src={logout_button} alt='logout_button'/>
                </button>
            </Buttoncontainer>
        </Container>
    );
}
export default Mypage;