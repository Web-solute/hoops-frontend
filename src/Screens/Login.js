import { Container, Subtitle, Input, Submitbutton, Authtext } from "../Components/shared";
import { Link } from "react-router-dom";
import routes from "../routes";

function Login() {
    return (
        <Container>
            <Subtitle>로그인</Subtitle>
            <Input placeholder="학번을 입력해주세요"></Input>
            <Input placeholder="비밀번호를 입력해주세요"></Input>
            <Submitbutton type="submit" value={"로그인 →"}></Submitbutton>
            <Authtext>
                계정이 없으신가요? <Link to={routes.signUp} style={{ textDecoration: 'none', color: '#565656' }}>회원가입</Link>
            </Authtext>
        </Container>
    );
}

export default Login;