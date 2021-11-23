import styled from "styled-components";
import { Container, Subtitle, Input, Submitbutton, Smalltext } from "../Components/shared";
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import routes from "../routes";

const Notice = styled.div`
    font-size: 14px;
    margin-top: 15px;
    color: #858585;
    margin-bottom: ${props => props.bottom};
`;

function Signup() {
    return (
        <Container>
            <Subtitle top="50px" size="22px">회원가입</Subtitle>
            <Notice>24시간 이내에 승인 처리 될 예정입니다.</Notice>
            <Input placeholder="학번"></Input>
            <Input placeholder="비밀번호 (영문 + 숫자 조합)"></Input>
            <Input placeholder="비밀번호 확인"></Input>
            <Form.Group controlId="formFile" className="mb-3">
                <Notice bottom='10px'>학생증 사진을 넣어주세요</Notice>
                <Form.Control type="file" />
            </Form.Group>
            <Submitbutton type="submit" value={"가입하기 →"} left="230px"></Submitbutton>
            <Smalltext top="40px">
                이미 회원이신가요? <Link to={routes.home} style={{ textDecoration: 'none', color: '#565656' }}>로그인</Link>
            </Smalltext>
        </Container>
    );
}

export default Signup;