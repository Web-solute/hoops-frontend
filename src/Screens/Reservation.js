import { Container, Subtitle, Item, Submitbutton } from "../Components/shared";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import back_button from '../images/back_button.png';
import { Form, FloatingLabel, InputGroup, FormControl } from 'react-bootstrap';
import styled from "styled-components";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CheckText = styled.div`
    font-family: sans-serif; 
    font-size: 14px;
    color: #666666;
`;

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

function Reservation() {
    const history = useHistory();
    const [startDate, setStartDate] = useState(null);

    return (
        <Container>
            <button onClick={()=>{ history.goBack(); }} style={{ border: 0, background: 'none', marginRight: '300px' }}><img src={back_button} alt='back_button'/></button>
            <Subtitle size="25px">✔ 예약하기</Subtitle>

            <FloatingLabel label='{data?.me?.major}' className="mt-4">
                <Form.Select>
                    <option>사용할 스터디룸을 선택해주세요</option>
                    <option value="1">1번 스터디룸</option>
                    <option value="2">2번 스터디룸</option>
                    <option value="3">3번 스터디룸</option>
                </Form.Select> 
            </FloatingLabel>

            <Subtitle size='17px' className="mt-3">사용할 날짜를 선택해주세요</Subtitle>
            
            <div><DatePicker 
                className="mt-2"
                selected={startDate}
                onChange={(date) => setStartDate(date)} 
                minDate={new Date()}
                maxDate={addDays(new Date(), 7)}
                placeholderText="1주일 내에 선택 가능합니다"
            /></div>

            <Subtitle size='17px' className="mt-3">사용할 시간을 선택해주세요</Subtitle>
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

            <Item><InputGroup className="mt-3">
                <InputGroup.Text><Subtitle>@</Subtitle></InputGroup.Text>
                <FormControl
                placeholder="사용자 추가 (최대 3인)"
                />
            </InputGroup></Item>

            <Submitbutton type="submit" value="예약 확인" height="50px"></Submitbutton>
        </Container>
    );
}
export default Reservation;