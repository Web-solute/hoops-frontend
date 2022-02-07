import { Subtitle, Submitbutton, Item, Container, ErrorMessage } from '../shared';
import { Form, FloatingLabel } from 'react-bootstrap';
import styled from "styled-components";
import { useState} from "react";
import { gql,useMutation,useQuery, useLazyQuery } from "@apollo/client";
import routes from '../../routes';
import NoticeModal from '../Modal/NoticeModal';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getHours from "date-fns/getHours"
import getMinutes from "date-fns/getMinutes"

import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

const SDatePicker = styled(DatePicker)`
    width: 150px;
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
            id
            major
            roomNumber
        }
    }
`;

const DISABLED_ROOM = gql`
    query disableRoom($roomId:Int!){
        disableRoom(roomId:$roomId){
            start
            finish
        }
    }
`;

const RESERVE_ROOM = gql`
    mutation reserveRoom($id:Int!, $start:String!, $finish:String!){
        reserveRoom(id:$id start:$start finish:$finish){
            ok
            id
            error
        }
    }
`;

/*function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }*/

const ReserveMain = () => {
    const history = useHistory();
    const {register,handleSubmit,formState,errors,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });
    const {data} = useQuery(SEE_ROOM_MAJOR);
    const label = data?.seeRoomMajor[0]?.major;
    // 시작 시간
    const [startTime, setStartTime] = useState(null);
    // 종료 시간
    const [endTime, setEndTime] = useState(null);
    // 시작 시간을 선택했는지
    const [isSelected, setIsSelected] = useState(false);

    // 시작 시간이 선택되면 해당 시간 적용 및 isSelected를 true로
    const onSelect = (time) => {
        setStartTime(time);
        setIsSelected(true);
        setEndTime(null);
        clearErrors("result");
    };
    const [disableRoom,{data:disables}] = useLazyQuery(DISABLED_ROOM,{pollInterval:500});
    const roomSelect = (data) => {
        disableRoom({variables:{roomId:Number(data.target.value)}})
    }
    
    let startObj = [];
    let finishObj = [];
    disables?.disableRoom.map((schedule)=>{
        const startArr = schedule.start.split(":");
        const finishArr = schedule.finish.split(":");
        const startD = setHours(setMinutes(new Date(), Number(startArr[1])),Number(startArr[0]));
        const finishD = setHours(setMinutes(new Date(), Number(finishArr[1])),Number(finishArr[0]));
        startObj.push(startD);
        finishObj.push(finishD);
    });
    
    const onCompleted = (data) => {
        const {reserveRoom:{ok,id,error}} = data;
        if(!ok){
            console.log(error);
            return setError("result",{
                message:error,
            });
        }
        history.push(`${routes.reservation}/user`,{message:"예약 확인!", id});
    }
    const [reserveRoom,{loading}] = useMutation(RESERVE_ROOM,{
        onCompleted
    });
    const onSubmitValid = (data) => {
        const {roomNumber} = getValues();
        const startH = (Number(startTime?.getHours()) > 9 ? `${startTime?.getHours()}` : `0${startTime?.getHours()}` );
        const startM = (Number(startTime?.getMinutes()) > 9 ? `${startTime?.getMinutes()}` : `0${startTime?.getMinutes()}` );
        const start = `${startH}:${startM}`;
        const endH = (Number(endTime?.getHours()) > 9 ? `${endTime?.getHours()}` : `0${endTime?.getHours()}` );
        const endM = (Number(endTime?.getMinutes()) > 9 ? `${endTime?.getMinutes()}` : `0${endTime?.getMinutes()}` );
        const end = `${endH}:${endM}`;
        if(loading){
            return;
        }
        reserveRoom({
            variables:{
                id:Number(roomNumber),
                start,
                finish:end
            }
        });
    }

    // 현재 시간 기준 지나간 시간 선택 불가
    const filterPassedTime = (time) => {
        const currentDate = new Date();
        const selectedDate = new Date(time);
    
        return currentDate.getTime() < selectedDate.getTime();
    };
    
    const maxTimeFilter = () => {
        const maxHour = getHours(startTime);
        const maxMinute = getMinutes(startTime);
        if(maxHour <= 21){
            const maxTime = setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime)+2);
            const maxT = setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime));
            const temp = startObj.filter(start => ((start > maxT) && start < maxTime));
            const tmp = finishObj.filter(finish => ((finish > maxT) && finish < maxTime));
            if(temp.length !== 0 && tmp.length !== 0){
                return temp[0];
            }
            return maxTime;
        }
        if (maxHour === 22){
            if(maxMinute === 30){
                const maxTime = setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime)+1);
                const maxT = setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime));
                const temp = startObj.filter(start => ((start > maxT) && start < maxTime));
                const tmp = finishObj.filter(finish => ((finish > maxT) && finish < maxTime));
                if(temp.length !== 0 && tmp.length !== 0){
                    return temp[0];
                }
                return maxTime;
            }else{
                const maxTime = setHours(setMinutes(new Date(), getMinutes(startTime)+30), getHours(startTime)+1);
                const maxT = setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime));
                const temp = startObj.filter(start => ((start > maxT) && start < maxTime));
                const tmp = finishObj.filter(finish => ((finish > maxT) && finish < maxTime));
                if(temp.length !== 0 && tmp.length !== 0){
                    return temp[0];
                }
                return maxTime;
            }

        }
        if(maxHour === 23){
            if(maxMinute === 30){
                const maxTime = setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime));
                const maxT = setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime));
                const temp = startObj.filter(start => ((start > maxT) && start < maxTime));
                const tmp = finishObj.filter(finish => ((finish > maxT) && finish < maxTime));
                if(temp.length !== 0 && tmp.length !== 0){
                    return temp[0];
                }
                return maxTime;
            }else{
                const maxTime = setHours(setMinutes(new Date(), getMinutes(startTime)+30), getHours(startTime));
                const maxT = setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime));
                const temp = startObj.filter(start => ((start > maxT) && start < maxTime));
                const tmp = finishObj.filter(finish => ((finish > maxT) && finish < maxTime));
                if(temp.length !== 0 && tmp.length !== 0){
                    return temp[0];
                }
                return maxTime;
            }
        }
    }

    // 공지사항
    const [notice, setNotice] = useState(true);

    return (
        <>
            { notice && <NoticeModal setNotice={setNotice} /> } 
            <form onSubmit={handleSubmit(onSubmitValid)}>
                <Container p='0px'>                            
                    <Subtitle size='17px' className="mt-4">사용할 스터디룸을 선택해주세요</Subtitle>
                    <FloatingLabel label={label} className="mt-3">
                        <Form.Select ref={register()} name="roomNumber" onChange={roomSelect}>
                            <option>스터디룸을 선택해주세요</option>
                            {data?.seeRoomMajor.map((room)=>(
                                <option key={room.id}  value={room.id} >{room.roomNumber}번 스터디룸</option>)
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
            
                    <Subtitle size='17px' className="mt-5">사용할 시간을 지정해주세요</Subtitle>
                    <Subtitle size='12px' className="mt-2">※ 최대 연속 2시간 이용 가능합니다</Subtitle>
                    <Subtitle size='10px' className="mt-2">최대 시작 시간 23:00, 최대 종료 시간 23:30</Subtitle>
                    <div>
                        <SDatePicker
                            selected={startTime}
                            onChange={onSelect}
                            locale={ ko }
                            filterTime={filterPassedTime}
                            showTimeSelect
                            showTimeSelectOnly
                            timeIntervals={30}
                            minTime={setHours(setMinutes(new Date(), 0), 0)}
                            maxTime={setHours(setMinutes(new Date(), 0), 23)}
                            excludeTimes={startObj}
                            timeCaption="Time"
                            dateFormat="aa h:mm 시작"
                            placeholderText="시작 시간"
                            className="mt-4"
                        />
                    </div>

                    {isSelected ? // 시작 시간을 선택해야 종료 시간 선택 가능
                        <div>
                            <SDatePicker
                                selected={endTime}
                                onChange={(time) => setEndTime(time)}
                                locale={ ko }
                                showTimeSelect
                                showTimeSelectOnly
                                timeIntervals={30}
                                minTime={startTime}
                                maxTime={maxTimeFilter()} // 시작 시간부터 2시간
                                excludeTimes={[
                                    // 시작 시간 제외
                                    startTime,
                                    ...finishObj,
                                    // 5:00 선택 기준 최대 7:00까지 예외처리
                                    //setHours(setMinutes(new Date(), 0), 18),
                                    //setHours(setMinutes(new Date(), 30), 18),
                                    //setHours(setMinutes(new Date(), 0), 19)
                                ]}
                                timeCaption="Time"
                                dateFormat="aa h:mm 종료"
                                placeholderText="종료 시간"
                                className="mt-3"
                            />
                        </div>
                    :null}
            
                    <Item h="40px"></Item>
                    <Submitbutton type="submit" value="다음" height="50px" m="0px"/>
                    <ErrorMessage>{errors?.result?.message}</ErrorMessage>
                    
                </Container>
            </form>
        </>
    );
};

export default ReserveMain;