import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorsPage from '.';

describe('ErrorsPage', () => {
  test('Render ErrorsPage component', () => {
    const error = 'Page not found';
    console.error = jest.fn(); // Mock console.error
    
    render(<ErrorsPage error={error} />);
    
    const errorMessage = screen.getByText('Erreur 404');
    
    expect(console.error).toHaveBeenCalledWith(error);
    expect(errorMessage).toBeInTheDocument();
  });
});
