import React from 'react';
import { render, screen, act } from '@testing-library/react';
import MembersList from '.';
import axios from 'axios';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
	...jest.requireActual('react-redux'),
	useSelector: jest.fn(),
}));

jest.mock('axios'); // Mock d'axios pour les appels réseau

describe('MembersList component', () => {
	beforeEach(() => {
		useSelector.mockReturnValue([]); // Mock de useSelector pour les usersLogged
	});

	test('renders members list', async () => {
		const groupId = 1;
		const owner = 'user1';
		const members = [
			{ id: 1, nickname: 'User 1' },
			{ id: 2, nickname: 'User 2' },
		];

		// Mock de l'appel axios.get
		axios.get.mockResolvedValueOnce({ data: { 'hydra:member': members } });
		await act(async () => {
			render(
				<MembersList
					groupId={groupId}
					owner={owner}
				/>
			);
		});
		// Vérification du titre "Membres"
		const titleElement = screen.getByText(/Membres/i);
		expect(titleElement).toBeInTheDocument();

		// Vérification de la présence des membres
		const member1 = screen.queryByText(/User 1/i);
		const member2 = screen.queryByText(/User 2/i);

		expect(member1).toBeInTheDocument();
		expect(member2).toBeInTheDocument();

		// Vérification de l'absence du message "Aucun membre"
		const noMembersMessage = screen.queryByText(/Aucun membre/i);
		expect(noMembersMessage).toBeNull();
	});

	test('renders "Aucun membre" message when no members', async () => {
		const groupId = 1;
		const owner = 'user1';
		const members = [];

		// Mock de l'appel axios.get
		axios.get.mockResolvedValueOnce({ data: { 'hydra:member': members } });

		render(
			<MembersList
				groupId={groupId}
				owner={owner}
			/>
		);

		// Vérification du message "Aucun membre"
		const noMembersMessage = screen.getByText(/Aucun membre/i);
		expect(noMembersMessage).toBeInTheDocument();

		// Vérification de l'absence de membres
		const member1 = screen.queryByText(/User 1/i);
		const member2 = screen.queryByText(/User 2/i);
		expect(member1).toBeNull();
		expect(member2).toBeNull();
	});
});
