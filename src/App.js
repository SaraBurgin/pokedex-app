import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';


import NavBar from './components/layout/NavBar.js'
import Dashboard from './components/layout/Dashboard'
import Pokemon from './components/pokemon/Pokemon'

function App() {
  
      return (
        <Router>
          <div className="App">
            <NavBar />
            <div className="container">
              <Switch>
                <Route exact path="/" component={Dashboard} />
                <Route exact path="/pokemon/:pokemonIndex" component={Pokemon}/>
              </Switch>
              </div>
          </div>
        </ Router>
      )
}

export default App;