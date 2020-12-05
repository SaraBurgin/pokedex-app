import { render, cleanup } from '@testing-library/react';
import ReactDOM from 'react-dom';
import PokemonCard from '../PokemonCard';
import { shallow } from 'enzyme';


afterEach(cleanup);

it('renders pokemonCard without crashing',  () => {
  const div = document.createElement('div');
  ReactDOM.render(<PokemonCard />, div);
  ReactDOM.unmountComponentAtNode(div);
})
// crashes because I shouldn't use Link outside of Router
// cannot use property split of undefined

describe('rendering components', () => {
  it('renders PokemonCard correctly without crashing', () => {
    shallow(<PokemonCard />)
  })
})

// it('button redirects correctly', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<Button />, div);
//   ReactDOM.unmountComponentAtNode(div);
// })


