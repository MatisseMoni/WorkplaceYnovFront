import { CardActions, CardContent } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Typography, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import VisibilityIcon from '@mui/icons-material/Visibility';
import Divider from '@mui/material/Divider';
import axios from 'axios';

function GroupCard({ groupe, isGrid = false }) {
	const { name, description, isMember = false, isOwner = false } = groupe;
	const id = groupe['@id']?.split('/')[3];
	const displayLink = isMember || isOwner;
	const url = `${process.env.REACT_APP_YOUR_API_URL}/api/group_requests`;

	async function requestAccess() {
		try {
			let reponse = await axios.post(
				url,
				{
					targetGroup: groupe['@id'],
				},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
				}
			);
		} catch (error) {
			console.error(error);
		}
	}

	return (
		<>
			<Card
				variant='outlined'
				sx={{ height: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'column' }}>
				<CardContent>
					<Typography
						variant='h6'
						component='div'
						sx={{ textAlign: 'center', fontWeight: 'bold', mb: '10px' }}>
						{name}
					</Typography>
					<Divider variant='middle' />
					<Typography
						variant='body2'
						sx={{ marginY: 3 }}>
						{description}
					</Typography>
					<Divider variant='middle' />
				</CardContent>
				<CardActions
					sx={{ display: 'flex', justifyContent: 'end', mt: '10px' }}>
					{isGrid ? (
						displayLink ? (
							<Button
								variant='contained'
								size='small'
								sx={{ backgroundColor: '#048b9a', ":hover": { background: '#048b9a' } }}
								endIcon={<VisibilityIcon />}>
								<Link
									to={`/groupes/${id}`}
									style={{ textDecoration: 'none', color: 'white', ":hover": { backgroundColor: '#048b9a', color: 'white' } }}
									color=''>
									Voir le groupe
								</Link>
							</Button>
						) : (
							<Button
								onClick={requestAccess}
								variant='contained'
								size='small'
								sx={{ backgroundColor: '#048b9a', color: 'white', ":hover": { backgroundColor: '#048b9a', color: 'white' } }}
								endIcon={<SendIcon />}>
								Demander l'accès
							</Button>
						)
					) : null}
				</CardActions>
			</Card>
		</>
	);
}

export default GroupCard;
