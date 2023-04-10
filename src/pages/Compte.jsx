import React, { useState, useEffect } from 'react';
import UserCard from "../components/UserCard";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import ErrorsPage from '../components/ErrorsPage';
import { useSelector } from 'react-redux';

function Compte() {
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/users/1/info`;
    const currentUser = useSelector(state => state.auth.user);


    useEffect(() => {
        setUser(currentUser);
    }, [url, currentUser]);

    if (error) {
        return <ErrorsPage />;
    }

    if (!user) {
        return (
            <Box sx={{ display: 'block', position: 'absolute', top: '50%', left: '50%', transform: "translate(-50%, -50%)" }}>
                <CircularProgress />
            </Box>);
    }

    return (
        <>
            <UserCard user={user} />
        </>
    );
}

export default Compte;