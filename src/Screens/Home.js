import { isLoggedInVar, logUserOut } from "../apollo";
import styled from "styled-components";
import { Container, Subtitle, Smalltext } from "../Components/shared";
import QR_button from '../images/QR_button.png';
import reservation_button from '../images/reservation_button.png';
import mypage_button from '../images/mypage_button.png';
import { Link } from "react-router-dom";
import routes from "../routes";
import {gql, useMutation, useQuery, useReactiveVar} from "@apollo/client";
import { useEffect, useState } from "react";
import QRmodal from "../Components/Modal/QRModal";

const Buttoncontainer = styled.div`
    margin-top: 50px;
    display: flex;
    flex-direction: row;
`;

const Gap = styled.div`
    margin-left: 15px;
`;

const ME_QUERY = gql`
    query me {
        me {
            studentId
            name
            major
            activation
        }
    }
`;

function Home() {
    const hasToken = useReactiveVar(isLoggedInVar);
    const {data} = useQuery(ME_QUERY,{
        skip:!hasToken
    });
    console.log(data);
    const [qr, setQr] = useState(false);
    useEffect(()=>{
        if(data?.me === null){
            logUserOut();
        }
    },[data,qr]);

    return (
        <Container>
            { qr && <QRmodal qr={qr} setQr={setQr} data={data?.me?.studentId} activation={data?.me?.activation}/> } 
            <div>
                <img onClick={ () => setQr(true)} src={QR_button} alt='QR_button' />
            </div>
            <Subtitle top="20px" size="22px">{data?.me?.name}</Subtitle>
            <Smalltext top="10px">{data?.me?.studentId}</Smalltext>
            <Smalltext top="10px">{data?.me?.major}</Smalltext>
            <Buttoncontainer>
                <Link to={routes.reservation + "/main"}>
                    <img src={reservation_button} alt='reservation_button'/>
                </Link>
                <Gap><Link to={`${routes.myPage}/${data?.me?.studentId}`}>
                    <img src={mypage_button} alt='mypage_button'/>
                </Link></Gap>
            </Buttoncontainer>
        </Container>
    );
}
export default Home;