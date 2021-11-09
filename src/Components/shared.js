import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
`;

export const Subtitle = styled.div`
    margin-top: 50px;
    font-style: normal;
    font-weight: normal;
    font-size: 22px;
    color: #666666;
`;

export const Input = styled.input`
    width: 400px;
    height: 50px;
    @media only screen and (max-width: 400px) {
        width: 100%;
        height: 50px;
    }
    border: 0.5px solid ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
    padding: 0 20px;
    margin-top: 25px;
    margin-botton: 10px;
    border-radius: 10px;
    background-color:#fafafa;
    border: 1px solid #C4C4C4;
    box-sizing:border-box;
    &::placeholder{
        font-size: 17px;
    }
`;

export const Submitbutton = styled.input`
    border:none;
    border-radius: 30px;
    margin-top:30px;
    margin-left: 200px;
    background-color: #00C5A7;
    color: white;
    text-align:center;
    padding: 8px 0px;
    font-weight: 600;
    width: 120px;
    height: 60px;
    font-size: 17px;
`;

export const Authtext = styled.div`
    margin-top: 40px;
    font-size: 16px;
    color: #858585;
`;
