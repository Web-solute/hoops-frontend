import { Container, Subtitle, Input, Submitbutton, Smalltext, Flex } from "../Components/shared";
import { Link } from "react-router-dom";
import routes from "../routes";
import { useForm } from "react-hook-form";
import {gql, useMutation} from "@apollo/client";
import {logUserIn} from "../apollo"

const LOGIN_MUTATION = gql`
    mutation login($studentId:String!,$password:String!){
        login(studentId:$studentId, password:$password){
            ok
            token
            error
        }
    }
`;

function Login() {
    const {register,handleSubmit,errors,formState,setError,clearErrors,getValues} = useForm({
        mode:"onChange"
    });// 백엔드의 데이터를 받기 위해 준비하는 것 (이전의 useState를 대체하는 것)

    const onCompleted = (data) => {
        const {
            login:{ok,error,token}
        } = data;
        //data는 LOGIN_MUTATION의 결과값을 받아준다.
        if(!ok){
            return setError("result",{
                message:error
            });
            //Error를 커스터마이징 --> "result"라는 이름의 에러는 login mutation의 에러로 나오는 메세지이다.
        }
        if(token){
            logUserIn(token);
        }
    };
    const [login,{loading}] = useMutation(LOGIN_MUTATION,{
        onCompleted
    });
    //useMutation을 통해 백엔드에서 만든 함수를 사용
    //여기서 onCompleted란 useMutation이 실행되고 종료되기 직전에 불러오는 함수
    const clearLoginError = () => {
        clearErrors("result");
        //"result"라는 이름에 커스터마이징한 에러메세지를 없애겠다.
    }
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const {studentId,password} = getValues();
        //getValues는 register가 등록된 태그에서 name값을 변수로 태그의 value를 가지고 올수 있다
        login({
            variables:{studentId,password}
        })
    };

    return (
        <Container>
            <Subtitle top="50px" size="22px">로그인</Subtitle>
            <form onSubmit={handleSubmit(onSubmitValid)}>
                <Flex>
                <Input 
                    ref={register({
                        required:"StudentId is Required",
                        minLength:{
                            value:9,
                            message:"학번을 정확하게 입력해주세요"
                        },
                    })}
                    onChange={clearLoginError}
                    placeholder="학번을 입력해주세요"
                    name="studentId"
                    type="text"
                    hasError={Boolean(errors?.studentId?.message)}
                />
                {errors?.studentId?.message}
                <Input 
                    ref={register({
                        required:"Password is Required",
                    })}
                    onChange={clearLoginError}
                    placeholder="비밀번호를 입력해주세요"
                    name="password"
                    type="password"
                    hasError={Boolean(errors?.password?.message)}
                />
                {errors?.password?.message}
                <Submitbutton type="submit" value={"로그인 →"} disabled={!formState.isValid} left="270px"></Submitbutton>
                </Flex>
            </form>
            <Smalltext top="40px">
                계정이 없으신가요? <Link to={routes.signUp} style={{ textDecoration: 'none', color: '#565656' }}>회원가입</Link>
            </Smalltext>
        </Container>
    );
}

export default Login;