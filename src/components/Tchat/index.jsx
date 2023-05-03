import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import {
	Box,
	Container,
	Grid,
	Typography,
	Button,
	List,
	ListItem,
	ListItemText,
	TextField,
} from '@mui/material';

function Tchat({ thread }) {
	const id = thread['@id'].split('/')[3];
	const url = `${process.env.REACT_APP_YOUR_API_URL}/api/threads/${id}/messages`;
	const urlSend = `${process.env.REACT_APP_YOUR_API_URL}/api/messages`;
	const currentUser = useSelector((state) => state.auth.user);

	const [messages, setMessages] = useState([]);
	const [message, setMessage] = useState('');
	const [loading, setLoading] = useState(true);

	function handleSubmit(event) {
		event.preventDefault();
		(async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.post(
					urlSend,
					{
						content: message,
						thread: thread['@id'],
					},
					{
						headers: { Authorization: `Bearer ${token}` },
					}
				);
				setMessages([...messages, response.data]);
				setMessage('');
			} catch (error) {
				console.error(error);
			}
		})();
	}

	useEffect(() => {
		(async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(url, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setMessages(response.data['hydra:member']);
				setLoading(false);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [url]);

	if (loading) {
		return <Loader />;
	}

	return (
		<Container>
			<Typography
				variant='h3'
				align='center'>
				Messages
			</Typography>
			{messages.length === 0 && !loading ? (
				<Typography
					variant='subtitle1'
					align='center'>
					Il n'y a pas de messages
				</Typography>
			) : (
				<List>
					{messages.map((message) => (
						<ListItem key={message.id}>
							<Grid
								container
								direction='column'>
								<Grid item>
									<Typography
										variant='body1'
										align='left'>
										{message.owner === `/api/users/${currentUser.id}`
											? 'Me'
											: message.owner}
									</Typography>
								</Grid>
								<Grid item>
									<Typography
										variant='body1'
										align='left'>
										{message.content}
									</Typography>
								</Grid>
							</Grid>
						</ListItem>
					))}
				</List>
			)}
			<Box mt={3}>
				<form onSubmit={(e) => handleSubmit(e)}>
					<Grid
						container
						spacing={2}
						alignItems='center'>
						<Grid
							item
							xs={10}>
							<TextField
								fullWidth
								variant='outlined'
								placeholder='Entrez votre message...'
								value={message}
								onChange={(event) => setMessage(event.target.value)}
							/>
						</Grid>
						<Grid
							item
							xs={2}>
							<Button
								fullWidth
								type='submit'
								variant='contained'
								sx={{
								
									backgroundColor: '#048b9a',
									':hover': { background: '#048b9a' },
								}}
								>
								Envoyer
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Container>
	);
}

export default Tchat;
