import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { Container, Subtitle, Input, Submitbutton, Smalltext, Flex, Row } from "../Components/shared";
import { Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import routes from "../routes";

const Notice = styled.div`
    font-size: 14px;
    color: #858585;
    margin-top: ${props => props.top};
    margin-bottom: ${props => props.bottom};
`;

const Gap = styled.div`
    margin-left: 15px;
`;


const CREATE_USER_MUTATION = gql`
    mutation createUser(
        $studentId:String!,
        $name:String!,
        $password:String!,
        $major:Major!,
        $idCard:Upload!,
        $email:String!,
        $campus:Campus!

    ){
        createUser(
            studentId:$studentId,
            name:$name,
            password:$password,
            major:$major,
            idCard:$idCard,
            email:$email,
            campus:$campus
        ){
            ok
            error
        }
    }
`;

function Signup() {
    const {register,handleSubmit,formState,errors,getValues,setError,clearErrors} = useForm({
        mode:"onChange",
    });
    const history = useHistory();
    const onCompleted = (data) => {
        const {createUser:{ok,error}} = data;
        const {studentId, password} = getValues();
        if(!ok){
            return setError("result",{
                message:error,
            });
        }
        history.push(routes.home,{message:"계정 생성 완료!", studentId, password});
    };
    const [createUser,{loading}] = useMutation(CREATE_USER_MUTATION,{
        onCompleted
    });

    const onSubmitValid = (data) => {
        const {campus,major,name,email,studentId,password,idCard} = getValues();
        if(loading){
            return;
        }
        createUser({
            variables:{
                campus,
                studentId,
                name,
                password,
                major,
                idCard:idCard[0],
                email
            }
        })
    };
    const clearSignUpError = () => {
        clearErrors("result");
    };

    //캠퍼스-학과 선택 알고리즘
    const [option, setOption] = useState("-1");
    const onSelect = (event) => {
        return setOption(() => event.target.value);
      };

    return (
        <Container>
            <Subtitle top="35px" size="22px">회원가입</Subtitle>
            <Notice top="15px">24시간 이내에 승인 처리 될 예정입니다.</Notice>
            <form onSubmit={handleSubmit(onSubmitValid)} encType={'multipart/form-data'}>
                <Flex>
                <Input
                    ref={register({
                        required:"이름을 입력해주세요"
                    })}
                    onChange={()=>clearSignUpError()}
                    name="name"
                    type="text"  
                    placeholder="이름"
                />
                {errors?.name?.message}
                <Input
                    ref={register({
                        required:"이메일을 입력해주세요"
                    })}
                    onChange={()=>clearSignUpError()}
                    name="email"
                    type="email"  
                    placeholder="이메일"
                />
                {errors?.email?.message}
                <Input
                    ref={register({
                        required:"학번을 입력해주세요",
                        minLength:{
                            value:8,
                            message:"8자리 이상 입력하셔아합니다."
                        }
                    })}
                    onChange={()=>clearSignUpError()}
                    name="studentId"
                    type="text"  
                    placeholder="학번"
                />
                {errors?.studentId?.message}
                <Input
                    ref={register({
                        required:"비밀번호를 입력해주세요",
                        minLength:{
                            value: 6,
                            message: "6자리 이상 입력하셔야 합니다."
                        },
                    })}
                    onChange={()=>clearSignUpError()}
                    name="password"
                    type="password"  
                    placeholder="비밀번호"
                />
                {errors?.password?.message}
                {/*<Input 
                    placeholder="비밀번호 확인"
                />*/}
                <Row className="mt-3">
                    <Form.Group controlId="formGridState">
                    <Form.Label><Notice>캠퍼스</Notice></Form.Label>
                    <Form.Select defaultValue="캠퍼스 선택" onChange={onSelect} ref={register({required:"캠퍼스를 선택해주세요"})} name="campus">
                        <option value="-1">캠퍼스 선택</option>
                        <option value="Seoul">서울</option>
                        <option value="Global">글로벌</option>
                    </Form.Select>
                    </Form.Group>
                    <Gap/>
                    <Form.Group controlId="formGridState">
                    <Form.Label><Notice>학과</Notice></Form.Label>
                    <Form.Select defaultValue="학과 선택" ref={register({required:"학과를 선택해주세요"})} name="major">
                        {option === "Seoul" ? (
                            <>
                            <option>학과 선택</option>
                            <option>서울 캠퍼스 학과들</option>
                            </>
                        ) : option === "Global" ? (
                            <>
                            <option>학과 선택</option>
                            <option value="Computer">컴퓨터공학부</option>
                            <option value="Information_Communication">정보통신공학부</option>
                            </>
                        ) : <>
                            <option>학과 선택</option>
                            <option>캠퍼스를 선택해주세요</option>
                            </>
                        }
                    </Form.Select>
                    </Form.Group>
                </Row>
                {errors?.campus?.message}
                {errors?.major?.message}
                <Form.Group controlId="formFile">
                    <Notice top="15px" bottom="10px">학생증 사진을 넣어주세요</Notice>
                    <Form.Control  
                        ref={register({
                                required:"학생증 사진을 넣어주세요",
                        })} 
                        onChange={() => clearSignUpError()}
                        name="idCard" 
                        type="file" 
                    />
                </Form.Group>
                <Submitbutton type="submit" value={loading ? "로딩 중...":"가입하기 →"} disabled={!formState.isValid|| loading} ml="200px"></Submitbutton>
                </Flex>
            </form>
            <Smalltext top="40px" bottom="30px">
                이미 회원이신가요? <Link to={routes.home} style={{ textDecoration: 'none', color: '#565656' }}>로그인</Link>
            </Smalltext>
        </Container>
    );
}

export default Signup;