import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30px;
`;

export const Flex = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${ props => props.padding };
`;

export const Row = styled.div`
    display: flex;
    justify-content: center;
    padding: ${ props => props.padding };
`;

export const Input = styled.input`
    width: 400px;
    height: 50px;
    @media only screen and (max-width: 450px) {
        width: 300px;
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
    margin-left: ${ props => props.left };
    background-color: #00C5A7;
    color: white;
    text-align:center;
    padding: 8px 0px;
    font-weight: 600;
    width: 120px;
    height: 60px;
    font-size: 17px;
`;

export const Subtitle = styled.span`
    margin-top: ${ props => props.top };
    font-size: ${ props => props.size };
    color: #666666;
`;

export const Smalltext = styled.span`
    margin-top: ${ props => props.top };
    margin-bottom: ${ props => props.bottom };
    font-size: ${ props => props.size };
    color: #858585;
`;

export const Absolute = styled.div`
    position: absolute;
    left: ${ props => props.left };
    right: ${ props => props.right };
    bottom: ${ props => props.bottom };
`;
