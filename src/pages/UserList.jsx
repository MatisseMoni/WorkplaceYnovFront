import axios from 'axios';
import React, { useState, useEffect } from 'react';
import UserCard from "../components/UserCard";
import { Box, Container } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorsPage from '../components/ErrorsPage';
import { useSelector, useDispatch } from 'react-redux';
import { setUsers as setUsersReducer } from '../store/reducers/user';
import Loader from '../components/Loader';


export const sortUsersByNickname = (users) => {
    let newUsers = [...users];
    newUsers.sort((a, b) => a.nickname.localeCompare(b.nickname));
    return newUsers;
}

function UserList() {
    // Fetch users from API
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/users`;
    const [error, setError] = useState(null);
    const [users, setUsers] = useState()
    const usersInternal = useSelector(state => state.user.users);
    const dispatch = useDispatch();

    const retrieveUsers = async () => {
        try {
            let response = await axios.get(url);
            let usersTmp = response.data["hydra:member"];
            dispatch(setUsersReducer(usersTmp));
            setUsers(usersTmp);
        }
        catch (error) {
            setError(error);
        }
    }

    useEffect(() => {
        if (usersInternal.length > 0) {
            setUsers(usersInternal);
        } else {
            retrieveUsers();
        }
    }, [usersInternal])

    if (error) {
        return <ErrorsPage />;
    }

    if (!users) {
        return (
            <Loader />);
    }

    return (
        <Container sx={{
            '&': { marginTop: 4, marginBottom: 4 },
            '&>*': { marginBottom: 2 },
        }
        }>
            {users.map((user, index) => {
                return (
                    <UserCard user={user} redirect={true} />
                )
            })}
        </Container>
    )
}

export default UserList