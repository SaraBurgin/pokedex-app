import ReactDOM from 'react-dom';
import App from './App';
import NavBar from './components/layout/NavBar'

import {shallow} from 'enzyme';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
})

it('renders navbar', () => {
  const wrapper = shallow(<App />);
  const navbar = (<NavBar />);
  expect(wrapper.contains(navbar)).toEqual(true);
});
