import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';

function MembersList({ groupId, owner }) {
	const [members, setMembers] = useState([]);
	const [error, setError] = useState(null);
	const url = `${process.env.REACT_APP_YOUR_API_URL}/api/groups`;
	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`${url}/${groupId}/members`);
				const membersTmp = response.data['hydra:member'];
				membersTmp.forEach((member) => {
					member.isOwner = member['@id'] === owner;
				});
				console.log(membersTmp);
				setMembers(membersTmp);
			} catch (error) {
				console.error(error);
				setError(error);
			}
		})();
	}, []);

	return (
		<Card sx={{ width: '300px' }}>
			<Container>
				<Typography variant='h6' sx={{mt: 2}}>Membres</Typography>
				{members.length > 0 ? (
					<ul>
						{members.map((member) => (
							<li key={member.id}>
								<Typography variant='body1'>{member.nickname} </Typography>
								<Typography variant='body1'>{member.isOwner ? <span>(admin)</span> : null}</Typography>
							</li>
						))}
					</ul>
				) : (
					<p>Aucun membre</p>
				)}
			</Container>
		</Card>
	);
}

export default MembersList;
