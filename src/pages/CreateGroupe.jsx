import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Typography, Box, TextField, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { useDispatch } from 'react-redux';
import { sendGroupe } from '../store/reducers/groupe';

function CreateGroupe() {
	const [name, setName] = useState('');
	const [description, setDescription] = useState('');
	const url = `${process.env.REACT_APP_YOUR_API_URL}/api/groups`;
	const urlGroupRequest = `${process.env.REACT_APP_YOUR_API_URL}/api/group_requests`;

	const navigate = useNavigate();
	const dispatch = useDispatch();

	function handleSubmit() {
		(async () => {
			try {
				const token = localStorage.getItem('token');
				const reponseCreate = await axios.post(
					url,
					{
						name: name,
						description: description,
					},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				console.log('reponseCreate', reponseCreate.data);

				const reponseRequest = await axios.post(
					urlGroupRequest,
					{
						targetGroup: reponseCreate.data['@id'],
					},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);

				console.log('reponseRequest', reponseRequest.data);

				const reponseAccept = await axios.post(
					`${urlGroupRequest}/${reponseRequest.data.id}/accept`,
					{},
					{
						headers: {
							Authorization: `Bearer ${localStorage.getItem('token')}`,
						},
					}
				);

				console.log('reponseAccept', reponseAccept.data);

				let groupe = reponseCreate.data;
				dispatch(sendGroupe(groupe));
				navigate(`/groupes/${reponseCreate.data.id}`);
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
				<GroupAddIcon />
			</Avatar>
			<Typography
				variant='h5'
				component='h1'>
				Créer un groupe
			</Typography>
			<Box
				component='form'
				sx={{
					'&': {
						m: 1,
						width: '40ch',
						flexDirection: 'column',
						alignItems: 'center',
					},
					'& .MuiTextField-root': {
						marginTop: 1,
						marginBottom: 1,
						width: '100%',
					},
				}}
				noValidate
				autoComplete='off'>
				<TextField
					value={name}
					onChange={(e) => {
						setName(e.target.value);
					}}
					id='name'
					label='Name'
					variant='outlined'
				/>
				<TextField
                    multiline
                    rows={5}
					value={description}
					onChange={(e) => {
						setDescription(e.target.value);
					}}
					id='description'
					label='Description'
					type='text'
					variant='outlined'
				/>
				<Button
					fullWidth
					onClick={() => handleSubmit()}
					variant='contained'
					sx={{
						backgroundColor: '#048b9a',
						':hover': { background: '#048b9a' },
					}}>
					Créer
				</Button>
			</Box>
		</Box>
	);
}

export default CreateGroupe;
