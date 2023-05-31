import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useNavigate } from 'react-router-dom';
import Pagination from '.';

// Mock de la fonction useNavigate
jest.mock('react-router-dom', () => ({
	useNavigate: jest.fn(),
}));

describe('Pagination', () => {
	test('affiche les boutons Avant et Après si actualPage est supérieur à 1 et inférieur à nbPages', () => {
		const mockNavigate = jest.fn();
		useNavigate.mockReturnValue(mockNavigate);

		render(
			<Pagination
				totalPostes={50}
				postsPerPage={20}
			/>
		);
        
        const boutonAvant = screen.queryByText('Avant');
		const boutonApres = screen.queryByText('Après');

		expect(boutonAvant).toBeInTheDocument();
		expect(boutonApres).toBeInTheDocument();

		userEvent.click(boutonAvant);
		expect(mockNavigate).toHaveBeenCalledWith('/?page=0');

		userEvent.click(boutonApres);
		expect(mockNavigate).toHaveBeenCalledWith('/?page=2');
	});

	test("n'affiche pas les boutons Avant et Après si actualPage est égal à 1 ou à nbPages", () => {
		const mockNavigate = jest.fn();
		useNavigate.mockReturnValue(mockNavigate);

		render(
			<Pagination
				totalPostes={20}
				postsPerPage={20}
			/>
		);

		const boutonAvant = screen.queryByText('Avant');
		const boutonApres = screen.queryByText('Après');

		expect(boutonAvant).toBeNull();
		expect(boutonApres).toBeNull();
	});
});
