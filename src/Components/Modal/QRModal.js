import styled from "styled-components";
import { Flex, Absolute } from "../shared";
import { Background, Window, Popup } from "./Modal";
import cancel from '../../images/cancel.png';
import logo2 from '../../images/logo2.png';
import QRCode from 'react-qr-code';
import { gql, useQuery } from "@apollo/client";

const QRcontainer = styled.div`
    margin-top: 70px;
`;

const QR_DATA = gql`
    query QRData{
        QRData{
            id
            reserveNum
            room{
                major
    	        roomNumber
            }
            schedule{
                id
                year
                month
                date
                start
                finish
            }
        }
    }
`;

const QRmodal = (props) => {
    const {data} = props;
    const {data:QRdata} = useQuery(QR_DATA);
    let valueObj = [];
    let valueString = ``;
    QRdata?.QRData.map((res)=>{
        if(res.schedule.length !== 0){
            valueString = `${res.id} ${res.room.major} ${res.room.roomNumber} ${res.schedule[0].year}-${res.schedule[0].month}-${res.schedule[0].date} ${res.schedule[0].start} ${res.schedule[res.schedule.length-1].year}-${res.schedule[res.schedule.length-1].month}-${res.schedule[res.schedule.length-1].date} ${res.schedule[res.schedule.length-1].finish}`;
            valueObj.push(valueString);
        }
    });
    return (
        <Background>
            <Window>
                <Popup height='500px'>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setQr(false) }} src={cancel} alt='cancel'/></Absolute>
                    <QRcontainer>
                        <QRCode value={`${valueObj}`} />
                    </QRcontainer>
                    <Absolute bottom='20px'><img src={logo2} height="60" alt='logo2'/></Absolute>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default QRmodal;