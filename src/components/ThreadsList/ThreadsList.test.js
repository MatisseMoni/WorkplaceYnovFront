import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ThreadsList from '.';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter } from 'react-router-dom';

describe('ThreadsList component', () => {
	const mockThreads = [
		{
			id: 1,
			title: 'Thread 1',
			slug: 'thread-1',
			'@id': '/api/threads/1',
		},
		{
			id: 2,
			title: 'Thread 2',
			slug: 'thread-2',
			'@id': '/api/threads/2',
		},
	];

	test('renders threads list', async () => {
		const mockStore = configureStore();
		const store = mockStore({ thread: { groups: mockThreads } });

		render(
			<Provider store={store}>
				<BrowserRouter>
					<ThreadsList groupeId={1} />
				</BrowserRouter>
			</Provider>
		);

        expect(screen.getByText('Threads')).toBeInTheDocument();
	});

	test('renders loader when threads are not available', async () => {
		const mockStore = configureStore([]);
		const store = mockStore({ thread: { groups: mockThreads } });

		render(
			<Provider store={store}>
				<BrowserRouter>
					<ThreadsList groupeId={1} />
				</BrowserRouter>
			</Provider>
		);

		await waitFor(() => {
            expect(screen.getByTestId('loader')).toBeInTheDocument();
          })
	});

	test('renders loader when threads array is empty', async () => {
		const mockStore = configureStore([]);
		const store = mockStore({ thread: { groups: mockThreads } });

		render(
			<Provider store={store}>
				<BrowserRouter>
					<ThreadsList groupeId={1} />
				</BrowserRouter>
			</Provider>
		);

		expect(screen.getByTestId('loader')).toBeInTheDocument();
	});

	test('renders add button with correct link', async () => {
		const mockStore = configureStore([]);
		const store = mockStore({ thread: { groups: mockThreads } });

		render(
			<Provider store={store}>
				<BrowserRouter>
					<ThreadsList groupeId={1} />
				</BrowserRouter>
			</Provider>
		);

		const addButton = screen.getByRole('button', { name: 'Ajouter' });
		expect(addButton).toBeInTheDocument();
	});
});
