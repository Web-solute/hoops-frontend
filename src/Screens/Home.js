import { isLoggedInVar, logUserOut } from "../apollo";
import styled from "styled-components";
import { Container, Subtitle, Smalltext } from "../Components/shared";
import QR_button from '../images/QR_button.png';
import reservation_button from '../images/reservation_button.png';
import mypage_button from '../images/mypage_button.png';
import { Link } from "react-router-dom";
import routes from "../routes";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import { useEffect } from "react";

const Buttoncontainer = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: row;
`;

const Left = styled.div`
    margin-left: 15px;
`;

const ME_QUERY = gql`
    query me {
        me {
            studentId
            name
            major
        }
    }
`;

function Home() {
    const hasToken = useReactiveVar(isLoggedInVar);
    const {data} = useQuery(ME_QUERY,{
        skip:!hasToken
    });
    useEffect(()=>{
        if(data?.me === null){
            logUserOut();
        }
    },[data]);
    return (
        <Container>    
            <Link>
                <img src={QR_button} alt='QR_button'/>
            </Link>
            <Subtitle top="20px" size="22px">{data?.me?.name}</Subtitle>
            <Smalltext top="10px">{data?.me?.studentId}</Smalltext>
            <Smalltext top="10px">{data?.me?.major}</Smalltext>
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