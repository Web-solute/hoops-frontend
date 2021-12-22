import { Subtitle, Submitbutton, CheckText } from '../shared';
import { Form, FloatingLabel } from 'react-bootstrap';
import styled from "styled-components";
import { useState } from "react";
import { gql,useMutation,useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import routes from '../../routes';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import { from } from '@apollo/client';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const SDatePicker = styled(DatePicker)`
    width: 130px;
    height: 40px;
    border: 1px solid #C4C4C4;
    border-radius: 30px;
    cursor: pointer;
    text-align: center;
    color: #666666;
`;

const SEE_ROOM_MAJOR = gql`
    query seeRoomMajor{
        seeRoomMajor{
            major
            roomNumber
        }
    }
`;

const RESERVE_ROOM = gql`
    mutation reserveRoom($major:Major! $roomNumber:Int!, $classes:[Int]){
        reserveRoom(major:$major roomNumber:$roomNumber classes:$classes){
            ok
            id
            error
        }
    }
`

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

const ReserveMain = () => {
    const history = useHistory();
    const [startDate, setStartDate] = useState(null);
    const {register,handleSubmit,formState,errors,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });
    const {data} = useQuery(SEE_ROOM_MAJOR);
    const label = data?.seeRoomMajor[0]?.major;
    const onCompleted = (data) => {
        const {reserveRoom:{ok,id,error}} = data;
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
        history.push(`${routes.reservation}/user`,{message:"계정 생성 완료!", id});

    }
    const [reserveRoom,{loading}] = useMutation(RESERVE_ROOM,{
        onCompleted
    });
    const onSubmitValid = (data) => {
        const {roomNumber, schedule} = getValues();
        console.log(roomNumber);
        console.log(schedule);
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmitValid)}>
                <FloatingLabel label={label} className="mt-2">
                <Subtitle size='17px' className="mt-4">사용할 스터디룸을 선택해주세요</Subtitle>
                    <Form.Select ref={register()} name="roomNumber">
                        <option>스터디룸을 선택해주세요</option>
                        {data?.seeRoomMajor.map((room)=>(
                            <option value={room.roomNumber}>{room.roomNumber}번 스터디룸</option>)
                        )}
                    </Form.Select> 
                </FloatingLabel>
                {/* <Subtitle size='17px' className="mt-4">사용할 날짜를 선택해주세요</Subtitle>
                

                <div><SDatePicker
                    className="mt-2"
                    selected={startDate}
                    onChange={(date) => setStartDate(date)} 
                    locale={ ko }
                    dateFormat="MM월 dd일"
                    minDate={new Date()}
                    maxDate={addDays(new Date(), 7)}
                    placeholderText="1주일 내에 선택"
                /></div> */}

                <Subtitle size='17px' className="mt-4">사용할 시간을 선택해주세요</Subtitle>
                <CheckText className="mt-3" ref={register()} name="schedule">
                    <Form.Check value={20} label='Time: 09:30 ~ 10:00'/>
                    <Form.Check value={21} label='Time: 10:00 ~ 10:30'/>
                    <Form.Check value={22} label='Time: 10:30 ~ 11:00'/>
                    <Form.Check value={23} label='Time: 11:00 ~ 11:30'/>
                    <Form.Check value={24} label='Time: 11:30 ~ 12:00'/>
                    <Form.Check value={25} label='Time: 12:00 ~ 12:30'/>
                    <Form.Check value={26} label='Time: 12:30 ~ 13:00'/>
                    <Form.Check value={27} label='Time: 13:00 ~ 13:30'/>
                </CheckText>

                <Submitbutton type="submit" value="다음" height="50px"></Submitbutton>
                
            </form>
        </>
    );
};

export default ReserveMain;