import { Background, Window, Popup } from "./Modal";
import { Flex, Absolute, Subtitle, Input, Submitbutton, ErrorMessage } from "../shared";
import cancel from '../../images/cancel.png';
import { useForm } from "react-hook-form";
import { gql,useMutation } from "@apollo/client";

const CHANGE_PASSWORD = gql`
    mutation changePassword($studentId:String!){
        changePassword(studentId:$studentId){
            ok
            error
        }
    }
`;

const ForgotModal = (props) => {
    const {register,handleSubmit,errors,setError,clearErrors,getValues} = useForm({
        mode:"onChange",
    });
    const onCompleted = (data) => {
        const {
            changePassword:{ok,error}
        } = data;
        if(!ok){
            return setError("result",{
                message:error
            });
        }
    };
    const [changePassword,{loading}] = useMutation(CHANGE_PASSWORD,{
        onCompleted
    });
    const clearChangeError = () => {
        clearErrors("result");
    }
    const onSubmitValid = (data) => {
        if(loading){
            return;
        }
        const {studentId} = getValues();
        //getValues는 register가 등록된 태그에서 name값을 변수로 태그의 value를 가지고 올수 있다
        changePassword({
            variables:{studentId}
        })
    };

    return (
        <Background>
            <Window>
                <Popup height='280px'>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setForgot(false) }} src={cancel} alt='cancel'/></Absolute>
                    <Subtitle size='22px' top='40px'>비밀번호 찾기</Subtitle>
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
                            placeholder="학번을 입력해주세요" 
                            width='220px'
                            onChange={clearChangeError}
                            name="studentId"
                            type="text"
                            hasError={Boolean(errors?.studentId?.message)}    
                        />
                        <ErrorMessage>{errors?.studentId?.message}</ErrorMessage>
                        <Subtitle size='12px' top='15px'>※ 이메일로 새로운 비밀번호가 발송됩니다!</Subtitle>
                        <Submitbutton type="submit" value={"확인"} height='45px' mt='25px'></Submitbutton>
                        </Flex>
                    </form>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default ForgotModal;