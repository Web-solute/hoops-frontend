import { Background, Window, Popup } from "./Modal";
import { Flex, Absolute, Subtitle, Input, Submitbutton, ErrorMessage } from "../shared";
import cancel from '../../images/cancel.png';
import { gql, useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";

const UPDATE_PASSWORD = gql`
    mutation updatePassword($password:String! $newPassword:String!){
        updatePassword(password:$password newpassword:$newPassword){
            ok
            error
        }
    }
`

const ChangeModal = (props) => {
    const {register,handleSubmit,errors,setError,clearErrors,getValues} = useForm({
        mode:"onChange",
    });
    const onCompleted = (data) => {
        const {
            updatePassword:{ok,error}
        } = data;
        if(!ok){
            return setError("result",{
                message:error
            });
        }
    };
    const [updatePassword,{loading}] = useMutation(UPDATE_PASSWORD,{
        onCompleted
    });
    const onSubmitValid = (data) => {
        const {password,newPassword} = getValues();
        if(loading){
            return;
        }
        updatePassword({
            variables:{
                password,
                newPassword
            }
        })
    };
    const clearPasswordError = () => {
        clearErrors("result");
    }
    return (
        <Background>
            <Window>
                <Popup height='340px'>
                <Flex padding='20px'>
                    <Absolute right='15px'><img onClick={ ()=>{ props.setChangeModal(false) }} src={cancel} alt='cancel'/></Absolute>
                    <Subtitle size='22px' top='40px'>비밀번호 변경</Subtitle>
                    <form onSubmit={handleSubmit(onSubmitValid)}>
                        <Flex>
                        <Input
                            ref={register({
                                required:"비밀번호를 입력해주세요",
                            })}
                            onChange={clearPasswordError}
                            name="password"
                            hasError={Boolean(errors?.password?.message)} 
                            placeholder="현재 비밀번호" 
                            width='220px'
                            type="text"
                        />
                        <ErrorMessage>{errors?.password?.message}</ErrorMessage>
                        <Input 
                            ref={register({
                                required:"새 비밀번호를 입력해주세요",
                            })}
                            onChange={clearPasswordError}
                            name="newPassword"
                            hasError={Boolean(errors?.newPassword?.message)} 
                            placeholder="새로운 비밀번호" 
                            width='220px'
                            type="text"
                        />
                        <ErrorMessage>{errors?.newPassword?.message}</ErrorMessage>
                        <Submitbutton type="submit" value={"변경"} height='45px' mt='25px'></Submitbutton>
                        </Flex>
                    </form>
                </Flex>
                </Popup>
            </Window>
        </Background>
    );
};

export default ChangeModal;