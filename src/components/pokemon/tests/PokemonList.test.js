import { render, screen, cleanup } from '@testing-library/react';
import ReactDOM from 'react-dom';
import PokemonList from '../PokemonList';
import Button from '../PokemonList';

import renderer from 'react-test-renderer';

afterEach(cleanup);

it('renders pokemonList without crashing', async () => {
  const div = document.createElement('div');
  ReactDOM.render(<PokemonList />, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders button correctly', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Button />, div);
  ReactDOM.unmountComponentAtNode(div);
})

test('check that load more text is visible in button', () => {
  render(<PokemonList />);
  const linkElement = screen.getByText(/Load More/i);
  expect(linkElement).toBeInTheDocument();
});

it('matches snapshot', () => {
  const tree = renderer.create(<PokemonList />).toJSON();
  expect(tree).toMatchSnapshot();
}); 
// When it creates a tree and whenever I expect to match snapshot it goes and looks at the folder structure and looks for a folder called snapshot, in there there should be a file called PokemonList.snapshot that is created the first time that you run this fx. When you make changes to the component you should update the snapshot so this test does not fail. 

// ReactDOM is part of the React library
// expect is from Jest