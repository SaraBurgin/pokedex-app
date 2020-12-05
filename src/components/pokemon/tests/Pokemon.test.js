import { cleanup } from '@testing-library/react';
import ReactDOM from 'react-dom';
import Pokemon from '../Pokemon';
import {MemoryRouter} from 'react-router-dom';


afterEach(cleanup);

it('renders pokemon without crashing',  () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <MemoryRouter>
    <Pokemon />
    </MemoryRouter>,
     div);
  ReactDOM.unmountComponentAtNode(div);
})
