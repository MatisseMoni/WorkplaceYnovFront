import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Container, Typography, Box, TextField, Button } from '@mui/material';

function CreateGroupe () {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/groups`;
    const navigate = useNavigate();

    function handleSubmit () {
        (async () => {
            const token = localStorage.getItem('token');
            const reponse = await axios.post(url, {
                name: name,
                description: description,
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}` }
            });
            console.log(reponse);
            navigate('/compte');
        })();
    }

    return (
        <Container>
            <Typography variant="h1" component="div">
                Créer un groupe
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
                <TextField value={name} onChange={(e) => {
                    setName(e.target.value);
                }} id="name" label="Name" variant="outlined" />
                <TextField value={description} onChange={(e) => {
                    setDescription(e.target.value);
                }} id="description" label="Description" type="text" variant="outlined" />
                <Button onClick={() => handleSubmit()} variant="outlined">Créer</Button>
            </Box>
        </Container>
    )
}

export default CreateGroupe