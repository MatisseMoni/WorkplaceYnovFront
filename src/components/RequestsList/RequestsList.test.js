import React from "react";
import { render, screen, act } from "@testing-library/react";
import axios from "axios";
import { useSelector } from "react-redux";
import RequestsList from ".";

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

jest.mock("axios");

describe("RequestsList component", () => {
  beforeEach(() => {
    useSelector.mockReturnValue([]); // Mock de useSelector pour les usersLogged
  });

  test("renders loading message", async () => {
    const groupeId = 1;

    render(<RequestsList groupeId={groupeId} />);

    const loadingMessage = screen.getByText(/Chargement/i);
    expect(loadingMessage).toBeInTheDocument();
  });

  test("renders 'Pas de demandes' message when no requests", async () => {
    const groupeId = 1;

    axios.get.mockResolvedValueOnce({ data: { "hydra:member": [] } });

    await act(async () => {
        render(<RequestsList groupeId={groupeId} />);
      });

    const noRequestsMessage = screen.getByText(/Pas de demandes/i);
    expect(noRequestsMessage).toBeInTheDocument();
  });

  test("renders requests list", async () => {
    const groupeId = 1;
    const requests = [
      { id: 1, targetUser: "User 1", status: 0 },
      { id: 2, targetUser: "User 2", status: 0 },
    ];

    axios.get.mockResolvedValueOnce({ data: { "hydra:member": requests } });

    await act(async () => {
        render(<RequestsList groupeId={groupeId} />);
      });

    const headingElement = screen.getByText(/Liste des demandes/i);
    expect(headingElement).toBeInTheDocument();

    const request1 = screen.getByText(/User 1/i);
    const request2 = screen.getByText(/User 2/i);
    expect(request1).toBeInTheDocument();
    expect(request2).toBeInTheDocument();

    const noRequestsMessage = screen.queryByText(/Pas de demandes/i);
    expect(noRequestsMessage).toBeNull();

    const acceptButtons = screen.getAllByRole("button", { name: "Accepter", exact: false });
    expect(acceptButtons.length).toBe(requests.length);
  
    for (let i = 0; i < requests.length; i++) {
      expect(acceptButtons[i]).toBeInTheDocument();
    }

  });

  test("calls acceptRequest function when 'Accepter' button is clicked", async () => {
    const groupeId = 1;
    const requests = [
      { id: 1, targetUser: "User 1", status: 0 },
    ];

    axios.get.mockResolvedValueOnce({ data: { "hydra:member": requests } });
    axios.post.mockResolvedValueOnce({});

    await act(async () => {
        render(<RequestsList groupeId={groupeId} />);
      });

    const acceptButton = screen.getByText(/Accepter/i);
    act(() => {
      acceptButton.click();
    });

    expect(axios.post).toHaveBeenCalledWith(
      `${process.env.REACT_APP_YOUR_API_URL}/api/group_requests/1/accept`,
      {},
      expect.any(Object)
    );
  });
});
