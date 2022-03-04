import styled from "styled-components";
import { Flex, Absolute } from "../shared";
import { Background, Window, Popup } from "./Modal";
import cancel from '../../images/cancel.png';
import logo2 from '../../images/logo2.png';
import QRCode from 'react-qr-code';
import { gql, useQuery, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";

// https://www.npmjs.com/package/react-qr-code

const QrContaiener = styled.div`
    width: 250px;
    height: 250px;
    padding: 30px;
    border: 3px solid #00C5A7;
    border-radius: 35px;
`;

const QrText = styled.div`
    margin-top: 80px;
    color: #00C5A7;
`;
const QrTimer = styled.div`
    margin-top: 20px;
    color: #00C5A7;
`;

const FALSE_QR = gql`
    mutation falseQR($qr:String!){
        falseQR(qr:$qr){
            ok
            error
        }
    }
`;
const TRUE_QR = gql`
    mutation trueQR($qr:String!){
        trueQR(qr:$qr){
            ok
            error
        }
    }
`;
const ALL_FALSE_QR = gql`
    mutation allFalseQR{
        allFalseQR{
            ok
            error
        }
    }
`;

const QR_DATA = gql`
    query QRValid{
        QRValid{
            id
            qr
        }
    }
`;

const QRmodal = (props) => {
    const activation = props.activation;
    const {data} = useQuery(QR_DATA,{pollInterval:16000});
    const [falseQR] = useMutation(FALSE_QR);
    const [trueQR] = useMutation(TRUE_QR);
    const [allFalseQR] = useMutation(ALL_FALSE_QR);
    const [seconds, setSeconds] = useState(15);
    console.log(activation);
    useEffect(() => {
      const countdown = setInterval(() => {  
        if(parseInt(seconds) === 15){
            trueQR({
                variables:{
                    qr:`${data?.QRValid?.qr}`
                },
                refetchQueries:QR_DATA,
                awaitRefetchQueries:true
            });
        }  
        if (parseInt(seconds) > 0) {
            setSeconds(parseInt(seconds) - 1);
        }
        if (parseInt(seconds) === 0) {
            clearInterval(countdown);
            setSeconds(15);
        }
      }, 1000);
      return () => clearInterval(countdown);
    }, [seconds]);

    // window.setInterval(()=>{
    //     if(qr === true){
    //         props.setQr(false);
    //     }
    // },15000)
    return (
        <Background>
            <Window>
                <Popup height='500px'>
                <Flex padding='20px'>
                    <Absolute right='15px'>
                        <img onClick={ 
                            ()=>{ 
                                falseQR({variables:{
                                    qr:`${data?.QRValid?.qr}`
                                },
                                refetchQueries:QR_DATA,
                                awaitRefetchQueries:true
                            });
                                props.setQr(false); 
                        }} src={cancel} alt='cancel'
                        />
                    </Absolute>
                        <QrText>입장을 위한 QR Code</QrText>
                        <QrTimer>{seconds}</QrTimer>
                        <QrContaiener>
                            <QRCode value={`{${data?.QRValid?.id}:${data?.QRValid?.qr} ${activation}}`} level='L' size={185} />
                            {`{${data?.QRValid?.id}:${data?.QRValid?.qr} ${activation}}`}
                        </QrContaiener>
                    <Absolute bottom='20px'><img src={logo2} height="60" alt='logo2'/></Absolute>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default QRmodal;