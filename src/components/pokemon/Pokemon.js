import React, { Component } from 'react'
import axios from 'axios';

const TYPE_COLORS = {
  bug: 'B1C12E',
  dark: '4F3A2D',
  dragon: '755EDF',
  electric: 'FCBC17',
  fairy: 'F4B1F4',
  fighting: '823551D',
  fire: 'E73B0C',
  flying: 'A3B3F7',
  ghost: '6060B2',
  grass: '74C236',
  ground: 'D3B357',
  ice: 'A3E7FD',
  normal: 'C8C4BC',
  poison: '934594',
  psychic: 'ED4882',
  rock: 'B9A156',
  steel: 'B5B5C3',
  water: '3295F6'
};

export default class Pokemon extends Component {
  state = {
    name: '',
    pokemonIndex: '',
    // pokemonEvolutionIndex: '',
    imageUrl: '',
    types : [],
    stats: {
      hp: " ",
      attack: " ",
      deffense: " ",
      speed: " ",
      specialAttack: " ",
      specialDefense: " ",
    },
    abilities: " ",
    moves: [],
    evolutions: {},
  }

  async componentDidMount() {
    // this will go to the url and grab the pokemonIndex we included in our params at App.js and put it in our pokemonIndex here
    const {pokemonIndex} = this.props.match.params;

    // urls for the pokemon information
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonUrlEvs = `https://pokeapi.co/api/v2/evolution-chain/${pokemonIndex}`;

    // Pokemon species
    const pokemonUrlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

    // Get pokemon information: name, image, stats, moves, types, abilities, evs
    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const imageUrl = pokemonRes.data.sprites.front_default;
    const moves = pokemonRes.data.moves.map(move => 
      move.move.name
      );
    const types = pokemonRes.data.types.map(type => 
      type.type.name
      );
    const abilities = pokemonRes.data.abilities.map(ability => {
        return ability.ability.name
        .toLowerCase()
          .split('-')
          .map(s => s.charAt(0).toUpperCase() + s.substring(1))
          .join(' ');
        }).join(', ');

    let { hp, attack, defense, speed, specialAttack, specialDefense} = '';

    pokemonRes.data.stats.map(stat => {
      switch(stat.stat.name) {
        case 'hp':
          hp = stat['base_stat'];
          break;
        case 'attack':
          attack = stat['base_stat'];
          break;
        case 'defense':
          defense = stat['base_stat'];
          break;
        case 'speed':
          speed = stat['base_stat'];
          break;
        case 'special-attack':
          specialAttack = stat['base_stat'];
          break;
        case 'special-defense':
          specialDefense = stat['base_stat'];
          break;
      }
    })

// Get pokemon information: evolutions
const pokemonResEv = await axios.get(pokemonUrlEvs);

const pokemonResSpecies = await axios.get(pokemonUrlSpecies);
console.log(pokemonResSpecies.data); 
// const firtstEvolution = pokemonResEv.data.chain['evolves_to'][0].species.name;
// console.log(firtstEvolution);
// console.log(pokemonResEv.data.chain['species'].name);

// console.log(pokemonResEv.data.chain['species']);

// Setting all fetched data from API to our state
  this.setState({
    name, 
    pokemonIndex, 
    imageUrl, 
    types,  
    stats: {
      hp, 
      attack, 
      defense, 
      speed, 
      specialAttack, 
      specialDefense,
    },
    abilities, 
    moves,
  })
  }
  render() {
    return (
      <div className="col" >
        <div className="card">
          <div className="card-header">
            <div className="row">
              <div className="col-5">
                <h5>#{this.state.pokemonIndex}</h5>
              </div>
            <div className="col-7">
              <div className="float-right">
                {this.state.types.map(type => (
                  <span
                    key={type}
                    className="badge badge-primary badge-pill mr-1"
                    style={{
                    backgroundColor: `#${TYPE_COLORS[type]}`,
                    color: 'white',
                    }}
                    >
                    {type
                    .toLowerCase()
                    .split('-')
                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                    .join(' ')}
                  </span>
                ))}
                </div>
              </div> 
            </div>
          </div>
          <div className="card-body">
            <div className="row align-items-center">
              <div className="col-md-3">
                <img src={this.state.imageUrl} className="card-img-top rounded mx-auto ml-2" alt="poke-img"/>
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">
                  {this.state.name
                  .toLowerCase()
                  .split('-')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}
                </h4>
                <div className="row alignt-items-center">
                  <div className="col-12 col-md-3">
                    HP
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      role="progressBar" style={{
                        width: `${this.state.stats.hp}%`
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">
                        <small>{this.state.stats.hp}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row alignt-items-center">
                  <div className="col-12 col-md-3">
                    Attack
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      role="progressBar" style={{
                        width: `${this.state.stats.attack}%`
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row alignt-items-center">
                  <div className="col-12 col-md-3">
                    Defense
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      role="progressBar" style={{
                        width: `${this.state.stats.defense}%`
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row alignt-items-center">
                  <div className="col-12 col-md-3">
                    Speed
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      role="progressBar" style={{
                        width: `${this.state.stats.speed}%`
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row alignt-items-center">
                  <div className="col-12 col-md-3">
                    Special attack
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      role="progressBar" style={{
                        width: `${this.state.stats.specialAttack}%`
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row alignt-items-center">
                  <div className="col-12 col-md-3">
                    Special Defense
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      role="progressBar" style={{
                        width: `${this.state.stats.specialDefense}%`
                      }}
                      aria-valuenow="25"
                      aria-valuemin="0"
                      aria-valuemax="100">
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
          <div className="card-body">
            <h5 className="card-title text-center">Profile</h5>
            <div className="row">
              <div className="col-md-6">
                <h6 className="float-right">
                      Abilities:
                </h6>
              </div>
              <div className="col-md-6">
                    <h6 className="float-left"> {this.state.abilities}</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-md-6">
                <h6 className="float-right">
                      Moves:
                </h6>
              </div>
              <div className="col-md-6">
                    <h6 className="float-left">{this.state.moves.map(move => {
                      return move;
                    }).join(', ')
                }</h6>
              </div>
            </div>
          </div>
        </div>
      </ div>
      )
  }
}
