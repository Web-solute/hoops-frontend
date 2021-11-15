import { logUserOut } from "../apollo";
import styled from "styled-components";
import { Container, Subtitle, Smalltext } from "../Components/shared";
import QR_button from '../images/QR_button.png';
import reservation_button from '../images/reservation_button.png';
import mypage_button from '../images/mypage_button.png';
import { Link } from "react-router-dom";
import routes from "../routes";

const Buttoncontainer = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: row;
`;

const Left = styled.div`
    margin-left: 15px;
`;

function Home() {
    return (
        <Container>    
            <Link>
                <img src={QR_button} alt='QR_button'/>
            </Link>
            <Subtitle top="20px">김성중</Subtitle>
            <Smalltext top="10px">201900810</Smalltext>
            <Smalltext top="10px">영미문학문화학과</Smalltext>
            <Buttoncontainer>
                <Link to={routes.reservation}>
                    <img src={reservation_button} alt='reservation_button'/>
                </Link>
                <Left><Link to={routes.myPage}>
                    <img src={mypage_button} alt='mypage_button'/>
                </Link></Left>
            </Buttoncontainer>
            {/*<button onClick={()=>logUserOut()}>Log Out</button> 로그아웃은 마이페이지에 넣을 예정*/}
        </Container>
    );
}
export default Home;