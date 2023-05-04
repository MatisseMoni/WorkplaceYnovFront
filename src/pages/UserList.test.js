import UserList, { sortUsersByNickname } from './UserList';
import { render, screen } from '@testing-library/react';
import store from '../store/store';
import { Provider } from 'react-redux';
import { setLoading } from '../store/reducers/loading';
import { setUsers } from '../store/reducers/user';

const wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;

test('Display component', () => {
	store.dispatch(setLoading(false));
	store.dispatch(
		setUsers([
			{ id: 1, nickname: 'test' },
			{ id: 2, nickname: 'test 2' },
		])
	);
	render(<UserList />, { wrapper });
	const linkElement = screen.getByText(/Liste des Utilisateurs/i);
	expect(linkElement).toBeInTheDocument();
});
