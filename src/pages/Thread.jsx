import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../components/Loader';
import Tchat from '../components/Tchat';
import { Box, Container, Card, CardContent, Divider, Typography } from '@mui/material';

function Thread() {
	let { idGroupe, idThread } = useParams();
	const url = `${process.env.REACT_APP_YOUR_API_URL}/api/threads/`;
	const [thread, setThread] = useState(null);

	useEffect(() => {
		(async () => {
			try {
				const token = localStorage.getItem('token');
				const response = await axios.get(`${url}${idThread}`, {
					headers: { Authorization: `Bearer ${token}` },
				});
				setThread(response.data);
				console.log(response.data);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [idGroupe, idThread]);

	if (!thread) {
		return <Loader />;
	}

	return (
		<Container>
			<Card>
				<CardContent>
					<Typography
						variant='h5'
						component='h2'
						align='center'>
						{thread.title}
					</Typography>
					<Box
						sx={{
							marginTop: '20px',
							marginBottom: '20px',
							textAlign: 'center',
						}}>
						<Typography variant='subtitle1'>Créé par {thread.owner}</Typography>
						<Typography variant='subtitle1'>
							Objet : {thread.content}
						</Typography>
					</Box>
					<Divider />
					<Box sx={{ marginTop: '20px', marginBottom: '20px' }}>
						<Tchat thread={thread} />
					</Box>
				</CardContent>
			</Card>
		</Container>
	);
}

export default Thread;
