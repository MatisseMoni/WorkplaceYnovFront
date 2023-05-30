import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import GroupCard from '.';

jest.mock('axios');

describe('GroupCard', () => {
  const mockGroup = {
    name: 'Test Group',
    description: 'This is a test group',
    isMember: false,
    isOwner: false,
    '@id': '/api/groups/1',
  };

  test('Render GroupCard component', () => {
    render(
      <Router>
        <GroupCard groupe={mockGroup} isGrid={true} />
      </Router>
    );

    const groupName = screen.getByText('Test Group');
    const groupDescription = screen.getByText('This is a test group');
    const requestAccessButton = screen.getByRole('button', {
      name: /demander l'accès/i,
    });
    const viewGroupButton = screen.queryByRole('button', {
      name: /voir le groupe/i,
    });

    expect(groupName).toBeInTheDocument();
    expect(groupDescription).toBeInTheDocument();
    expect(requestAccessButton).toBeInTheDocument();
    expect(viewGroupButton).not.toBeInTheDocument();
  });

  test('Request access button click', async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    render(
      <Router>
        <GroupCard groupe={mockGroup} isGrid={true} />
      </Router>
    );

    const requestAccessButton = screen.getByRole('button', {
      name: /demander l'accès/i,
    });

    fireEvent.click(requestAccessButton);

    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_YOUR_API_URL}/api/group_requests`,
      {
        targetGroup: '/api/groups/1',
      },
      {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      }
    );
  });
});
