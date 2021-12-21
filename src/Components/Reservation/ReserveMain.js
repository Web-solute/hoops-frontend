import { Subtitle, Submitbutton, CheckText } from '../shared';
import { Form, FloatingLabel } from 'react-bootstrap';
import styled from "styled-components";
import { useState } from "react";

import { Link } from "react-router-dom";
import routes from '../../routes';

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ko } from 'date-fns/esm/locale';
import { from } from '@apollo/client';

const SDatePicker = styled(DatePicker)`
    width: 130px;
    height: 40px;
    border: 1px solid #C4C4C4;
    border-radius: 30px;
    cursor: pointer;
    text-align: center;
    color: #666666;
`;

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

const ReserveMain = () => {
    const [startDate, setStartDate] = useState(null);

    return (
        <>
            <Subtitle size='17px' className="mt-4">사용할 스터디룸을 선택해주세요</Subtitle>
            <FloatingLabel label='{data?.me?.major}' className="mt-2">
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

            <Subtitle size='17px' className="mt-4">사용할 시간을 선택해주세요</Subtitle>
            <CheckText className="mt-3">
                <Form.Check label='1교시 9:30 ~ 10:30'/>
                <Form.Check label='2교시 10:30 ~ 11:30'/>
                <Form.Check label='3교시 11:30 ~ 12:30'/>
                <Form.Check label='4교시 12:30 ~ 13:30'/>
                <Form.Check label='5교시 13:30 ~ 14:30'/>
                <Form.Check label='6교시 14:30 ~ 15:30'/>
                <Form.Check label='7교시 15:30 ~ 16:30'/>
                <Form.Check label='8교시 16:30 ~ 17:30'/>
            </CheckText>

            <Link to={routes.reservation + "/user"}>
                <Submitbutton type="submit" value="다음" height="50px"></Submitbutton>
            </Link>
        </>
    );
};

export default ReserveMain;