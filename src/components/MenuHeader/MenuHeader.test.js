import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ResponsiveAppBar from '.';

const mockStore = configureStore([]);

describe('ResponsiveAppBar', () => {
  let store;
  beforeEach(() => {
    store = mockStore({
      auth: {
        isLoggedIn: true,
        user: {
          nickname: 'JohnDoe',
        },
      },
    });
  });

  test('should render the app bar with user avatar when logged in', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <ResponsiveAppBar />
        </BrowserRouter>
      </Provider>
    );

    const workplaceElements = screen.getAllByText('Ynov Workplace');

    
    expect(workplaceElements.length).toBeGreaterThan(0);

  });

  test('should render the app bar without user avatar when not logged in', () => {
    store = mockStore({
      auth: {
        isLoggedIn: false,
        user: null,
      },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <ResponsiveAppBar />
        </BrowserRouter>
      </Provider>
    );

    const workplaceElements = screen.getAllByText('Ynov Workplace');

    
    expect(workplaceElements.length).toBeGreaterThan(0);
    expect(screen.queryByText('JohnDoe')).toBeNull();

  });

});
