import { Container, Row } from "../Components/shared";
import { useState, useEffect } from "react";
import {gql, useQuery, useMutation} from "@apollo/client";
import { useHistory } from "react-router-dom";
import back_button from '../images/back_button.png';
import user_button from '../images/user_button.png';
import room_button from '../images/room_button.png';
import room_create_button from '../images/room_create_button.png';
import room_update_button from '../images/room_update_button.png';
import room_delete_button from '../images/room_delete_button.png';
import InputModal from "../Components/Modal/InputModal";
import Avatar from "../Components/Avatar";

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';


const useStyles = makeStyles({
    table: {
      minWidth: 650,
    },
});

const SEE_USERS_QUERY = gql`
    query seeUsers {
        seeUsers {
            id
            studentId
            name
            major
            isManaged
            isValid
            idCard
            email
            campus
            createdAt
            updatedAt
        }
    }
`;

const ME_QUERY = gql`
    query me {
        me {
            isManaged
        }
    }
`;

const VERIFIED_USER_MUTATION = gql`
    mutation verifiedUser($id:Int!){
        verifiedUser(id:$id){
            ok
            error
        }
    }
`;

const MANAGED_USER_MUTATION = gql`
    mutation managedUser($id:Int!){
        managedUser(
            id:$id
        ){
            ok
            error
        }
    }
`;

const REMOVE_USER_MUTATION = gql`
    mutation removeUser($id:Int!){
        removeUser(id:$id){
            ok
            error
        }
    }
`;



const Manager = () => {
    const classes = useStyles();
    const history = useHistory();
    const {data} = useQuery(SEE_USERS_QUERY);
    const {data:Me} = useQuery(ME_QUERY);
    const [verifiedUser] = useMutation(VERIFIED_USER_MUTATION);
    const [managedUser] = useMutation(MANAGED_USER_MUTATION);
    const [removeUser] = useMutation(REMOVE_USER_MUTATION);
    
    const [managerOption, setManagerOption] = useState(0);
    const [createModal, setCreateModal] = useState(false);
    const [updateModal, setUpdateModal] = useState(false);

    useEffect(()=>{
        if(Me?.me?.isManaged === false && Me?.me?.isManaged === undefined){
            history.push("/");
        }
        
    },[Me]);
    const toggleValid = (e) => {
        const id = Number(e.target.value);
        const verifiedUserUpdate = (cache,result) => {
            const {
                data:{
                    verifiedUser:{ok}
                }
            } = result;
            if(!ok){
                return;
            }
            cache.modify({
                id:`User:${id}`,
                fields:{
                    isValid(prev){
                        return !prev;
                    }
                }
            });
        }
        verifiedUser({
            variables:{
                id
            },
            update:verifiedUserUpdate
        });
    };
    const toggleManaged = (e) => {
        const id = Number(e.target.value);
        const ManagedUpdate = (cache,result) => {
            const {
                data:{
                    managedUser:{ok}
                }
            } = result;
            if(!ok){
                return;
            }
            cache.modify({
                id:`User:${id}`,
                fields:{
                    isManaged(prev){
                        return !prev;
                    }
                }
            });
        }
        managedUser({
            variables:{
                id
            },
            update:ManagedUpdate
        });
    };
    const onDeleteClick = (e) => {
        const id = Number(e.target.value);
        const removeUserUpdate = (cache,result) => {
            const {
                data:{
                    removeUser:{ok}
                } 
            } = result;
            if(ok){
                cache.evict({id:`User:${id}`})
            }
        };
        removeUser({
            variables:{
                id
            },
            update:removeUserUpdate
        });
    }

    return (
        <Container>
        <button onClick={()=>{ history.goBack(); }} style={{ border: 0, background: 'none', marginRight: '300px' }}><img src={back_button} alt='back_button'/></button>
        <div>
            <button onClick={()=>setManagerOption(0)} style={{ border: 0, background: 'none' }}>
                <img src={user_button} alt='user_button'/>
            </button>
            <button onClick={()=>setManagerOption(1)} style={{ border: 0, background: 'none' }}>
                <img src={room_button} alt='room_button'/>
            </button>
        </div>
        {managerOption === 0 ? (
            <>
            <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>idCard</TableCell>
                                    <TableCell >deleteUser</TableCell>
                                    <TableCell >StudentId</TableCell>
                                    <TableCell >Name</TableCell>
                                    <TableCell >Major</TableCell>
                                    <TableCell >Verified</TableCell>
                                    <TableCell >isManaged</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {data?.seeUsers?.map((user) => (
                                    <TableRow key={user.studentId}>
                                        <TableCell>{user.idCard ?
                                            <Avatar src={user.idCard}/> : null}
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            <button value={user.id} onClick={onDeleteClick} >❌</button>
                                        </TableCell>
                                        <TableCell>
                                            {user.studentId}
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.major}</TableCell>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={user.isValid}
                                                onClick={toggleValid}
                                                value={user.id}
                                            />
                                        </TableCell>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={user.isManaged}
                                                onClick={toggleManaged}
                                                value={user.id}
                                            />
                                        </TableCell>
                                        
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
            </>
        ) : <>
                { createModal === true ? <InputModal setModal={setCreateModal} buttonText={'생성'} /> : null } 
                { updateModal === true ? <InputModal setModal={setUpdateModal} buttonText={'수정'} /> : null }
                <div onClick={()=>setCreateModal(true)} style={{ border: 0, background: 'none', marginLeft: '250px' }}>
                    <img src={room_create_button} alt='room_create_button'/>
                </div>
                <Row>
                    <div onClick={()=>setUpdateModal(true)} style={{ border: 0, background: 'none', marginLeft: '200px' }}>
                        <img src={room_update_button} alt='room_update_button'/>
                    </div>
                    <div onClick={()=>{}} style={{ border: 0, background: 'none' }}>
                        <img src={room_delete_button} alt='room_delete_button'/>
                    </div>
                </Row>
            </>
        }
        </Container>
    );
};

export default Manager;