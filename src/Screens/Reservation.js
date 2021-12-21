import { Container, Subtitle } from "../Components/shared";
import { useHistory } from "react-router-dom";
import back_button from '../images/back_button.png';

// 중첩 라우팅
import { Route } from "react-router-dom";
import ReserveMain from "../Components/Reservation/ReserveMain";
import ReserveUser from "../Components/Reservation/ReserveUser";

function Reservation({ match }) {
    const history = useHistory();

    return (
        <Container>
            <button onClick={()=>{ history.goBack(); }} style={{ border: 0, background: 'none', marginRight: '300px' }}><img src={back_button} alt='back_button'/></button>
            <Subtitle size="25px">✔ 예약하기</Subtitle>

            <Route path={`${match.path}/main`} component={ReserveMain} />
            <Route path={`${match.path}/user`} component={ReserveUser} />
        </Container>
    );
}
export default Reservation;