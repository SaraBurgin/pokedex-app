import { render, screen } from '@testing-library/react';
import Pokemon from './Pokemon';

test('check if load button is visible', () => {
  render(<Pokemon />);
  const linkElement = screen.getByText(/Load More/i);
  expect(linkElement).toBeInTheDocument();
});

// Check if the picture, name, abilities, type, order number, stats, evolutions and moves are available