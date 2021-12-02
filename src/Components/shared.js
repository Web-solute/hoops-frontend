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
    width: 300px;
    height: 50px;
    border: 0.5px solid ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
    padding: 0 20px;
    margin-top: 25px;
    margin-botton: 10px;
    border-radius: 10px;
    background-color:#fafafa;
    border: 1px solid #C4C4C4;
    &::placeholder{
        font-size: 17px;
    }

    width: ${ props => props.width };
    margin-top: ${ props => props.mt };
`;

export const Submitbutton = styled.input`
    border:none;
    border-radius: 30px;
    margin-top:30px;
    background-color: #00C5A7;
    color: white;
    text-align:center;
    padding: 8px 0px;
    font-weight: 600;
    width: 120px;
    height: 60px;
    font-size: 17px;

    margin-left: ${ props => props.ml };
    height: ${ props => props.height };
    margin-top: ${ props => props.mt };
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
    top: ${ props => props.top };
    bottom: ${ props => props.bottom };
`;
