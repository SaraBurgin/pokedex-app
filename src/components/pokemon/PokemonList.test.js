import { render, screen } from '@testing-library/react';
import PokemonList from './PokemonList';

test('check if load button is visible', () => {
  render(<PokemonList />);
  const linkElement = screen.getByText(/Load More/i);
  // const linkToPokeCards = screen.getByClass(/card/i);
  expect(linkElement).toBeInTheDocument();
});

// Check if the API is loading pokemon information
// Rendering the component that loads the pokemons
