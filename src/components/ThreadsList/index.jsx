import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Button from '@mui/material/Button';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useDispatch, useSelector } from 'react-redux';
import { initThreads } from '../../store/reducers/thread';
import Loader from '../Loader';

function ThreadsList({ groupeId }) {

	const dispatch = useDispatch();
	const threads = useSelector((state) => state.thread.groups);

	const url = `/api/search`;

	const [error, setError] = useState(null);

	useEffect(() => {
		(async () => {
			if (!groupeId) return;
			if (threads && threads.length > 0) return;

			const token = localStorage.getItem('token');
			let nextUrl = url;
			let threadsTmp = [];
			while (nextUrl) {
				try {
					const response = await axios.get(`${process.env.REACT_APP_YOUR_API_URL}${nextUrl}`, {
						headers: { Authorization: `Bearer ${token}` },
					});
					threadsTmp = [...threadsTmp, ...response.data["hydra:member"]];
					nextUrl = response.data['hydra:view']['hydra:next'];
				} catch (error) {
					setError(error);
					break;
				}
			}
			dispatch(initThreads(threadsTmp));
		})();
	}, [groupeId, threads]);

	if (!threads || threads.length === 0) {
		return <Loader />;
	}

	const threadFiltered =
		threads[groupeId] && threads[groupeId].length > 0 ? threads[groupeId] : [];

	return (
		<Card data-testid="loader" sx={{ width: '300px' }}>
			<Container>
				<Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
					<Typography
						variant='h6'
						component='h2'
						textAlign='center'
						sx={{ mt: 2 }}>
						Threads
					</Typography>
					<Link to={`/groupes/${groupeId}/createThread`}>
						<Button variant='contained' size='small' endIcon={<AddIcon />} sx={{ background: '#048b9a', ":hover": { background: '#048b9a' } }}>
							Ajouter
						</Button>
					</Link>
				</Box>

				<ul>
					{threadFiltered.map((thread) => {
						const id = thread['@id'].split('/')[3];

						return (
							<li key={thread.id}>
								<h3>{thread.title}</h3>
								<p>{thread.slug}</p>
								<Link to={`/groupes/${groupeId}/threads/${id}`}>
									<Button size='small' startIcon={<VisibilityIcon />} sx={{ color: '#048b9a' }}>
										Voir le thread
									</Button>
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
