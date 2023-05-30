import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { Provider } from 'react-redux';
import axios from 'axios';
import GroupesList from '.';
import store from '../../store/store';

jest.mock('axios');

const mockGroupes = [
	{ id: 1, name: 'Group 1', isOwner: true, isMember: true },
	{ id: 2, name: 'Group 2', isOwner: false, isMember: true },
];

const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

describe('GroupesList component', () => {
	beforeEach(() => {
		axios.get.mockResolvedValueOnce({
			data: {
				'hydra:member': mockGroupes,
			},
		});
	});

	test('renders group cards', async () => {
        await act(async () => {
          render(<GroupesList access="all" />, { wrapper });
        });
      
        const loader = screen.queryByText(/Loading/i);
        expect(loader).toBeNull();
      
        await screen.findByText(/Group 1/i);
        await screen.findByText(/Group 2/i);
      
        const group1 = screen.getByText(/Group 1/i);
        const group2 = screen.getByText(/Group 2/i);
      
        expect(group1).toBeInTheDocument();
        expect(group2).toBeInTheDocument();
      });
      
});
