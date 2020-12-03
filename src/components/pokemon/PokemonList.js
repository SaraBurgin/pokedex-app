import React, { Component } from 'react';
import axios from 'axios';

import Styled from 'styled-components';
import PokemonCard from './PokemonCard';

const Button = Styled.button`
  font-weight: bold;
  font-size: 20px;
  border-radius: 3px;
`

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
      <Button type="button" className="btn btn-info btn-block" onClick={this.handleClick}>Load More</Button>
      </>
      );
  }
}
