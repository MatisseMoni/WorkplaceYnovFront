import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';

function ThreadsList({ groupeId }) {
	const [threads, setThreads] = useState([]);
	const url = `${process.env.REACT_APP_YOUR_API_URL}/api/search`;

	useEffect(() => {
		(async () => {
			const token = localStorage.getItem('token');
			const response = await axios.get(url, {
				headers: { Authorization: `Bearer ${token}` },
			});
			const threadsTmp = response.data['hydra:member'].filter((thread) => {
				return thread.relatedGroup === `/api/groups/${groupeId}`;
			});
			setThreads(threadsTmp);
		})();
	}, [groupeId]);

	return (
		<Card sx={{ width: '300px' }}>
			<Container>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography
						variant='h6'
						component='h1'
						textAlign='center'>
						Threads
					</Typography>
					<Link to={`/groupes/${groupeId}/createThread`}>
						Ajouter
					</Link>
				</Box>

				<ul>
					{threads.map((thread) => {
						const id = thread['@id'].split('/')[3];

						return (
							<li>
								<h3>{thread.title}</h3>
								<p>{thread.slug}</p>
								<Link to={`/groupes/${groupeId}/threads/${id}`}>
									Voir le thread
								</Link>
							</li>
						);
					})}
				</ul>
			</Container>
		</Card>
	);
}

export default ThreadsList;
