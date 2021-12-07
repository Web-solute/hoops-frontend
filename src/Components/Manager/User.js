import {gql, useQuery, useMutation} from "@apollo/client";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';
import styled from "styled-components";

const useStyles = makeStyles({
    table: {
      minWidth: 650,
    }
});

const AvatarContainer = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: #2c2c2c;
  overflow: hidden;
`;

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

export const User = () => {
    const classes = useStyles();
    const {data} = useQuery(SEE_USERS_QUERY);
    const [verifiedUser] = useMutation(VERIFIED_USER_MUTATION);
    const [managedUser] = useMutation(MANAGED_USER_MUTATION);
    const [removeUser] = useMutation(REMOVE_USER_MUTATION);

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
                                    <TableCell>
                                        <AvatarContainer>
                                            <img style={{maxWidth:"100%"}} src={user.idCard}/>
                                        </AvatarContainer>
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
    );
}