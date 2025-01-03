export {};  // Add this line at the top

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import TransactionHistory from './TransactionHistory';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');

// Test Case 1: Render Transaction History and check the table
test('renders the transaction history table', async () => {
  const mockData = [
    { id: 1, date: '2022-01-01', amount: 100, type: 'credit' },
    { id: 2, date: '2022-01-02', amount: 200, type: 'debit' },
  ];

  (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

  render(<TransactionHistory />);

  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

  const rows = screen.getAllByRole('row');
  expect(rows.length).toBe(3); // 2 data rows + 1 header row
});

// Test Case 2: Filter transactions by type
test('filters transactions by type', async () => {
  const mockData = [
    { id: 1, date: '2022-01-01', amount: 100, type: 'credit' },
    { id: 2, date: '2022-01-02', amount: 200, type: 'debit' },
  ];

  (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

  render(<TransactionHistory />);

  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

  fireEvent.change(screen.getByLabelText(/Filter by Type/), { target: { value: 'credit' } });

  const filteredRows = screen.getAllByRole('row');
  expect(filteredRows.length).toBe(2); // Only one 'credit' transaction should show
});

// Test Case 3: Check sorting functionality
test('sorts transactions by amount in ascending order', async () => {
  const mockData = [
    { id: 1, date: '2022-01-01', amount: 200, type: 'debit' },
    { id: 2, date: '2022-01-02', amount: 100, type: 'credit' },
  ];

  (axios.get as jest.Mock).mockResolvedValue({ data: mockData });

  render(<TransactionHistory />);

  await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

  fireEvent.click(screen.getByText('Amount'));

  const sortedRows = screen.getAllByRole('row');
  expect(sortedRows[1].textContent).toContain('100');
  expect(sortedRows[2].textContent).toContain('200');
});
