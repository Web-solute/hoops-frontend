import { Row } from "../shared";
import { useState} from "react";
import {gql, useQuery, useMutation} from "@apollo/client";
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
            open
            closed
        }
    }
`;

const DELETE_ROOM_MUTATION = gql`
    mutation deleteRoom($id:Int!){
        deleteRoom(id:$id){
            ok
            error
        }
    }
`;

export const Room = () => {
    const classes = useStyles();
    const {data} = useQuery(SEE_ROOMS_QUERY);
    const [deleteRoom] = useMutation(DELETE_ROOM_MUTATION);
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);
    const [Id,setId] = useState();
    const onDeleteClick = (e) => {
        const id = Number(e.target.value);
        const deleteRoomUpdate = (cache,result) => {
            const {
                data:{
                    deleteRoom:{ok}
                } 
            } = result;
            if(ok){
                cache.evict({id:`Room:${id}`})
            }
        };
        deleteRoom({
            variables:{
                id
            },
            update:deleteRoomUpdate
        });
    }
    const onClick = (e) => {
        const id = Number(e.target.value);
        setUpdateModal(true);
        setId(id);
    }
    return (
        <>  
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>수정</TableCell>
                            <TableCell>삭제</TableCell>
                            <TableCell>roomNumber</TableCell>
                            <TableCell>major</TableCell>
                            <TableCell>description</TableCell>
                            <TableCell>여는 시간</TableCell>
                            <TableCell>닫는 시간</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data?.seeRooms?.map((room) => (
                            <TableRow key={room.id}>
                                <TableCell component="th" scope="row">
                                    <input type="image" src={room_update_button} alt='room_delete_button' value={room.id} onClick={onClick}  style={{ border: 0, background: 'none'}}/>
                                </TableCell>
                                <TableCell component="th" scope="row">
                                    <input type="image" src={room_delete_button} value={room.id} onClick={onDeleteClick} />
                                </TableCell>
                                <TableCell>{room.roomNumber}</TableCell>
                                <TableCell>{room.major}</TableCell>
                                <TableCell>{room.description}</TableCell>
                                <TableCell>{room.open}</TableCell>
                                <TableCell>{room.closed}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            { createModal === true ? <InputModal setModal={setCreateModal} buttonText={'생성'} /> : null } 
            { updateModal === true ? <UpdateModal setModal={setUpdateModal} value={Id} buttonText={'수정'} /> : null }
            <Row>
                <div onClick={()=>setCreateModal(true)} style={{ border: 0, background: 'none', marginLeft: '200px' }}>
                    <img src={room_create_button} alt='room_create_button'/>
                </div>   
            </Row>
        </>
    );
}