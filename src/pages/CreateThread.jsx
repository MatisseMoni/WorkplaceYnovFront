import React, { useState } from 'react';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import {  Typography, Box, TextField, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import CommentIcon from '@mui/icons-material/Comment';
import { useDispatch } from 'react-redux';
import {setGroupes as setGroupesAll} from "../store/reducers/groupe";

function CreateThread () {
    let { idGroupe } = useParams();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/threads`;
    const navigate = useNavigate();
    const dispatch = useDispatch();

    function handleSubmit () {
        (async () => {
            try {
            const token = localStorage.getItem('token');
            const reponse = await axios.post(url, {
                title: title,
                content: content,
                relatedGroup: `/api/groups/${idGroupe}`
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    "Authorization": `Bearer ${token}` }
            });
            dispatch(setGroupesAll(null));
            navigate(`/groupes/${idGroupe}`);
            } catch (error) {
                console.error(error);
            }
        })();
    }

    return (
        <Box
        sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
				<CommentIcon />
			</Avatar>
            <Typography variant="h5" component="h1">
                Créer un thread
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
                <TextField value={title} onChange={(e) => {
                    setTitle(e.target.value);
                }
                } id="title" label="Title" variant="outlined" />
                <TextField value={content} onChange={(e) => {
                    setContent(e.target.value);
                }
                } id="content" label="Content" type="text" variant="outlined" />
                <Button fullWidth onClick={() => handleSubmit()} variant="contained">Créer</Button>
            </Box>
        </Box>
    )
}

export default CreateThread;