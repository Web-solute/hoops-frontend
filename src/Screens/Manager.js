import { Container } from "../Components/shared";
import { useState } from "react";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import { useHistory } from "react-router-dom";
import back_button from '../images/back_button.png';
import user_button from '../images/user_button.png';
import room_button from '../images/room_button.png';
import { useEffect } from "react";
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


const Manager = () => {
    const classes = useStyles();
    const history = useHistory();
    const {data} = useQuery(SEE_USERS_QUERY);
    const {data:Me} = useQuery(ME_QUERY);
    const [managerOption, setManagerOption] = useState(0);
    useEffect(()=>{
        if(Me?.me?.isManaged === false && Me?.me?.isManaged === undefined){
            history.push("/");
        }
        
    },[Me]);
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
            <div>User List</div>
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
                                            <button value={user.id}  >❌</button>
                                        </TableCell>
                                        <TableCell>
                                            {user.studentId}
                                        </TableCell>
                                        <TableCell>{user.name}</TableCell>
                                        <TableCell>{user.major}</TableCell>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={user.verified}
                                                
                                                value={user.id}
                                            />
                                        </TableCell>
                                        <TableCell padding="checkbox">
                                            <Checkbox
                                                checked={user.isManaged}
                                                
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
            <div>Room List</div>
            </>
        }
        </Container>
    );
};

export default Manager;