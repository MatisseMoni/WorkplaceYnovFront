
import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { login } from '../store/reducers/auth';

function Connexion() {
    const url = `${process.env.REACT_APP_YOUR_API_URL}/auth`;
    const urlInfos = `${process.env.REACT_APP_YOUR_API_URL}/api/users/1/info`;
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function HandleSubmit() {
        (async () => {
            try {
                const response = await axios.post(url, {
                    email: email,
                    password: password,
                }, {
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                let token = response.data.token;
                localStorage.setItem('token', token);

                const reponseInfos = await axios.get(urlInfos, { headers: { "Authorization": `Bearer ${token}` } });
                const data = reponseInfos.data;
                dispatch(login(data));

                navigate('/compte');
            }
            catch (error) {
                console.error(error);
            }
        })();
    }

    return (
        <Container>
            <Typography variant="h1" component="div">
                Connexion
            </Typography>
            <Box
                component="form"
                sx={{
                    '&': { m: 1, width: '40ch', flexDirection: 'column', alignItems: 'center' },
                    '& .MuiTextField-root': { marginTop: 1, marginBottom: 1, width: '100%' },
                }}
                noValidate
                autoComplete="off"
            >
                <TextField value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} id="email" label="Email" variant="outlined" />
                <TextField value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} id="password" label="Password" type="password" variant="outlined" />
                <Button onClick={() => HandleSubmit()} variant="outlined">Se Connecter</Button>
            </Box>
        </Container>
    );
}

export default Connexion;