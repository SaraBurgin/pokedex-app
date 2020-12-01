import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Component } from 'react';
import Header from './components/Header';
import PokeCard from './components/PokeCard';


class App extends Component {

  constructor() {
    super();
    this.state = {
      pokemons : [],
      pokemonDetails : [],
    }    
  }

  // componentDidMount method runs after the render method, then updates the render method so we can produce/output the results. 
  // Code refactoring to call new function getMorePokemon.

  componentDidMount() {
    this.getMorePokemon();
  }

  getMorePokemon() {
    let url = "https://pokeapi.co/api/v2/pokemon?offset=" + this.state.offset + "&limit=" + this.state.loadNumber;
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data) {
        this.setState({pokemons : data.results}, () => {
          this.state.pokemons.map(pokemon => {
            fetch(pokemon.url)
            .then(response => response.json())
            .then(data => {
              if (data) {
                var temp = this.state.pokemonDetails
                temp.push(data)
                this.setState({pokemonDetails: temp})
              }     
              // console.log(this.state.pokemonDetails);       
            })
            .catch(console.log)
          })
        })        
      }
    })
    .catch(console.log)
  }

  render() {
    const {pokemonDetails} = this.state;
    const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
      // console.log(pokemon);
      return (<PokeCard pokemon={pokemon} />);
    });
      return (
          <>
          <Header />
          <div className="container">
            <div className="card-columns">
              {renderedPokemonList}
            </div>
      </div>
          </>
      );
    }
}

export default App;