import React, { Component } from 'react';

import PokemonCard from './PokemonCard';
import axios from 'axios';


export default class PokemonList extends Component {
  constructor() {
    super();
    this.state = {
      url: "https://pokeapi.co/api/v2/pokemon?offset=offset&limit=loadNumber",
      pokemon: null,
      offset: 0,
      loadNumber: 50,
    }
    this.handleClick = this.handleClick.bind(this);   
  }

  getNextOffset() {
    return this.state.offset+this.state.loadNumber;
  }

  handleClick(){
    const newOffset = this.getNextOffset();
    this.setState({offset: newOffset}, () => {
      console.log('Offset: ' + this.state.offset)
      this.getMorePokemon();
    })
  }

// setState is updating state, so if there isn't any info in state it will create it and if it  has been used it will overwrite it. setState will re-run my render function. If only one thing changes then it will only re-render that component.
  componentDidMount() {
    this.getMorePokemon();
  }
  

  async getMorePokemon() {
    this.setState({url: "https://pokeapi.co/api/v2/pokemon?offset=" + this.state.offset + "&limit=" + this.state.loadNumber});
    const res = await axios.get(this.state.url);
    this.setState({pokemon: res.data['results'] });
  }

  render() {
    return (
      <>
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
      <button type="button" className="btn btn-info btn-block" onClick={this.handleClick}>Load More</button>
      </>
      );
  }
}
