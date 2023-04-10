import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function Inscription() {
    const url = `${process.env.REACT_APP_YOUR_API_URL}/api/users`;
    const [nickname, setNickname] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    function HandelChangePasswordConfirmation(e) {
        setPasswordConfirmation(e.target.value);
        if (password !== e.target.value) {
            setError(true);
        } else {
            setError(false);
        }
    }

    function HandleSubmit() {
        (async () => {
            try {
                const response = await axios.post(url, {
                    nickname: nickname,
                    email: email,
                    plainPassword: password,
                });
                console.log(response);
                navigate('/userList');
            }
            catch (error) {
                console.error(error);
            }
        })();
    }

    return (
        <Container>
            <Typography variant="h1" component="div">
                Inscription
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
                <TextField value={nickname} onChange={(e) => {
                    setNickname(e.target.value);
                }} id="nickname" label="Nickname" variant="outlined" />
                <TextField value={email} onChange={(e) => {
                    setEmail(e.target.value);
                }} id="email" label="Email" variant="outlined" />
                <TextField value={password} onChange={(e) => {
                    setPassword(e.target.value);
                }} id="password" label="Password" type="password" variant="outlined" />
                <TextField value={passwordConfirmation} onChange={(e) => HandelChangePasswordConfirmation(e)} id="password-confirmation" label="Password Confirmation" type="password" variant="outlined" error={error} helperText={error ? "Passwords do not match" : null} />
                <Button onClick={() => HandleSubmit()} variant="outlined">S'inscrire</Button>
            </Box>
        </Container>
    )
}

export default Inscription