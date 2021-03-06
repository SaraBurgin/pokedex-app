import { cleanup } from '@testing-library/react';
import ReactDOM from 'react-dom';
import PokemonCard from '../PokemonCard';
import { shallow } from 'enzyme';
import {MemoryRouter} from 'react-router-dom';


afterEach(cleanup);

it('renders pokemonCard without crashing',  () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <MemoryRouter>
    <PokemonCard />
    </MemoryRouter>,
     div);
  ReactDOM.unmountComponentAtNode(div);
})

describe('rendering components', () => {
  it('renders PokemonCard correctly without crashing', () => {
  shallow(<PokemonCard />)
  })
})


