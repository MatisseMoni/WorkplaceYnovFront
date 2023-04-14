import { useParams } from "react-router-dom";
import React, { useState, useEffect } from 'react'
import UserCard from "../components/UserCard";
import axios from "axios";
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Loader from '../components/Loader';



function User() {
    let { idUser } = useParams();
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/users/${idUser}`;

    const [user, setuser] = useState();
    useEffect(() => {
        (async () => {
            try {
                const response = await axios.get(url);
                setuser(response.data);
            }
            catch (error) {
                console.error(error);
            }
        })();
    }, [url])

    if (!user) {
        return (
            <Loader />);
    }

    return (
        <>
            <UserCard user={user} />
        </>
    )
}

export default User