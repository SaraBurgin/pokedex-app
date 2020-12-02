import React, { Component } from 'react';

import PokemonCard from './PokemonCard';
import axios from 'axios';


export default class PokemonList extends Component {
  state = {
    url: 'https://pokeapi.co/api/v2/pokemon/',
    pokemon: null,
  }

// setState is updating state, so if there isn't any info in state it will create it and if it  has been used it will overwrite it. setState will re-run my render function. If only one thing changes then it will only re-render that component.
  async componentDidMount() {
    const res = await axios.get(this.state.url);
    this.setState({pokemon: res.data['results'] })
  }
  
  render() {
    return (
      <div>
        {this.state.pokemon ? (
        <div className="row">
          {this.state.pokemon.map(pokemon => (
          <PokemonCard key={pokemon.name} name={pokemon.name} url={pokemon.url}/>
          ))}
          </div>
        ) : (<h1>Loading pokemon</h1>
        )}
      </div>
      );
  }
}
