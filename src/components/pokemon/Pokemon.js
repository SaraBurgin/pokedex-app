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
    imageUrl: '',
    types : [],
    stats: {
      hp: '',
      attack: " ",
      deffense: " ",
      speed: " ",
      specialAttack: " ",
      specialDefense: " ",
    },
    abilities: " ",
    moves: [],
    evol1: '',
    evol2: '',
    evol3: '',
    evolImgIndex: '',
  }

  async componentDidMount() {
    // this will go to the url and grab the pokemonIndex we included in our params at App.js and put it in our pokemonIndex here
    const {pokemonIndex} = this.props.match.params;

    // #Information url's
    const pokemonUrl = `https://pokeapi.co/api/v2/pokemon/${pokemonIndex}/`;
    const pokemonUrlSpecies = `https://pokeapi.co/api/v2/pokemon-species/${pokemonIndex}`;

    // Get pokemon information: name, image, stats, moves, types, abilities, evs
    const pokemonRes = await axios.get(pokemonUrl);

    const name = pokemonRes.data.name;
    const imageUrl = `https://img.pokemondb.net/sprites/home/normal/${name}.png`
    // const imageUrl = pokemonRes.data.sprites.front_default;
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
      // eslint-disable-next-line default-case
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
const pokemonResSpecies = await axios.get(pokemonUrlSpecies);

// #Evolution url
const evolutionChainUrl = pokemonResSpecies.data['evolution_chain'].url;
const evolutionId = evolutionChainUrl
.split('/')  
.map((id) => {
  return id;
  }
  );

const pokeEvolutionIndex = parseInt(evolutionId[(evolutionId.length - 2)]);
const pokemonUrlEvolution = `https://pokeapi.co/api/v2/evolution-chain/${pokeEvolutionIndex}`;
const pokemonResEvolution = await axios.get(pokemonUrlEvolution);

const evolImgIndex = pokemonResSpecies.data.id;
console.log(pokemonResEvolution.data.chain);

const evol1 = pokemonResEvolution.data.chain.species.name;

let evol2 = pokemonResEvolution.data.chain['evolves_to'][0];
let evol3 = pokemonResEvolution.data.chain['evolves_to'][0];

if(evol2 === undefined) {
  evol2 = ' ';
  evol3 = ' ';
  console.log("No further evolutions");
} else if (evol3['evolves_to'][0] === undefined){
    evol2 = pokemonResEvolution.data.chain['evolves_to'][0].species.name;
    evol3 = ' ';
    console.log(`Just 1 available evolution ${evol2}`);
} else {
    evol2 = pokemonResEvolution.data.chain['evolves_to'][0].species.name
    evol3 = pokemonResEvolution.data.chain['evolves_to'][0]['evolves_to'][0].species.name
    console.log(`2 available evolutions ${evol2} ${evol3}`);
}


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
    evol1,
    evol2,
    evol3,
    evolImgIndex,
  })
  }
  render() {
    return (
      <>
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
                    fontSize: '16px',
                    }}
                    >
                    {type
                    .toLowerCase()
                    .split(' ')
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
                <img src={this.state.imageUrl} className="card-img-top rounded mx-auto ml-2 d-block" style={{width: '120px'}} alt="poke-img"/>
              </div>
              <div className="col-md-9">
                <h4 className="mx-auto">
                  {this.state.name
                  .toLowerCase()
                  .split('-')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')}
                </h4>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    HP
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      style={{
                        width: `${this.state.stats.hp}%`
                      }}>
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
                       style={{
                        width: `${this.state.stats.attack}%`
                      }}
                      >
                        <small>{this.state.stats.attack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Defense
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      style={{
                        width: `${this.state.stats.defense}%`
                      }}
                      >
                        <small>{this.state.stats.defense}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Speed
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      style={{
                        width: `${this.state.stats.speed}%`
                      }}
                      >
                        <small>{this.state.stats.speed}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Special attack
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      style={{
                        width: `${this.state.stats.specialAttack}%`
                      }}>
                        <small>{this.state.stats.specialAttack}</small>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Special Defense
                  </div>
                  <div className="col-23 col-md-9">
                    <div className="progress">
                      <div
                      className="progress-bar"
                      style={{
                        width: `${this.state.stats.specialDefense}%`
                      }}>
                        <small>{this.state.stats.specialDefense}</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
              </div>
              <div className="col-md-9" style={{marginTop: '20px'}}>
                <h4 className="mx-auto">
                  Profile
                </h4>
                <div className="row align-items-center">
                  <div className="col-12 col-md-3">
                    Abilities:
                  </div>
                  <div className="col-23 col-md-9">
                    <h6> {this.state.abilities}</h6>
                  </div>
                  <div className="col-12 col-md-3">
                    Moves:
                  </div>
                  <div className="col-23 col-md-9">
                  <h6 className="float-left">{this.state.moves.map(move => {
                      return move.toLowerCase().split('-')
                      .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                      .join(' ');
                    }).join(', ')
                }</h6>
                  </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
      <div className="col">
          <div className="card">
            <div className="card-header">
              <div className="row">
                <div className="col-12">
                <h5>EVOLUTIONS</h5>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row align-items-center">
                <div className="col-sm text-center">
                  <img src={`https://img.pokemondb.net/sprites/home/normal/${this.state.evol1}.png`} alt=""/>
                  <h5>{this.state.evol1
                  .toLowerCase()
                  .split('-')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')
                    }</h5>
                </div>
                <div className="col-sm text-center">
                  <img src={`https://img.pokemondb.net/sprites/home/normal/${this.state.evol2}.png`} alt=""/>
                  <h5>{this.state.evol2
                  .toLowerCase()
                  .split(' ')
                  .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                  .join(' ')
                    }</h5>
                </div>
                <div className="col-sm text-center">
                <img src={`https://img.pokemondb.net/sprites/home/normal/${this.state.evol3}.png`} alt=""/>
                  <h5>{this.state.evol3
                                    .toLowerCase()
                                    .split(' ')
                                    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
                                    .join(' ')
                    }</h5>
                </div>
              </div>
            </div>
          </div>
      </div>
      </>
      )
  }
}
