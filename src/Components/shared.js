import styled from "styled-components";

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: ${ props => props.p || '30px' };
`;

export const Item = styled.div`
    width: ${ props => props.w || '300px' };
    height: ${ props => props.h };
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
    height: 50px;
    padding: 0 20px;
    margin-botton: 10px;
    border-radius: 10px;
    background-color:#fafafa;
    border: 1px solid #C4C4C4;
    &::placeholder{
        font-size: 17px;
    }
    width: ${ props => props.width || '300px' };
    margin-top: ${ props => props.mt || '25px' };
`;

export const Submitbutton = styled.input`
    border:none;
    border-radius: 30px;
    background-color: #00C5A7;
    color: white;
    text-align:center;
    padding: 8px 0px;
    font-weight: 600;
    width: 120px;
    font-size: 17px;
    height: ${ props => props.height || '60px' };
    margin-left: ${ props => props.ml };
    margin-top: ${ props => props.mt || '30px'};
    margin: ${ props => props.m };
`;

export const Subtitle = styled.span`
    color: #666666;
    margin-top: ${ props => props.top };
    font-size: ${ props => props.size };
`;

export const Smalltext = styled.span`
    color: #858585;
    margin-top: ${ props => props.top };
    margin-bottom: ${ props => props.bottom };
    font-size: ${ props => props.size };
`;

export const Absolute = styled.div`
    position: absolute;
    left: ${ props => props.left };
    right: ${ props => props.right };
    top: ${ props => props.top };
    bottom: ${ props => props.bottom };
`;