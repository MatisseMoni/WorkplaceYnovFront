import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Tchat from '.';

// Créer un mock du store Redux
const mockStore = configureStore([]);
const store = mockStore({});

test('renders Tchat component', () => {
  const thread = {
    '@id': '/api/threads/1',
    // Ajoutez d'autres propriétés de thread nécessaires pour votre test
  };

  render(
    <Provider store={store}>
      <Tchat thread={thread} />
    </Provider>
  );

  // Vérifier le rendu ou le comportement attendu du composant
  // Exemple : Vérifier si un élément spécifique est rendu à l'écran
  const messagesHeader = screen.getByRole('heading', { name: 'Messages' });
  expect(messagesHeader).toBeInTheDocument();

  // Ajoutez d'autres assertions de test si nécessaire
});
