import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { Component } from 'react';
import Header from './components/Header';
import PokeCard from './components/PokeCard';
// import Details from './Details.js';


class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons : [],
      pokemonDetails : [],
      offset: 0,
      loadNumber: 24
    }
    this.handleMoreClick = this.handleMoreClick.bind(this);    
  }
  getNextOffset() {
    return this.state.offset+this.state.loadNumber;
   }
  
   handleMoreClick() {
    const newOffset = this.getNextOffset();
    this.setState({offset: newOffset}, () => {
      console.log("Offset: " + this.state.offset)
      this.getMorePokemon();
    });    
  }

  // componentDidMount method runs after the render method, then updates the render method so we can produce/output the results. 
  // Code refactoring to call new function getMorePokemon.
  componentDidMount() {
    this.getMorePokemon();
  }

  // Using the global fetch function to make an AJAX request. It takes in our endpoint URL as an input and returns a Promise that resolves to a Response object. We turn that object to json and make it available as data. 
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
      return (
        <>
        <PokeCard pokemon={pokemon} /> 
        </>
        );
    });
    
    // const furtherDetails = pokemonDetails.map((pokemon, index) => {
    //   return (<Details pokemon={pokemon} />)
    // });
      return (
        <>
        <Header />
          <div className="container">
            <div className="card-columns">
              {renderedPokemonList}
            </div>
          </div>
          <button type="button" className="btn btn-secondary btn-block" onClick={this.handleMoreClick} key="more-button" id="more-button">Load More</button>
        </>
      ); 
    }
}

export default App;