import styled from "styled-components";
import logo from '../logo.png'

const HeaderContainer = styled.div`
    height: 65px;
    width: 100%;
    background: #00C5A7;
    border-radius: 0px 0px 15px 15px;
`;

const LogoContainer = styled.div`
    position: absolute;
    left: 10px;
`;

function Header() {

    return (
        <HeaderContainer>
            <LogoContainer>
                <img src={logo} alt='logo'/>
            </LogoContainer>
        </HeaderContainer>
    );
  }
  
export default Header;