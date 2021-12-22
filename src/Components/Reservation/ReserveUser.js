import { Subtitle, Item, Submitbutton, Container } from '../shared';
import { InputGroup, FormControl } from 'react-bootstrap';

const ReserveUser = () => {
    return (
        <>
            <form>
            <Container p='0px'>
                <Item w='240px'><InputGroup className="mt-4">
                    <InputGroup.Text><Subtitle>@</Subtitle></InputGroup.Text>
                    <FormControl
                    placeholder="사용자 추가 (최대 3인)"
                    />
                </InputGroup></Item>

                <Item h="45px"></Item>
                <Submitbutton type="submit" value="예약 확인" height="50px" m="0px"></Submitbutton>
            </Container>
            </form>
        </>
    );
};

export default ReserveUser;