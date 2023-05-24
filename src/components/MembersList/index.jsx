import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function MembersList({ groupId, owner }) {
	const [members, setMembers] = useState([]);
	const usersLogged = useSelector((state) => state.auth.usersLogged);

	const url = `${process.env.REACT_APP_YOUR_API_URL}/api/groups`;

	useEffect(() => {
		(async () => {
			try {
				const response = await axios.get(`${url}/${groupId}/members`);
				const membersTmp = response.data['hydra:member'];
				membersTmp.forEach((member) => {
					member.isOwner = member['@id'] === owner;
					member.isLogged = usersLogged.some((dataElement) => dataElement.id === member.id);;
				});
				setMembers(membersTmp);
			} catch (error) {
				console.error(error);
			}
		})();
	}, [usersLogged]);

	return (
		<Card sx={{ width: '300px' }}>
			<Container>
				<Typography variant='h6' sx={{ mt: 2 }}>Membres</Typography>
				{members.length > 0 ? (
					<ul>
						{members.map((member) => (
							<li key={member.id}>
								<Typography variant='body1'>{member.nickname} {member.isOwner ? <span>(admin)</span> : null} {member.isLogged ? <span>(connected)</span> : null}</Typography>
							</li>
						))}
					</ul>
				) : (
					<Typography variant='body1'>Aucun membre</Typography>
				)}
			</Container>
		</Card>
	);
}

export default MembersList;
