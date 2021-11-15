import styled from "styled-components";
import logo from '../images/logo.png';
import { Link } from "react-router-dom";
import routes from "../routes";

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
                <Link to={routes.home}>
                    <img src={logo} alt='logo'/>
                </Link>
            </LogoContainer>
        </HeaderContainer>
    );
  }
  
export default Header;