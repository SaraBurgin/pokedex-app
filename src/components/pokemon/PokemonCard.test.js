import { render, screen } from '@testing-library/react';
import PokemonCard from './PokemonCard';

test('check if load button is visible', () => {
  render(<PokemonCard />);
  const linkElement = screen.getByText(/Load More/i);
  expect(linkElement).toBeInTheDocument();
});

// Check if the name name and order number are visible