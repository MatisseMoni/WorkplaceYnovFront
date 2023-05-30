import React from 'react';
import { render, screen } from '@testing-library/react';
import Loader from '.';

describe('Loader', () => {
  test('Render Loader component', () => {
    render(<Loader />);
    
    const loader = screen.getByRole('progressbar');
    
    expect(loader).toBeInTheDocument();
  });
});
