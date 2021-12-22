import { Subtitle, Submitbutton, Item } from '../shared';
import { Form, FloatingLabel } from 'react-bootstrap';
import styled from "styled-components";
import { useState } from "react";

import { Link } from "react-router-dom";
import routes from '../../routes';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import getHours from "date-fns/getHours"
import getMinutes from "date-fns/getMinutes"

const SDatePicker = styled(DatePicker)`
    width: 150px;
    height: 40px;
    border: 1px solid #C4C4C4;
    border-radius: 30px;
    cursor: pointer;
    text-align: center;
    color: #666666;
`;

/*function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }*/

const ReserveMain = () => {
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
    };

    return (
        <>
            <Subtitle size='17px' className="mt-4">사용할 스터디룸을 선택해주세요</Subtitle>
            <FloatingLabel label='{data?.me?.major}' className="mt-3">
                <Form.Select>
                    <option>스터디룸을 선택해주세요</option>
                    <option value="1">1번 스터디룸</option>
                    <option value="2">2번 스터디룸</option>
                    <option value="3">3번 스터디룸</option>
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
            <Subtitle size='12px' className="mt-2">※ 9:30 - 5:30 사이 최대 2시간</Subtitle>


            <div><SDatePicker
                selected={startTime}
                onChange={onSelect}
                locale={ ko }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                minTime={setHours(setMinutes(new Date(), 30), 9)}
                maxTime={setHours(setMinutes(new Date(), 0), 17)}
                timeCaption="Time"
                dateFormat="aa h:mm 시작"
                placeholderText="시작 시간"
                className="mt-4"
            /></div>

            {isSelected ? // 시작 시간을 선택해야 종료 시간 선택 가능
                <div><SDatePicker
                selected={endTime}
                onChange={(time) => setEndTime(time)}
                locale={ ko }
                showTimeSelect
                showTimeSelectOnly
                timeIntervals={30}
                minTime={startTime}
                maxTime={setHours(setMinutes(new Date(), getMinutes(startTime)), getHours(startTime)+2)} // 시작 시간부터 2시간
                excludeTimes={[
                    // 시작 시간 제외
                    startTime,
                    // 5:00 선택 기준 최대 7:00까지 예외처리
                    setHours(setMinutes(new Date(), 0), 18),
                    setHours(setMinutes(new Date(), 30), 18),
                    setHours(setMinutes(new Date(), 0), 19)
                ]}
                timeCaption="Time"
                dateFormat="aa h:mm 종료"
                placeholderText="종료 시간"
                className="mt-3"
            /></div>
                
                : null 
            }
            
            <Item h="40px"></Item>
            <Link to={routes.reservation + "/user"}>
                <Submitbutton type="submit" value="다음" height="50px" m="0px"></Submitbutton>
            </Link>
        </>
    );
};

export default ReserveMain;