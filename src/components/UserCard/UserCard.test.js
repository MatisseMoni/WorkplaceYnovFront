import React from 'react';
import { render, screen } from '@testing-library/react';
import UserCard from '.';

describe('UserCard', () => {
  const mockUser = {
    nickname: 'JohnDoe',
    email: 'johndoe@example.com',
    ownedConversations: [],
    tenantConversations: [],
  };

  test('Render UserCard component', () => {
    render(<UserCard user={mockUser} />);
    
    const username = screen.getByText((content, element) => {
      // Vérifier si le texte contient "Utilisateur:"
      return content.startsWith('Utilisateur:');
    });

    const email = screen.getByText((content, element) => {
      // Vérifier si le texte contient "Email:"
      return content.startsWith('Email:');
    });
    
    expect(username).toBeInTheDocument();
    expect(email).toBeInTheDocument();
  });
});
