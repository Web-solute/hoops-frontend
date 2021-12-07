import { Row } from "../shared";
import { useState} from "react";
import {gql, useQuery} from "@apollo/client";
import room_create_button from '../../images/room_create_button.png';
import room_update_button from '../../images/room_update_button.png';
import room_delete_button from '../../images/room_delete_button.png';
import InputModal from "../Modal/InputModal";
import UpdateModal from "../Modal/UpdateModal";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    }
});

const SEE_ROOMS_QUERY = gql`
    query seeRooms {
        seeRooms {
            id
            roomNumber
            description
            major
        }
    }
`;

export const Room = () => {
    const classes = useStyles();
    const {data} = useQuery(SEE_ROOMS_QUERY);
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    return (
        <>  
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>수정</TableCell>
                            <TableCell>삭제</TableCell>
                            <TableCell>major</TableCell>
                            <TableCell >roomNumber</TableCell>
                            <TableCell  >description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.seeRooms?.map((room) => (
                            <TableRow key={room.id}>
                                <TableCell component="th" scope="row">
                                <div onClick={()=>setUpdateModal(true)} style={{ border: 0, background: 'none'}}>
                                    <img src={room_update_button} alt='room_delete_button'/>
                                </div>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                <div onClick={()=>{}}>
                                    <img src={room_delete_button} alt='room_delete_button'/>
                                </div>
                                </TableCell>
                                <TableCell>{room.roomNumber}</TableCell>
                                <TableCell>{room.major}</TableCell>
                                <TableCell>{room.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            { createModal === true ? <InputModal setModal={setCreateModal} buttonText={'생성'} /> : null } 
            { updateModal === true ? <UpdateModal setModal={setUpdateModal} buttonText={'수정'} /> : null }
            <Row>
                <div onClick={()=>setCreateModal(true)} style={{ border: 0, background: 'none', marginLeft: '200px' }}>
                    <img src={room_create_button} alt='room_create_button'/>
                </div>   
            </Row>
        </>
    );
}