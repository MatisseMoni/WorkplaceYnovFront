import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import Groupes from '.';
import { BrowserRouter } from 'react-router-dom';
import configureStore from 'redux-mock-store';

// Crée un store Redux mocké
const mockStore = configureStore([]);
const initialState = {
    auth: {
      user: {
        id: 1,
        username: 'john_doe',
      },
    },
    groupe: {
      groupes: [],
    },
  };
const mockedStore = mockStore(initialState);

describe('Groupes', () => {
	test('renders Mes Groupes heading', () => {
		const { getByText } = render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Groupes />
				</BrowserRouter>
			</Provider>
		);
		const headingElement = getByText('Mes Groupes');
		expect(headingElement).toBeInTheDocument();
	});

    test('renders Créer un groupe button', () => {
        const { getByText } = render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Groupes />
				</BrowserRouter>
			</Provider>
		);
        const buttonElement = getByText('Créer un groupe');
        expect(buttonElement).toBeInTheDocument();
      });
    
      test('renders Owner GroupesList', () => {
        const { getByText } = render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Groupes />
				</BrowserRouter>
			</Provider>
		);
        const ownerHeadingElement = getByText('Owner');
        expect(ownerHeadingElement).toBeInTheDocument();

      });
    
      test('renders Member GroupesList', () => {
        const { getByText } = render(
			<Provider store={mockedStore}>
				<BrowserRouter>
					<Groupes />
				</BrowserRouter>
			</Provider>
		);
        const memberHeadingElement = getByText('Member');
        expect(memberHeadingElement).toBeInTheDocument();
      });   
});
